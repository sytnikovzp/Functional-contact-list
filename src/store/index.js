import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from './reducers/contactsReducer';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger))
);
