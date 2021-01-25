import React, { Component } from "react";
import './Card.css';
import holdem from '../service/holdem';
import ReadyAction from './ReadyAction';
import flatstore from 'flatstore';
import UserAction from "./UserAction";

class Player extends Component {

    showActiveMarker() {
        <span style={{ display: 'inline-block', width: '1rem', marginRight: '1rem' }}>&gt;</span>
    }
    render() {
        let player = this.props.data;

        return (
            <div className="player">
                {this.showActiveMarker()}
                <span style={{ display: 'inline-block', width: '10rem', marginRight: '1rem' }}>#{this.props.seat + 1} {player.displayname}</span>
                <span>${player.chips}</span>
                <ReadyAction playerid={player.name}></ReadyAction>
                <UserAction playerid={player.name}></UserAction>
            </div>
        );
    }
}

export default Player;