import React, { Component } from 'react';

import flatstore from 'flatstore';
import GameList from './GameList';
import Table from './Table';

class GameScreen extends Component {

    constructor(props) {
        super(props);

    }

    listJoinedGames() {
        let games = this.props.games;
        let tableList = [];
        for (var id in games) {
            let game = games[id];
            tableList.push((
                <Table key={id} id={id}></Table>
            ))
        }
        return tableList;
    }

    render() {

        return (
            <div>
                <header>
                    <h2>Your Tables</h2>
                </header>
                <main>

                    {this.listJoinedGames()}
                </main>
            </div>
        )
    }
}


let onCustomWatched = (ownProps) => {
    return ['games'];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        [key]: value
    }
}

export default flatstore.connect([], onCustomWatched, onCustomProps)(GameScreen);