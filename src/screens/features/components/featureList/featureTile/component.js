import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import './style.css';
import TimeUtils from '../../../../../utils/timeUtils';

class FeatureTile extends Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    render() {
        const feature = this.props.feature || {name: '', scenariosNumber: 0, duration: 0};
        const featureName = feature.name || '';
        const featureScenariosNumber = feature.scenariosNumber || 0;
        const featureDuration = feature.duration || 0;
        const featureStatusClass = feature ? feature.testsPassed ? 'passed' : 'failed' : '';
        const featureTileClass = `feature-tile-content ${featureStatusClass}`;
        const firstFailedScenario = feature ? feature.testsPassed ? null : feature.firstFailedScenario : null;
        const firstFailedStep = feature ? feature.testsPassed ? null : feature.firstFailedStep : null;
        const firstFailedScenarioName = firstFailedScenario ? firstFailedScenario.name : 'Not defined';
        const firstFailedStepName = firstFailedScenario ? firstFailedStep.name : 'Not defined';
        const featureTileMiddlePartDiv =
            <div className="feature-tile-middle">
                <div className="failed-scenario-name">Failed at:
                    <span className="feature-tile-scenario-name">{firstFailedScenarioName}</span>
                </div>
                <div className="failed-step-name">Step: {firstFailedStepName}</div>
            </div>;
        const featureTileMiddlePart = feature ? feature.testsPassed ? '' :
            featureTileMiddlePartDiv : '';

        return (
            <div className="feature-tile"
                 onClick={this.handleOnClick}>
                <div className={featureTileClass}>
                    <div className="feature-tile-upper">
                        <div className="dashboard-name">{featureName}</div>
                    </div>
                    {featureTileMiddlePart}
                    <div className="feature-tile-downer">
                        <div className="duration">
                            <div className="feature-tile-statistics">
                                <div>{featureScenariosNumber} scenarios in</div>
                                <div
                                    className="feature-tile-statistics-duration">{TimeUtils.convertNanosecondsToTime(featureDuration)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={featureStatusClass}/>
            </div>
        )
    }

    handleOnClick() {
        this.props.history.push({
            pathname: `/feature/${this.props.feature.id}`,
            feature: this.props.feature,
            loadData: this.props.loadData
        });
    }
}

export default withRouter(FeatureTile);