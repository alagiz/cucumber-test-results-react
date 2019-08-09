import React, {Component} from 'react';
import axios from 'axios';
import {clone, isEmpty, isNil} from 'ramda';

import './style.css';
import InfoTile from './infoTile/component';
import ServiceHealth from './serviceHealth/component';
const backendIp = process.env.REACT_APP_TB_TO_BE_OBSERVED_IP;
const gatewayPort = process.env.REACT_APP_GATEWAY_PORT;
const javaComputationPort = process.env.REACT_APP_JAVA_COMPUTATION_PORT;
const overlayKpiPort = process.env.REACT_APP_OVERLAY_KPI_PORT;
const authenticationPort = process.env.REACT_APP_AUTHENTICATION_PORT;
const snapshotServicePort = process.env.REACT_APP_SNAPSHOT_SERVICE_PORT;
const lisDataChannelServicePort = process.env.REACT_APP_LIS_DATA_CHANNEL_PORT;
const screenshotPort = process.env.REACT_APP_SCREENSHOT_SERVICE_PORT;
const reactPort = process.env.REACT_APP_REACT_PORT;
const reactCaPort = process.env.REACT_APP_REAACT_CA_PORT;
// const backendIp = 'localhost';

class ExtraInfo extends Component {
    state = {
        services: [
            {
                title: 'gateway',
                id: 'gateway',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${gatewayPort}/health`,
                swaggerUrl: 'http://google.com'
            },
            {
                title: 'java computation',
                id: 'java_computation',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${javaComputationPort}/actuator/health`,
                swaggerUrl: 'http://google.com'
            },
            {
                title: 'overlay kpi',
                id: 'overlay_kpi',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${overlayKpiPort}/health`,
                swaggerUrl: `http://${backendIp}:${overlayKpiPort}/ui`
            },
            {
                title: 'authentication',
                id: 'authentication',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${authenticationPort}/health`,
                swaggerUrl: 'http://google.com'
            },
            {
                title: 'snapshot service',
                id: 'snapshot_service',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${snapshotServicePort}/health`,
                swaggerUrl: 'http://google.com'
            },
            {
                title: 'lis data channel service',
                id: 'lis_data_channel_service',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${lisDataChannelServicePort}/health`,
                swaggerUrl: 'http://google.com'
            },
            {
                title: 'screenshot service',
                id: 'screenshot_service',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${screenshotPort}/health`,
                swaggerUrl: 'http://google.com'
            },
            {
                title: 'react',
                id: 'react',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${reactPort}/health`,
                swaggerUrl: 'http://google.com'
            },
            {
                title: 'react ca',
                id: 'react_ca',
                healthy: false,
                healthCheckUrl: `http://${backendIp}:${reactCaPort}/health`,
                swaggerUrl: 'http://google.com'
            }
        ]
    }

    componentDidMount() {
        this.fetchHealth();
        this.fetchHealthRegularly();
    }

    fetchHealth = () => {
        const services = isNil(this.state.services) ? [] : this.state.services;

        services.forEach(service => {
            axios.get(service.healthCheckUrl)
                .then(() => this.updateServiceHealthById(service.id, true))
                .catch(err => this.updateServiceHealthById(service.id, false));
        });
    }

    updateServiceHealthById = (serviceId, health) => {
        const servicesClone = clone(this.state.services);
        const serviceToBeUpdated = servicesClone.find(service => service.id === serviceId);

        serviceToBeUpdated.healthy = health;

        this.setState({services: servicesClone});
    }

    fetchHealthRegularly = () => {
        setInterval(() => {
            this.fetchHealth();
        }, 5 * 1000);
    }

    render() {
        const extraInfo = this.props.extraInfo || [];
        const infoTiles = extraInfo.map((info, index) => <InfoTile key={index} infoToDisplay={info}/>);
        const services = isEmpty(this.state.services) ? [] : this.state.services;
        const serviceHealthElements = services.map((service, index) => <ServiceHealth key={index} service={service}/>);

        return (
            <div className="extra-info">
                <div className="info-tiles-container">{infoTiles}</div>
                <div className="services-health-container">
                    <div className="services-health-title">SERVICE HEALTH</div>
                    <div className="services-health-status-container">{serviceHealthElements}</div>
                </div>
            </div>
        )
    }
}

export default ExtraInfo;