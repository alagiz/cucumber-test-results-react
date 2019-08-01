import React, {Component} from 'react';

import './style.css';

class FeaturesInfoPanelLegend extends Component {
    render() {
        return (
            <div className="info-panel-legend">
                <div className="features-info-panel-title">All features</div>
                <div className="legend-item-container">
                    <div className="legend-item">
                        <div className="square passed"/>
                        passed
                    </div>
                    <div className="legend-item">
                        <div className="square failed"/>
                        failed
                    </div>
                </div>
            </div>
        )
    }
}

export default FeaturesInfoPanelLegend;