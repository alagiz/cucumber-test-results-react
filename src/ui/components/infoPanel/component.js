import React, {Component} from 'react';

import './style.css';

class InfoPanel extends Component {
    render() {
        const leftSideComponent = this.props.leftSideComponent;
        const rightSideComponent = this.props.rightSideComponent;

        return (
            <div className="info-panel">
                {leftSideComponent}
                {rightSideComponent}
            </div>
        )
    }
}

export default InfoPanel;