import React, { Component } from "react";
import './Card.css';
import holdem from '../service/holdem';
import ReadyAction from './ReadyAction';
import flatstore from 'flatstore';

class Player extends Component {

    showActiveMarker() {
        <span style={{ display: 'inline-block', width: '1rem', marginRight: '1rem' }}>&gt;</span>
    }
    render() {
        let player = this.props.data;

        return (
            <div class="player">
                {this.showActiveMarker()}
                <span style={{ display: 'inline-block', width: '10rem', marginRight: '1rem' }}>#{player.seat + 1} {player.displayname}</span>
                <span>${player.chips}</span>
                <ReadyAction playerid={player.playerid}></ReadyAction>
            </div>
        );
    }
}

export default Player;