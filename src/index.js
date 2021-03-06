import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';
import reducer from './reducers'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Square} from "./blocks/Square";

const initialState = {
    board: {
        width: 10,
        height: 20
    },
    activeBlock: new Square(0, 0),
    settledCells: [
        { row: 19, column: 0},
        { row: 19, column: 1},
        { row: 18, column: 0},
        { row: 18, column: 1}
    ]
};

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
