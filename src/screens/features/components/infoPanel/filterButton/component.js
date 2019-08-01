import React, {Component} from 'react';

import './style.css';

class FilterButton extends Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    render() {
        const buttonId = this.props.buttonId;
        const buttonClass = `filter-button show-${buttonId}`;

        return (
            <div className={buttonClass} onClick={event => this.handleOnClick(event, buttonId)}/>
        )
    }

    handleOnClick(event, filterKey) {
        if (typeof this.props.filterData !== 'function') {
            throw new Error('Thing passed to the button is not a function!');
        }

        this.props.filterData(filterKey);
    }
}

export default FilterButton;