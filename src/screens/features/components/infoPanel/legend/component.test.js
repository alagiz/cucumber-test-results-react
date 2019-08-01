import React from 'react';
import ReactDOM from 'react-dom';
import Component from './component';

describe('features infoPanel legend rendering', () => {
    describe('reactDOM', () => {
        it('should render without crashing', () => {
            const div = document.createElement('div');

            ReactDOM.render(<Component/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });
});
