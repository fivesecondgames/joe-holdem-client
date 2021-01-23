import axios from 'axios';
import { io } from 'socket.io-client';


const defaultCredentials = {
    API_URL: 'http://localhost:8080/',
    WEBSOCKET_URL: 'http://localhost:8081/',
    'API-KEY': ""
}

class Holdem {

    constructor(credentials) {
        this.credentials = credentials || defaultCredentials;

        this.gameList = {};
        this.games = {};
        this.me = {};
    }

    async createWebSocketConnection() {
        this.socket = io(this.credentials.WEBSOCKET_URL);
        this.socket.on("connect", this.onConnect.bind(this));
    }

    async createGame(params) {
        try {
            let response = await this.action('creategame', params);
            let game = response.data;
            this.games[game.id] = game;
            console.log(game);
        }
        catch (e) {
            console.error(e);
        }
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
        return {};
    }

    async joinGame(playername) {
        try {

        }
        catch (e) {
            console.error(e);
        }
    }



    onConnect() {

    }

    async action(action, params) {
        try {
            let url = this.credentials.API_URL + action;
            let response = await axios.post(url, params || {});
            return response;
        }
        catch (e) {
            throw e;
        }

    }
}

export default new Holdem();

