import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import flatstore from 'flatstore';
import Card from './Card';
import holdem from '../service/holdem';

class CreateGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            blindCount: 2,
        }

        this.rules = {};

        this.rules.game = {
            name: "Texas Holdem",   //name of the game
            maxCards: 2,            //how many cards to deal to player
            seatCount: 10,           //how many seats at this table
            blindCount: 2,          //how many blinds on table
            blindCost: 2,          //each blind level is multlipled by cost
            ante: 0,               //minimum each player has to start 
            minBet: 4,             //minimum bet size
            maxBet: 8,             //maximum bets allowed per bet round
            maxRaises: 4,
            chipsizes: [1, 5, 10],            //chip sizes, mostly used for splitting pot
            betmode: 'limit',     //Betting modes 'nolimit' or 'limit'
            betrule: 'tournament',  //Rules 'tournament' or 'casual'
            //  tournament increase minimum bet 
        }
    }

    async CreateGame() {
        await holdem.createGame({ rules: this.rules });
        this.setState({ show: false });

        this.gameList = await holdem.listGames();
        flatstore.set('gameList', this.gameList);
    }

    render() {

        return (
            <div style={{ display: 'inline-block' }}>
                <Button variant="primary" onClick={() => { this.setState({ show: true }) }}>Create Game</Button>

                <Modal show={this.state.show} onHide={() => { this.setState({ show: false }); }} animation="false">
                    <Modal.Header closeButton>
                        <Modal.Title>Create Table</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={true}>
                            <Form.Group controlId="formBasicEmail">
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">
                                                <Form.Label>Table Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    minLength="5"
                                                    size="sm"
                                                    type="text"
                                                    defaultValue={this.rules.game.name}
                                                    placeholder="Enter a name for this table"
                                                    onChange={(e) => {
                                                        this.rules.game.name = e.target.value;
                                                        console.log(e.target.value);
                                                    }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <Form.Label>Seat Count</Form.Label>
                                                <Form.Control
                                                    size="sm"
                                                    type="number"
                                                    readOnly
                                                    value={this.rules.game.seatCount} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Form.Label>Blind Count = <strong>{this.state.blindCount}</strong></Form.Label>
                                                <Form.Control
                                                    required
                                                    size="sm"
                                                    type="range"
                                                    min="0"
                                                    max="3"
                                                    defaultValue="2"
                                                    onChange={(e) => {
                                                        this.rules.game.blindCount = e.target.value;
                                                        this.setState({ blindCount: e.target.value });
                                                    }} />
                                            </td>

                                            <td>
                                                <Form.Label>Blind Cost $</Form.Label>
                                                <Form.Control
                                                    required
                                                    size="sm"
                                                    type="number"
                                                    min="0"
                                                    max="1000"
                                                    defaultValue={this.rules.game.blindCost}
                                                    placeholder="Enter blind cost"
                                                    onChange={(e) => {
                                                        this.rules.game.blindCost = e.target.value;
                                                        console.log(e.target.value);
                                                    }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Form.Label>Ante $</Form.Label>
                                                <Form.Control
                                                    required
                                                    size="sm"
                                                    type="number"
                                                    min="0"
                                                    max="1000"
                                                    defaultValue={this.rules.game.ante}
                                                    placeholder="Enter an ante cost $"
                                                    onChange={(e) => {
                                                        this.rules.game.ante = e.target.value;
                                                        console.log(e.target.value);
                                                    }} />
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Form.Label>Min Bet $</Form.Label>
                                                <Form.Control
                                                    required
                                                    size="sm"
                                                    type="number"
                                                    min="0"
                                                    max="1000"
                                                    defaultValue={this.rules.game.minBet}
                                                    placeholder="Enter an min bet $"
                                                    onChange={(e) => {
                                                        this.rules.game.minBet = e.target.value;
                                                        console.log(e.target.value);
                                                    }} />
                                                <Form.Text className="text-muted">
                                                    &nbsp;
                                            </Form.Text>
                                            </td>
                                            <td>
                                                <Form.Label>Max Bet $</Form.Label>
                                                <Form.Control
                                                    required
                                                    size="sm"
                                                    type="number"
                                                    min="0"
                                                    max="10000"
                                                    defaultValue={this.rules.game.maxBet}
                                                    placeholder="Enter an max bet $"
                                                    onChange={(e) => {
                                                        this.rules.game.maxBet = e.target.value;
                                                        console.log(e.target.value);
                                                    }} />
                                                <Form.Text className="text-muted">
                                                    0 for unlimited
                                            </Form.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <Form.Label>Max Raises</Form.Label>
                                                <Form.Control
                                                    required
                                                    size="sm"
                                                    type="number"
                                                    min="-1"
                                                    max="10"
                                                    defaultValue={this.rules.game.maxRaises}
                                                    placeholder="Enter an max raises count"
                                                    onChange={(e) => {
                                                        this.rules.game.maxRaises = e.target.value;
                                                        console.log(e.target.value);
                                                    }} />
                                                <Form.Text className="text-muted">
                                                    -1 = 1 raise for each player<br />0 = no limit<br />1 to 10 = set a raise count
                                                </Form.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </Form.Group>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.setState({ show: false }); }}>Cancel</Button>
                        <Button variant="primary" onClick={() => { this.CreateGame(); }}>Create</Button>
                    </Modal.Footer>
                </Modal >
            </div >
        )
    }
}


let onCustomWatched = (ownProps) => {
    return [];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        [key]: value
    }
}

export default flatstore.connect([], onCustomWatched, onCustomProps)(CreateGame);