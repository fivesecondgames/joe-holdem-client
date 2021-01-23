import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import flatstore from 'flatstore';
import Card from './Card';
import CreateGame from './CreateGame';
import Form from 'react-bootstrap/Form'

import storage from '../service/storage';
import holdem from '../service/holdem';
import EnterName from './EnterName';

class GameList extends Component {

    constructor(props) {
        super(props);

        flatstore.set('playername', storage.load('playername', ''));
        flatstore.set('playerchips', '');

        this.gameList = {};
        this.state = {
            gameListElems: []
        }
        this.listGames();
    }

    async listGames() {
        this.gameList = await holdem.listGames();
        let gameListElems = [];
        for (const [id, game] of Object.entries(this.gameList)) {
            gameListElems.push((
                <li style={{ borderBottom: '1px solid #777', width: '300px', padding: '0.625rem' }}>
                    <span style={{ display: 'inline-block', width: '200px', fontWeight: 'bold' }}>{game.rules.game.name}</span>
                    <Button style={{ marginLeft: '5px' }} variant="primary" size="sm">
                        Join
                    </Button>
                </li>))
        }
        this.setState({ gameListElems });
    }

    render() {

        return (
            <div>

                <EnterName></EnterName>



                <h3>Join Game</h3>
                <ul>
                    {this.state.gameListElems}
                </ul>
                {/* <div id="cards-player">
                    <Card card={'AH'} down={true}></Card>
                    <Card card={'AS'}></Card>
                    <Card card={'AC'}></Card>
                    <Card card={'AD'} ></Card>
                </div> */}
                <br />
                <br />
                <CreateGame />
            </div >
        )
    }
}


let onCustomWatched = (ownProps) => {
    return [];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        //value: value
    }
}

export default flatstore.connect([], onCustomWatched, {})(GameList);