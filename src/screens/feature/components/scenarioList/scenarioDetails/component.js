import React, {Component} from 'react';
import {Tooltip} from 'antd';

import './style.css';
import TimeUtils from '../../../../../utils/timeUtils';

class ScenarioDetails extends Component {
    render() {
        const scenario = this.props.scenario || {testsPassed: false, timeRate: 0};
        const scenarioStatusClass = scenario.testsPassed ? 'passed' : 'failed';
        const scenarioClass = `${scenarioStatusClass} scenario-time`;
        const scenarioStatusIndicatorClass = `${scenarioStatusClass} rectangle`;
        const divStyle = {'maxWidth': TimeUtils.getWidthBasedOnTimeRate(scenario.timeRate)};
        const scenarioTime = TimeUtils.convertNanosecondsToTime(scenario.timeRate * this.props.maxScenarioTime);

        return (
            <div className="scenario-details">
                <div className="scenario-status-and-name">
                    <div className={scenarioStatusIndicatorClass}/>
                    <div className="scenario-name">{scenario.name}</div>
                </div>
                <Tooltip placement="left" title={scenarioTime}>
                    <div className={scenarioClass} style={divStyle}/>
                </Tooltip>
            </div>
        )
    }
}

export default ScenarioDetails;