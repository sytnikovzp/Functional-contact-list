import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from './reducers/contactsReducer';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, logger);

export default createStore(reducer, composeWithDevTools(middleware));

sagaMiddleware.run({});
