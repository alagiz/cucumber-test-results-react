import React, {Component} from 'react';

import './style.css';
import TimeUtils from '../../../../../utils/timeUtils';

class ScenarioDetails extends Component {
    render() {
        const scenario = this.props.scenario || {testsPassed: false, timeRate: 0};
        const scenarioStatusClass = scenario.testsPassed ? 'passed' : 'failed';
        const scenarioStatusIndicatorClass = `${scenarioStatusClass} rectangle`;
        const divStyle = {'maxWidth': TimeUtils.getWidthBasedOnTimeRate(scenario.timeRate)};

        return (
            <div className="scenario-details">
                <div className="scenario-status-and-name">
                    <div className={scenarioStatusIndicatorClass}/>
                    <div className="scenario-name">{scenario.name}</div>
                </div>
                <div className={scenarioStatusClass} style={divStyle}/>
            </div>
        )
    }
}

export default ScenarioDetails;