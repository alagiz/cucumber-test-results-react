import React, {Component} from 'react';
import {isNil} from 'ramda';

import './style.css';

class ServiceHealth extends Component {
    openSwagger = swaggerUrl => window.open(swaggerUrl, "_blank");

    render() {
        const service = this.props.service;
        const healthClass = isNil(service) ? 'unhealthy' : service.healthy ? 'healthy' : 'unhealthy';
        const title = isNil(service) ? '' : service.title;
        const swaggerUrl = isNil(service) ? 'http://google.com' : service.swaggerUrl;

        return (
            <div
                className={`service-health service-health-title-${healthClass}`}
                onClick={() => this.openSwagger(swaggerUrl)}>
                {title}
            </div>
        )
    }
}

export default ServiceHealth;