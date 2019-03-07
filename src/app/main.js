import '../util/object-assign.js';
import 'promise-polyfill/src/polyfill';
import { h, render } from 'preact';
import Application from './components/Application.jsx';

render(<Application />, document.getElementById('root'));
