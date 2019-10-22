import React, {Component} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment-timezone';
import FontAwesome from 'react-fontawesome';

import './style.css';

class FileInfo extends Component {
    render() {
        const format = 'DD-MMM-YYYY HH:mm:ss';
        const lastModified = moment.tz(this.props.fileInfo.lastModified, 'Europe/Amsterdam').format(format);
        const {releaseVersion, dateTimeOfDeployment} = this.props.fileInfo.deploymentData || {
            releaseVersion: 'NA',
            dateTimeOfDeployment: '01-01-2001T00:00:00'
        };
        const deploymentDateTime = moment.tz(dateTimeOfDeployment, 'Europe/Amsterdam').format(format);
        const bambooAvailable = this.props.fileInfo.bambooAvailable;
        const iconName = bambooAvailable ? 'check-circle' : 'exclamation-circle';
        const iconClass = `${bambooAvailable ? 'bamboo-available' : 'bamboo-not-available'} icon`;

        return (
            <div className="file-info">
                <div className="file-info-item">
                    <div className="file-info-item-label">
                        Version:
                    </div>
                    <div className="file-info-item-label">
                        {releaseVersion}
                    </div>
                </div>
                <div className="file-info-item">
                    <div className="file-info-item-label">
                        Deployed:
                    </div>
                    <div className="file-info-item-date">
                        {deploymentDateTime}
                    </div>
                </div>
                <div className="file-info-item">
                    <div className="file-info-item-label">
                        Tests run:
                    </div>
                    <div className="file-info-item-date">
                        {lastModified}
                    </div>
                </div>
            </div>
        )
    }
}

export default FileInfo;