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
import whiteRabbitLogo from "../../unstable_hare.png";

class Features extends Component {
    keyMap = {showCucumberLogo: 'alt+c', showWhiteRabbitLogo: 'alt+w'};
    handlers = {
        showCucumberLogo: () => this.setState({
            headerData: {
                overallDuration: this.state.headerData.overallDuration,
                featuresNumber: this.state.headerData.featuresNumber,
                numberOfPassedFeatures: this.state.headerData.numberOfPassedFeatures,
                cucumberLogoVisible: !this.state.headerData.cucumberLogoVisible,
                unstableLogoVisible: this.state.headerData.unstableLogoVisible
            }
        }),
        showWhiteRabbitLogo: () => this.setState({
            headerData: {
                overallDuration: this.state.headerData.overallDuration,
                featuresNumber: this.state.headerData.featuresNumber,
                numberOfPassedFeatures: this.state.headerData.numberOfPassedFeatures,
                cucumberLogoVisible: this.state.headerData.cucumberLogoVisible,
                unstableLogoVisible: !this.state.headerData.unstableLogoVisible
            }
        })
    };

    state = {
        headerData: {
            overallDuration: 0,
            featuresNumber: 0,
            numberOfPassedFeatures: 0,
            cucumberLogoVisible: false,
            unstableLogoVisible: false
        },
        filteredFeatures: [],
        originalFeatures: [],
        data: this.props.data.data
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
            data: nextProps.data.data
        });
    }

    render() {
        const fileInfo = {
            lastModified: this.props.data.lastModified,
            deploymentData: this.props.data.deploymentData,
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

        const extraInfo = {
            testsDetails: [
                {
                    title: 'overall results',
                    content: circularIndicator
                },
                {
                    title: 'overall duration',
                    content: <div className="info-tile-bottom-text">{overallDuration}</div>
                }
            ],
            healthMonitoringServiceList: this.props.data.healthMonitoringServiceList || []
        };

        const unstableHare = <div className="unstable-logo-container">
            <img src={whiteRabbitLogo}
                 className="unstable-logo"
                 hidden={!this.state.headerData.unstableLogoVisible}
                 alt={whiteRabbitLogo}/>
        </div>;

        return (
            <HotKeys keyMap={this.keyMap} handlers={this.handlers}>
                <div className="features">
                    <FeaturesHeader headerData={this.state.headerData}/>
                    <ExtraInfo extraInfo={extraInfo}/>
                    <FeaturesInfoPanel filterData={this.filterData.bind(this)}/>
                    <FeatureList features={this.state.filteredFeatures}/>
                    <FileInfo fileInfo={fileInfo}/>
                    {unstableHare}
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
