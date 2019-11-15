import React, {Component} from 'react';
import axios from 'axios';
import {clone, isEmpty, isNil} from 'ramda';

import './style.css';
import InfoTile from './infoTile/component';
import ServiceHealth from './serviceHealth/component';

class ExtraInfo extends Component {
    state = {
        services: [],
        healthInterval: null
    }

    setHealthFetching(healthMonitoringServiceList) {
        this.setState({services: healthMonitoringServiceList}, () => {
            clearInterval(this.state.healthInterval);

            this.fetchHealth();
            this.fetchHealthRegularly();
        });
    }

    componentDidMount() {
        const extraInfo = this.props.extraInfo || {healthMonitoringServiceList: []};

        this.setHealthFetching(extraInfo.healthMonitoringServiceList);
    }

    componentWillReceiveProps(nextProps) {
        const newExtraInfo = nextProps.extraInfo;

        this.setHealthFetching(newExtraInfo.healthMonitoringServiceList);
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
        this.setState({
            healthInterval: setInterval(() => {
                this.fetchHealth();
            }, 5 * 1000)
        });
    }

    render() {
        const extraInfo = this.props.extraInfo || {testsDetails: []};
        const testsDetails = extraInfo.testsDetails || [];
        const infoTiles = testsDetails.map((info, index) => <InfoTile key={index} infoToDisplay={info}/>);
        const services = isEmpty(this.state.services) || isNil(this.state.services) ? [] : this.state.services;
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