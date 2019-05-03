import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { ScopePage } from 'src/pages/scope/ScopePage';
import { RationalePage } from 'src/pages/rationale/RationalePage';
import { WobblyLinePage } from 'src/pages/wobbly-line/WobblyLinePage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<WobblyLinePage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
