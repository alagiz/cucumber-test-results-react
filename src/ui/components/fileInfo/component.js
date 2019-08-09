import React, {Component} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment-timezone';
import FontAwesome from 'react-fontawesome';

import './style.css';

class FileInfo extends Component {
    render() {
        const format = 'DD-MMM-YYYY HH:mm:ss';
        const lastModified = moment.tz(this.props.fileInfo.lastModified, 'Europe/Amsterdam').format(format);
        const bambooAvailable = this.props.fileInfo.bambooAvailable;
        const iconName = bambooAvailable ? 'check-circle' : 'exclamation-circle';
        const iconClass = `${bambooAvailable ? 'bamboo-available' : 'bamboo-not-available'} icon`;
        const iconToShow = <FontAwesome className={iconClass}
                                        name={iconName}/>;

        return (
            <div className="file-info">
                <div className="file-info-item">
                    Bamboo status:
                    <div className="bamboo-icon"> {iconToShow} </div>
                </div>
                <div className="file-info-item">
                    <div className="file-info-item-label">
                        Cucumber tests last run:
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