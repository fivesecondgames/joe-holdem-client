import React, { Component } from "react";
import './Card.css';
import holdem from '../service/holdem';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import fs from 'flatstore';

fs.set('playerReady', {});

class ReadyAction extends Component {

    render() {
        let playerid = this.props.playerid;
        let local = holdem.getMe();
        let isLocal = (local && playerid == local.playerid);
        let players = holdem.getPlayers(local.gameid);
        let player = players[playerid];
        let game = holdem.getGame(local.gameid);

        if (!player || game.state.phase > holdem.PHASE_NONE) {
            return <React.Fragment />
        }
        if (isLocal) {
            return (
                <div>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={player.ready ? "Ready" : "Not Ready"}
                            defaultValue={player.ready}
                            onChange={() => {
                                holdem.ready();
                            }}
                        />
                    </Form>
                    {/* <Button variant="primary" disabled={player.ready} onClick={() => { holdem.ready(); }}>Ready</Button>
                    <Button variant="secondary" disabled={!player.ready} onClick={() => { holdem.ready(); }}>Not Ready</Button> */}
                </div>
            );


        }

        return (
            <div>
                <span style={{ display: 'inline-block', paddingLeft: '2.25rem' }}>{player.ready ? "Ready" : "Not Ready"}</span>
            </div>
        )
    }
}

let onCustomWatched = (ownProps) => {
    if (ownProps.playerid)
        return ['playerReady-' + ownProps.playerid];
    return []
}

let onCustomProps = (key, value, store, ownProps) => {
    return {
        [key]: value
    }
}

export default fs.connect([], onCustomWatched, onCustomProps)(ReadyAction);