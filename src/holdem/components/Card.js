import React, { Component } from "react";
import './Card.css';

class Card extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.rotationY !== this.props.rotationY) {
            return true;
        }

        if (nextProps.size !== this.props.size) {
            return true;
        }

        return false;
    }
    render() {
        const { index, card, size, down, rotationY } = this.props;

        return (
            <div className="card" style={{ transform: `rotateY(${rotationY}deg)` }}>
                <img
                    className={down === true ? "front" : "back"}
                    src={"cards/back.png"}
                    style={{ width: "100%", height: "100%" }}
                />
                <img
                    className={down === true ? "back" : "front"}
                    src={`cards/${card}.svg`}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        );
    }
}

export default Card;