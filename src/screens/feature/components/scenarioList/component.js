import React, {Component} from 'react';

import './style.css';
import Scenario from './scenario/component';

class ScenarioList extends Component {
    render() {
        const feature = this.props.feature || {elements: []};
        const scenarios = feature.elements;
        const scenarioList = scenarios.map((scenario, index) =>
            <Scenario key={`scenario ${index}`}
                      scenario={scenario}/>);

        return (
            <div className="scenario-list-container">
                <div className="scenario-list">{scenarioList}</div>
            </div>
        )
    }
}

export default ScenarioList;