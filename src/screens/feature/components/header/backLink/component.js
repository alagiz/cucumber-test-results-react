import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import './style.css';

class BackLink extends Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    render() {
        return (
            <div className="back-link" onClick={this.handleOnClick}>
                <FontAwesome className="arrow-left" name="arrow-left"/>
                Back to overview
            </div>
        )
    }

    handleOnClick() {
        this.props.history.push({
            pathname: '/'
        });
    }
}

export default withRouter(BackLink);