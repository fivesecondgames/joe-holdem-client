import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import flatstore from 'flatstore';
import Card from './Card';
import CreateGame from './CreateGame';


import storage from '../service/storage';
import holdem from '../service/holdem';
import EnterName from './EnterName';

class GameList extends Component {

    constructor(props) {
        super(props);

        flatstore.set('playername', storage.load('playername', ''));
        flatstore.set('playerchips', '');

        this.state = {
            gameList: []
        }


    }

    componentDidMount() {
        this.updateGameList();
    }

    async updateGameList() {
        this.gameList = await holdem.listGames();
        flatstore.set('gameList', this.gameList);
    }

    async joinGame(id) {
        console.log("Joining game: " + id);
        await holdem.joinGame(id, this.props.playername, Math.round(Math.random() * 9));
    }

    listGames() {

        let gameListElems = [];
        let joinDisabled = !(typeof this.props.playername === 'string' && this.props.playername.length >= 3);
        for (const [id, game] of Object.entries(this.props.gameList || {})) {
            gameListElems.push((
                <li key={id} style={{ borderBottom: '1px solid #777', width: '300px', padding: '0.625rem' }}>
                    <span style={{ display: 'inline-block', width: '200px', fontWeight: 'bold' }}>{game.rules.game.name}</span>
                    <Button
                        disabled={joinDisabled}
                        style={{ marginLeft: '5px' }}
                        variant="info"
                        size="sm"
                        onClick={() => this.joinGame(id)}>
                        Join
                    </Button>
                </li>))
        }

        return gameListElems;
    }

    render() {

        return (
            <div>
                <EnterName></EnterName>
                <h3>Join Game or <CreateGame /></h3>
                <ul>
                    {this.listGames()}
                </ul>
                {/* <div id="cards-player">
                    <Card card={'AH'} down={true}></Card>
                    <Card card={'AS'}></Card>
                    <Card card={'AC'}></Card>
                    <Card card={'AD'} ></Card>
                </div> */}
                <br />
                <br />

            </div >
        )
    }
}


let onCustomWatched = (ownProps) => {
    return ['playername', 'gameList'];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        //value: value
    }
}

export default flatstore.connect([], onCustomWatched, {})(GameList);