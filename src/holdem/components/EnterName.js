import React, { Component } from "react";
import flatstore from 'flatstore';
import Form from 'react-bootstrap/Form'
import storage from '../service/storage';

class EnterName extends Component {


    render() {

        return (
            <div style={{ width: '300px' }}>
                <Form noValidate validated={true}>
                    <Form.Group controlId="PlayerName">
                        <Form.Label>Choose a Name {this.props.playername}</Form.Label>
                        <Form.Control
                            required
                            minLength="3"
                            size="sm"
                            type="text"
                            defaultValue={this.props.playername}
                            placeholder="Enter your display name"
                            value={this.props.playername}
                            onChange={(e) => {
                                let name = e.target.value;
                                name = name.replace(/([^a-z0-9]+)/ig, "")
                                storage.set('playername', name);

                                //this.game.name = e.target.value;
                                console.log(e.target.value);
                            }} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

let onCustomWatched = (ownProps) => {
    return ['playername'];
}
let onCustomProps = (key, value, store, ownProps) => {
    return {
        //value: value
    }
}

export default flatstore.connect([], onCustomWatched, {})(EnterName);