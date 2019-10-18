import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import {Tooltip} from 'antd';

import './style.css';
import TimeUtils from '../../../../../utils/timeUtils';

class Step extends Component {
    render() {
        const step = this.props.step || {timeRate: 0, status: 'failed'};
        const shouldBeCollapsible = step.status === 'failed';
        const scenarioAfter = this.props.scenarioAfter || [];
        const imageList = (shouldBeCollapsible && scenarioAfter) ?
            scenarioAfter.map(afterArray => afterArray.embeddings ?
                afterArray.embeddings.map((embeddings, index) => {
                    if (embeddings.data) {
                        const mimeType = embeddings.mime_type;
                        const imageSrc = `data:${mimeType};base64, ${embeddings.data}`;

                        return <img alt="error screenshot" key={index} src={imageSrc} style={{width: '100%'}}/>
                    }

                    return '';
                }) : ''
            ) : '';
        const stepStatusClass = step.status ? step.status : 'failed';
        const stepStatusIndicatorClass = `${stepStatusClass} rectangle`;
        const width = TimeUtils.getWidthBasedOnTimeRate(step.timeRate);
        const stepTime = TimeUtils.convertNanosecondsToTime(step.timeRate * this.props.maxScenarioTime);
        const divStyle = {'maxWidth': width, 'minWidth': width};
        const stepNameDivStyle = {'maxWidth': `calc(100% - ${width} - 1em)`, 'minWidth': `calc(100% - ${width} - 1em)`};
        const stepDiv =
            <div className="step">
                <div className="step-content">
                    <div className="step-status-and-name">
                        <div className={stepStatusIndicatorClass}/>
                        <div className="step-name"
                             style={stepNameDivStyle}>{step.name}</div>
                    </div>
                    <Tooltip placement="left" title={stepTime}>
                        <div className={stepStatusClass} style={divStyle}/>
                    </Tooltip>
                </div>
            </div>;
        const collapsibleStep =
            <Collapsible className="step-collapsible"
                         openedClassName="step-collapsible"
                         trigger={<div className="step-collapsible-top">{stepDiv}</div>}>
                <div className="step-error-details">
                    {imageList}
                    <div className="error-message">
                        {step.result ? step.result.error_message ? step.result.error_message : '' : ''}
                    </div>
                </div>
            </Collapsible>;
        const resultingDiv = shouldBeCollapsible ? collapsibleStep : stepDiv;

        return (
            resultingDiv
        )
    }
}

export default Step;