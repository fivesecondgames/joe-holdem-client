import React, { Component } from "react";
import './Card.css';
import holdem from '../service/holdem';
import Button from 'react-bootstrap/Button'
import fs from 'flatstore';

class ReadyAction extends Component {

    render() {
        let playerid = this.props.playerid;
        let local = holdem.getMe();
        let isLocal = (local && playerid == local.playerid);

        if (isLocal) {
            return (
                <div>
                    <Button variant="primary" onClick={() => { holdem.ready(playerid); }}>Ready</Button>
                </div>
            );
        }

        return (
            <div>
                <span>Ready</span>
            </div>
        )
    }
}

let onCustomWatched = (ownProps) => {
    return ['playerReady-' + ownProps.playerid];
}

let onCustomProps = (key, value, store, ownProps) => {
    return {
        [key]: value
    }
}

export default fs.connect([], onCustomWatched, onCustomProps)(ReadyAction);