import React from 'react';
import ReactDOM from 'react-dom';
import Component from './component';

describe('features header rendering', () => {
    describe('reactDOM', () => {
        it('should render without crashing', () => {
            const div = document.createElement('div');
            const props = {
                fileInfo: {
                    lastModified: '2019-05-05',
                    bambooAvailable: true
                }
            };

            ReactDOM.render(<Component {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });
});
