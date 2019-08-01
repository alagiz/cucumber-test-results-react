import React, {Component} from 'react';

import './style.css';

class Error extends Component {
    render() {
        const error = this.props.error || "";
        const dataPath = error.dataPath;
        const errorMessage = error.message;

        return (
            <div className="validation-error">
                <div className="validation-error-item">
                    <div className="error-label">Problematic data path:</div>
                    <div>{dataPath}</div>
                </div>
                <div className="validation-error-item">
                    <div className="error-label">Error message:</div>
                    <div>{errorMessage}</div>
                </div>
            </div>
        );
    }
}

export default Error;
