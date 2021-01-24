import axios from 'axios';
import { io } from 'socket.io-client';

import storage from './storage';

const defaultCredentials = {
    URL: 'http://localhost:8080/',
    'API-KEY': ""
}

class Holdem {

    constructor(credentials) {
        this.credentials = credentials || defaultCredentials;
        this.gameList = {};
        this.games = {};
        this.me = {};
    }

    getMe() {
        return this.me;
    }

    async requestAPIKey() {
        try {
            if (this.requestingApiKey) {
                return null;
            }
            this.requestingApiKey = true;
            let response = await this.httpGet('apikey');
            this.requestingApiKey = false;
            let apikey = response.data.apikey;
            this.me.apikey = apikey;
            return apikey;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    async createGame(params) {
        try {
            let response = await this.action('creategame', params);
            let game = response.data;
            this.games[game.id] = game;
            console.log(game);
            return game;
        }
        catch (e) {
            console.error(e);
        }
        return null;
    }

    async listGames() {
        try {
            let response = await this.action('listgames');
            this.gameList = response.data;
            console.log(this.gameList);
            return this.gameList;
        }
        catch (e) {
            console.error(e);
        }
        return null;
    }

    async joinGame(id, displayname) {
        try {
            this.me.gameid = id;
            this.me.displayname = displayname;

            this.socket = this.connect();
            this.socket.on("connected", this.onConnected.bind(this));
            this.socket.on('onJoinGame', this.onJoinGame.bind(this));
            this.socket.on('event', this.onEvent.bind(this));
            this.socket.on('authenticated', this.onAuthenticated.bind(this));
            this.socket.on('invalid auth', this.invalidAuth.bind(this))
        }
        catch (e) {
            console.error(e);
        }
    }

    onEvent(event) {
        this.updateChanges(event.game);
    }

    onJoinGame(game) {
        this.updateGame(game);
    }

    updateChanges(changes) {
        let games = storage.get('games', {});
        let game = games[changes.id];
        games[changes.id] = this.merge(changes, game);
        storage.set('games', games);
        storage.set(game.id, game);
        console.log(game);
    }

    updateGame(game) {
        let games = storage.get('games', {});
        games[game.id] = game;
        storage.set('games', games);
        storage.set(game.id, game);
        console.log(game);
    }
    invalidAuth(data) {
        //attempt to authenticate again
        this.authenticate(data);
    }

    //login player and then submit their token/api key, change here as needed
    authenticate(data) {
        this.socket.emit('authenticate', { 'X-API-KEY': this.me.apikey });
    }

    //user is authenticated, lets join the table!
    onAuthenticated(data) {
        console.log(data);
        this.me.playerid = data.playerid;

        this.socket.emit('playerjoin', this.me)
    }

    //initiate a new connection, or give us the existing connection
    connect() {
        let socket = this.socket;
        if (socket && socket.connected)
            return socket;
        socket = io(this.credentials.URL, {
            withCredentials: true,
            cookie: true,
            transports: ['websocket', 'polling']
        });
        return socket;
    }

    //server recognizes our connection, begin authentication
    onConnected(data) {
        console.log(data);
        this.authenticate(data);
    }

    async httpGet(action) {
        try {
            let url = this.credentials.URL + action;
            let response = await axios.get(url, { withCredentials: true });
            return response;
        }
        catch (e) {
            throw e;
        }
    }

    async action(action, params) {
        try {
            let url = this.credentials.URL + action;
            let response = await axios.post(url, params || {}, { withCredentials: true });
            return response;
        }
        catch (e) {
            throw e;
        }
    }

    isObject(x) {
        return x != null && (typeof x === 'object' || typeof x === 'function') && !Array.isArray(x);
    }

    merge(from, to) {

        for (var key in from) {

            if (!(key in to)) {
                to[key] = from[key];
                continue;
            }

            if (Array.isArray(from[key])) {
                to[key] = from[key];
                continue;
            }
            if (this.isObject(from[key])) {
                to[key] = this.merge(from[key], to[key])
                continue;
            }

            to[key] = from[key];
        }

        return to;
    }
}

export default new Holdem();

