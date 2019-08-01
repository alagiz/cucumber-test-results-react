import React, {Component} from 'react';
import {isNil} from 'ramda';

import './style.css';

class InfoTile extends Component {
    render() {
        const infoToDisplay = this.props.infoToDisplay;
        const title = isNil(infoToDisplay) ? '' : infoToDisplay.title;
        const content = isNil(infoToDisplay) ? '' : infoToDisplay.content;

        return (
            <div className="info-tile">
                <div className="info-tile-top">{title.toUpperCase()}</div>
                <div className="info-tile-bottom">{content}</div>
            </div>
        )
    }
}

export default InfoTile;