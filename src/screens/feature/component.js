import React, {Component} from 'react';
import {isNil} from 'ramda';

import DataHandler from '../../utils/dataHandler';
import ScenarioList from './components/scenarioList/component';
import FeatureHeader from './components/header/component';
import FeatureInfoPanel from './components/infoPanel/component';
import FileInfo from '../../ui/components/fileInfo/component';

class Feature extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feature: {},
            data: isNil(this.props.data) ? [] : this.props.data.data
        };

        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                feature: this.state.feature,
                data: nextProps.data.data
            });
            this.loadData();
        }
    }

    render() {
        const feature = isNil(this.props.location) ? this.state.feature : this.props.location.feature;
        const fileInfo = {
            lastModified: isNil(this.props.data) ? '' : this.props.data.lastModified,
            lastChecked: isNil(this.props.data) ? '' : this.props.data.lastChecked,
            bambooAvailable: isNil(this.props.data) ? '' : this.props.data.bambooAvailable
        };

        return (
            <div className="feature">
                <FeatureHeader feature={feature}/>
                <FeatureInfoPanel feature={feature}/>
                <ScenarioList feature={feature}/>
                <FileInfo fileInfo={fileInfo}/>
            </div>
        );
    }

    loadData() {
        const data = isNil(this.props.data) ? [] : this.props.data.data;
        const features = DataHandler.addRelevantInformation(data);
        const featureId = isNil(this.props.match) ? '' : this.props.match.params.id;
        const feature = features.find(feature => feature.id === featureId);

        this.setState({feature: feature});
    }
}

export default Feature;