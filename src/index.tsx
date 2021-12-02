import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

ReactDOM.render(
  <Router>
    <App />
  </Router>, document.querySelector('#root'));

reportWebVitals(console.log);
