import React, { Component } from "react";
import './Card.css';
import flatstore from 'flatstore';
import Player from "./Player";

class Table extends Component {
    constructor(props) {
        super(props);
    }


    listTableCards() {

    }

    listTablePot() {

    }

    listPlayers() {
        let playerList = [];
        let game = this.props[this.props.id];
        if (!game)
            return [];

        for (var name in game.state.players) {
            let player = game.state.players[name];
            playerList.push((
                <Player name={player.name} data={player}></Player>
            ))
        }

        return playerList;
    }

    render() {
        let game = this.props.game;
        if (!game)
            return (<div></div>)
        return (
            <div class="table">
                {game.rules.game.name} - {this.props.id}
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>{this.listPlayers()}</td>
                                <td>{this.listTableCards()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
let onCustomWatched = (ownProps) => {
    return [ownProps.id];
}
let onCustomProps = (key, value, store, ownProps) => {
    if (key == ownProps.id)
        return { 'game': value };

    return {
        [key]: value
    }
}

export default flatstore.connect([], onCustomWatched, onCustomProps)(Table);