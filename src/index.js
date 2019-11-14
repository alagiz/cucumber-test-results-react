import ReactDOM from 'react-dom';
import SockJS from 'sockjs-client';

import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import Routes from './config/routes';

const wsSourceUrl = `http://${window._env_.BACKEND_URL}/cucumber-websocket`;
const Stomp = require('stompjs');

const routes = new Routes();
const renderRoutes = () => routes.getRoutes().then(routes => {
    ReactDOM.render(
        routes,
        document.getElementById('root')
    );
});
const onMessageReceived = message => {
    console.log(`Got a message from ${window._env_.BACKEND_URL} through a websocket connection! It says ${message}`);

    renderRoutes();
};

renderRoutes();

const socket = new SockJS(wsSourceUrl);
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => stompClient.subscribe("/topic/eventToClient", message => onMessageReceived(message)));



