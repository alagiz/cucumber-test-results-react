import React from 'react';
import ReactDOM from 'react-dom';
import Component from './component';
import TestData from '../../utils/dataHandler.testData.json';
import {BrowserRouter as Router} from 'react-router-dom';

describe('features rendering', () => {
    describe('reactDOM', () => {
        it('should render without crashing', () => {
            const div = document.createElement('div');
            const props = {
                data: {
                    data: TestData
                }
            };

            ReactDOM.render(<Router><Component {...props}/></Router>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });
});
