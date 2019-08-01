import React, {Component} from 'react';
import './style.css';

import ValidationErrorList from './components/errorList/component';
import ValidationErrorsHeader from './components/header/component';

class ValidationErrors extends Component {
    render() {
        const errors = this.props.errors || [];

        return (
            <div className="features">
                <ValidationErrorsHeader/>
                <ValidationErrorList errors={errors}/>
            </div>
        );
    }
}

export default ValidationErrors;
