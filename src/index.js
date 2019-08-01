import ReactDOM from 'react-dom';
import SockJS from 'sockjs-client';

import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import Routes from './config/routes';

const backendIp = process.env.REACT_APP_BACKEND_IP;
const backendPort = process.env.REACT_APP_BACKEND_PORT;
// const backendIp = 'localhost';
// const backendPort = 8080;
const wsSourceUrl = `http://${backendIp}:${backendPort}/cucumber-websocket`;
const Stomp = require('stompjs');

const routes = new Routes();
const renderRoutes = () => routes.getRoutes().then(routes => {
    ReactDOM.render(
        routes,
        document.getElementById('root')
    );
});
const onMessageReceived = message => {
    console.log(`Got a message from ${backendIp}:${backendPort} through a websocket connection! It says ${message}`);

    renderRoutes();
};

renderRoutes();

const socket = new SockJS(wsSourceUrl);
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => stompClient.subscribe("/topic/eventToClient", message => onMessageReceived(message)));



