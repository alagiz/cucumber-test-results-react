import React from 'react';
import ReactDOM from 'react-dom';
import Component from './component';
import {BrowserRouter as Router} from 'react-router-dom';

describe('feature header rendering', () => {
    describe('reactDOM', () => {
        it('should render without crashing', () => {
            const div = document.createElement('div');

            ReactDOM.render(<Router><Component/></Router>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });
});
