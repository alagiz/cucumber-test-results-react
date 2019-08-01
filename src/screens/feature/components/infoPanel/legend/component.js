import React, {Component} from 'react';

import './style.css';

class InfoPanelLegend extends Component {
    render() {
        return (
            <div className="info-panel-legend">
                <div className="feature-info-panel-title">All scenarios / steps</div>
                <div className="feature-legend-item-container">
                    <div className="legend-item">
                        <div className="square passed"/>
                        passed
                    </div>
                    <div className="legend-item">
                        <div className="square failed"/>
                        failed
                    </div>
                    <div className="legend-item">
                        <div className="square skipped"/>
                        skipped
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoPanelLegend;