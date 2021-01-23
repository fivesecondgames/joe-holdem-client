import React, { Component } from 'react';

import flatstore from 'flatstore';
import GameList from './GameList';

class MainScreen extends Component {

    constructor(props) {
        super(props);


    }

    render() {

        return (
            <div>
                <header>
                    <h2>Welcome to Joe's Holdem</h2>
                </header>
                <main>
                    <GameList></GameList>
                </main>
            </div>
        )
    }
}


let onCustomWatched = (ownProps) => {
    return [];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        value: value
    }
}

export default flatstore.connect([], onCustomWatched, onCustomProps)(MainScreen);