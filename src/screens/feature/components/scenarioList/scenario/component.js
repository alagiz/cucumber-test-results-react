import React, {Component} from 'react';

import './style.css';
import Step from '../step/component';
import ScenarioDetails from '../scenarioDetails/component';
import Collapsible from 'react-collapsible';

class Scenario extends Component {
    render() {
        const scenario = this.props.scenario || {after: 0, steps: [], testsPassed: false, timeRate: 0};
        const scenarioAfter = scenario.after ? scenario.after : null;
        const steps = scenario.steps.map((step, index) => <Step key={index} step={step} scenarioAfter={scenarioAfter} maxScenarioTime={this.props.maxScenarioTime}/>);
        const scenarioDetails = <ScenarioDetails scenario={scenario} maxScenarioTime={this.props.maxScenarioTime}/>;

        return (
            <Collapsible className="scenario" openedClassName="scenario" trigger={scenarioDetails}>
                <div className="step-list-container">
                    <div className="step-list-title">Steps:</div>
                    <div className="step-list">{steps}</div>
                </div>
            </Collapsible>
        )
    }
}

export default Scenario;