import React, {Component} from 'react';

import './style.css';
import FilterButton from '../filterButton/component';

class FilterPanel extends Component {
    render() {
        return (
            <div className="filter-panel">
                <FilterButton buttonId="passed" filterData={this.props.filterData}/>
                <FilterButton buttonId="failed" filterData={this.props.filterData}/>
                <FilterButton buttonId="all" filterData={this.props.filterData}/>
            </div>
        )
    }
}

export default FilterPanel;