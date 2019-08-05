import React, {Component} from 'react';
import {HotKeys} from "react-hotkeys";
import './style.css';

import FeatureList from './components/featureList/component';
import FeaturesHeader from './components/header/component';
import DataHandler from '../../utils/dataHandler';
import FeaturesInfoPanel from './components/infoPanel/component';
import FileInfo from '../../ui/components/fileInfo/component';
import ExtraInfo from './components/extraInfo/component';
import CircularProgressbar from 'react-circular-progressbar';
import TimeUtils from '../../utils/timeUtils';

class Features extends Component {
    keyMap = {showCucumberLogo: 'alt+c', showWhiteRabbitLogo: 'alt+w'};
    handlers = {
        showCucumberLogo: () => this.setState({
            headerData: {
                overallDuration: this.state.headerData.overallDuration,
                featuresNumber: this.state.headerData.featuresNumber,
                numberOfPassedFeatures: this.state.headerData.numberOfPassedFeatures,
                cucumberLogoVisible: !this.state.headerData.cucumberLogoVisible,
                whiteRabbitLogoVisible: this.state.headerData.whiteRabbitLogoVisible
            }
        }),
        showWhiteRabbitLogo: () => this.setState({
            headerData: {
                overallDuration: this.state.headerData.overallDuration,
                featuresNumber: this.state.headerData.featuresNumber,
                numberOfPassedFeatures: this.state.headerData.numberOfPassedFeatures,
                cucumberLogoVisible: this.state.headerData.cucumberLogoVisible,
                whiteRabbitLogoVisible: !this.state.headerData.whiteRabbitLogoVisible
            }
        })
    };

    state = {
        headerData: {
            overallDuration: 0,
            featuresNumber: 0,
            numberOfPassedFeatures: 0,
            cucumberLogoVisible: false,
            whiteRabbitLogoVisible: false
        },
        filteredFeatures: [],
        originalFeatures: [],
        data: this.props.data.data,
        csharpCoveragePercentage: this.props.data.csharpCoveragePercentage,
        rCoveragePercentage: this.props.data.rCoveragePercentage,
        staticCodeAnalysisResults: this.props.data.staticCodeAnalysisResults
    };

    componentWillMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        const features = Features.getFeatures(nextProps.data.data);
        const headerData = DataHandler.getHeaderData(features);

        this.setState({
            headerData: headerData,
            filteredFeatures: features,
            originalFeatures: features,
            data: nextProps.data.data,
            csharpCoveragePercentage: nextProps.data.csharpCoveragePercentage,
            rCoveragePercentage: nextProps.data.rCoveragePercentage,
            staticCodeAnalysisResults: nextProps.data.staticCodeAnalysisResults
        });
    }

    render() {
        const fileInfo = {
            lastModified: this.props.data.lastModified,
            lastChecked: this.props.data.lastChecked,
            bambooAvailable: this.props.data.bambooAvailable
        };
        const headerData = this.state.headerData || {
                overallDuration: 0,
                featuresNumber: 0,
                numberOfPassedFeatures: 0
            };
        const overallDuration = TimeUtils.convertNanosecondsToTime(headerData.overallDuration);
        const featuresNumber = headerData.featuresNumber;
        const numberOfPassedFeatures = headerData.numberOfPassedFeatures;
        const percentageOfPassed = featuresNumber !== 0 ? numberOfPassedFeatures / featuresNumber * 100 : 0;
        const circularIndicatorText = `${numberOfPassedFeatures}/${featuresNumber}`;
        const circularIndicator = <div className="test-status">
            <CircularProgressbar className="circular-progressbar"
                                 percentage={percentageOfPassed}
                                 text={circularIndicatorText}/>
        </div>;

        const extraInfo = [
            {
                title: 'overall results',
                content: circularIndicator
            },
            {
                title: 'overall duration',
                content: <div className="info-tile-bottom-text">{overallDuration}</div>
            }
        ];

        return (
            <HotKeys keyMap={this.keyMap} handlers={this.handlers}>
                <div className="features">
                    <FeaturesHeader headerData={this.state.headerData}/>
                    <ExtraInfo extraInfo={extraInfo}/>
                    <FeaturesInfoPanel filterData={this.filterData.bind(this)}/>
                    <FeatureList features={this.state.filteredFeatures}/>
                    <FileInfo fileInfo={fileInfo}/>
                </div>
            </HotKeys>
        );
    }

    loadData() {
        const features = DataHandler.addRelevantInformation(this.state.data);
        const headerData = DataHandler.getHeaderData(features);

        this.setState({
            headerData: headerData,
            filteredFeatures: features,
            originalFeatures: features,
            data: this.state.data,
            csharpCoveragePercentage: this.state.csharpCoveragePercentage,
            rCoveragePercentage: this.state.rCoveragePercentage,
            staticCodeAnalysisResults: this.state.staticCodeAnalysisResults
        });
    }

    static getFeatures(data) {
        return DataHandler.addRelevantInformation(data);
    }

    filterData(filterKey) {
        const filteredFeatures = DataHandler.filterData(this.state.originalFeatures, filterKey);
        const filteredHeaderData = DataHandler.getHeaderData(filteredFeatures);

        this.setState({
            headerData: filteredHeaderData,
            filteredFeatures: filteredFeatures,
            originalFeatures: this.state.originalFeatures,
            csharpCoveragePercentage: this.state.csharpCoveragePercentage,
            rCoveragePercentage: this.state.rCoveragePercentage,
            staticCodeAnalysisResults: this.state.staticCodeAnalysisResults
        });
    }
}

export default Features;
