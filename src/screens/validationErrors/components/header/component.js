import React, {Component} from 'react';
import 'react-circular-progressbar/dist/styles.css';

import './style.css';
import cucumberLogo from '../../../../rickle.png';

class ValidationErrorsHeader extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-title">
                    <div className="header-title-container">
                        <div>ERRORS!</div>
                        <div>In incoming file...</div>
                    </div>
                    <div>
                        <img src={cucumberLogo} className="cucumber-logo-errors" alt={cucumberLogo}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ValidationErrorsHeader;