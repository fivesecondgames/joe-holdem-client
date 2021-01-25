import React, { Component } from "react";
import './Card.css';
import constants from '../service/constants';
import holdem from '../service/holdem';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import fs from 'flatstore';


class UserAction extends Component {

    createAction() {

    }

    render() {
        let playerid = this.props.playerid;
        let local = holdem.getMe();
        let isLocal = (local && playerid == local.playerid);
        let players = holdem.getPlayers(local.gameid);
        let player = players[playerid];
        let game = holdem.getGame(local.gameid);

        if (!isLocal || !player || game.state.phase <= constants.PHASE_NONE) {
            return <React.Fragment />
        }

        let nextSeat = game.next.seatid;
        let nextPlayerId = game.state.seats[nextSeat];
        let nextPlayer = game.state.players[nextPlayerId];


        if (nextPlayerId == playerid) {
            return (
                <div>
                    <Button variant="primary" disabled={!game.next.actions.includes('call')} onClick={() => { holdem.call(); }}>Call</Button>
                    <Button variant="primary" disabled={!game.next.actions.includes('raise')} onClick={() => { holdem.raise(); }}>Raise</Button>
                    <Button variant="primary" disabled={!game.next.actions.includes('allin')} onClick={() => { holdem.allin(); }}>Allin</Button>
                    <Button variant="primary" disabled={!game.next.actions.includes('check')} onClick={() => { holdem.check(); }}>Check</Button>
                    <Button variant="primary" disabled={!game.next.actions.includes('fold')} onClick={() => { holdem.fold(); }}>Fold</Button>

                    {/* <Button variant="primary" disabled={player.ready} onClick={() => { holdem.ready(); }}>Ready</Button>
                    <Button variant="secondary" disabled={!player.ready} onClick={() => { holdem.ready(); }}>Not Ready</Button> */}
                </div>
            );
        }
        return <React.Fragment />
    }
}

let onCustomWatched = (ownProps) => {
    return []
}

let onCustomProps = (key, value, store, ownProps) => {
    return {
        [key]: value
    }
}

export default fs.connect([], onCustomWatched, onCustomProps)(UserAction);