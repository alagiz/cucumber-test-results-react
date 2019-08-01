import React, {Component} from 'react';

import './style.css';
import FeaturesInfoPanelLegend from './legend/component';
import FilterPanel from './filterPanel/component';
import InfoPanel from '../../../../ui/components/infoPanel/component';

class FeaturesInfoPanel extends Component {
    render() {
        const infoPanelLeftSideComponent = <FeaturesInfoPanelLegend/>;
        const infoPanelRightSideComponent = <FilterPanel filterData={this.props.filterData}/>;

        return (
            <InfoPanel filterData={this.props.filterData}
                       leftSideComponent={infoPanelLeftSideComponent}
                       rightSideComponent={infoPanelRightSideComponent}/>
        )
    }
}

export default FeaturesInfoPanel;