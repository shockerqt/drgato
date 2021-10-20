import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './app';
import './styles/index.scss';

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

ReactDOM.render(
  <Router>
    <App />
  </Router>, container);
