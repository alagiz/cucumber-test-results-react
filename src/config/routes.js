import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import moment from "moment";

import Feature from "../screens/feature/component";
import Validator from "../validation/validator";
import ValidationErrors from "../screens/validationErrors/component";
import Features from "../screens/features/component";
import Schema from "../validation/schema";
import axios from "axios";

let exampleData = [];
let lastModified = null;
let deploymentData = null;
let lastChecked = null;
let bambooAvailable = true;
let csharpCoveragePercentage = 'Not available';
let rCoveragePercentage = 'Not available';
let duplicatesNumber = 'Not available';
let issuesNumber = 'Not available';

class Routes extends Component {
    downloadLatestFile() {
        const artifactUrl =`http://${window._env_.BACKEND_URL}/cucumber-report`;
        const dateTimeUrl = `http://${window._env_.BACKEND_URL}/cucumber-report/date-time`;
        const deploymentDataUrl = `http://${window._env_.BACKEND_URL}/deployment-data`;

        lastChecked = moment();

        return axios.get(`${artifactUrl}`)
            .then(response => {
                // handle success
                exampleData = response.data;
                bambooAvailable = true;

                return axios.get(`${dateTimeUrl}`)
            })
            .then(response => {
                lastModified = moment(response.data, 'DD-MM-YYYYTHH:mm:ss')

                return axios.get(deploymentDataUrl);
            })
            .then(response => {
                const {releaseVersion, dateTimeOfDeployment} = response.data;

                deploymentData = {
                    releaseVersion: releaseVersion,
                    dateTimeOfDeployment: moment(dateTimeOfDeployment, 'DD-MM-YYYYTHH:mm:ss')
                }
            })
            .catch(error => console.log(error));
    }

    getRoutes() {
        return this.downloadLatestFile().then(() => {
            const baseUrl = process.env.PUBLIC_URL;
            const validationFunction = Validator.getValidationFunction(Schema);
            const isIncomingDataValid = validationFunction(exampleData);
            const errorRoute = <ValidationErrors errors={validationFunction.errors}/>;
            const relevantData = {
                data: exampleData,
                lastModified: lastModified,
                deploymentData: deploymentData,
                lastChecked: lastChecked,
                bambooAvailable: bambooAvailable,
                csharpCoveragePercentage: csharpCoveragePercentage,
                rCoveragePercentage: rCoveragePercentage,
                staticCodeAnalysisResults: {
                    duplicatesNumber: duplicatesNumber,
                    issuesNumber: issuesNumber
                }
            };
            const featuresRoute = isIncomingDataValid ?
                <Route exact
                       path={`${baseUrl}/`}
                       render={props => (<Features data={relevantData} {...props}/>)}/> :
                errorRoute;
            const featureRoute = isIncomingDataValid ?
                <Route exact
                       path={`${baseUrl}/feature/:id`}
                       render={props => (<Feature data={relevantData} {...props}/>)}/> :
                errorRoute;

            return (
                <Router>
                    <div>
                        <Switch>
                            {featuresRoute}
                            {featureRoute}
                        </Switch>
                    </div>
                </Router>
            );
        });
    }
}

export default Routes;