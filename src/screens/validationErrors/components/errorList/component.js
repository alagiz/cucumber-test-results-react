import React, {Component} from 'react';
import './style.css';

import Error from './error/component';

class ValidationErrorList extends Component {
    render() {
        const validationErrors = this.props.errors || [];
        const validationErrorsDisplay = validationErrors.map((error, index) =>
            <Error key={index} error={error}/>);

        return (
            <div className="validation-errors-list">
                {validationErrorsDisplay}
            </div>
        );
    }
}

export default ValidationErrorList;
