import React, {Component} from 'react';
import random from 'random';

import './style.css';
import Feature from './featureTile/component';

class FeatureList extends Component {
    render() {
        const features = this.props.features || [];
        const featuresElements = features.map(feature =>
            <Feature key={`${feature.id}-${random.float(0, 1)}`} feature={feature}/>);

        return (
            <div className="feature-list-container">
                <div className="feature-list">{featuresElements}</div>
                <div/>
            </div>
        )
    }
}

export default FeatureList;