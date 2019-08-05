import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import './style.css';
import TimeUtils from '../../../../utils/timeUtils';
import InfoPanelLink from './backLink/component';

class FeatureHeader extends Component {
    render() {
        const feature = this.props.feature || {name: '', testsPassed: false, duration: 0};
        const {name, testsPassed, duration} = feature;
        const overallDuration = TimeUtils.convertNanosecondsToTime(duration);
        const iconName = testsPassed ? 'check-circle' : 'exclamation-circle';
        const iconClass = `${testsPassed ? 'tests-passed' : 'tests-failed'} icon`;
        const iconToShow = <FontAwesome className={iconClass} name={iconName} size='3x'/>;

        return (
            <div className="feature-header">
                <div className="feature-name-status-link">
                    <div className="feature-name-status">
                        {iconToShow}
                        <div className="feature-name">
                            {name}
                        </div>
                    </div>
                    <InfoPanelLink/>
                </div>
                <div className="duration-container">
                    <div>Overall time</div>
                    <div className="duration-time">{overallDuration}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(FeatureHeader);