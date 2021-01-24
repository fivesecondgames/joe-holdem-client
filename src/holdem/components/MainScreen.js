import React, { Component } from 'react';

import flatstore from 'flatstore';
import GameList from './GameList';
import GameScreen from './GameScreen';
import holdem from '../service/holdem';

class MainScreen extends Component {

    constructor(props) {
        super(props);

        holdem.requestAPIKey();
    }

    render() {

        return (
            <div>
                <header>
                    <h2>Welcome to Joe's Holdem</h2>
                </header>
                <main>
                    <table>
                        <tr>
                            <td><GameList></GameList></td>
                            <td><GameScreen></GameScreen></td>
                        </tr>
                    </table>

                </main>
            </div>
        )
    }
}


export default MainScreen;