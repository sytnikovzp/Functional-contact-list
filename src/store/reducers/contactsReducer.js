import { contactsState } from '../../model/initialStates';
import { currentContactState } from '../../model/initialStates';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  arrContacts: contactsState,
  currentContact: currentContactState,
};

export default function contactsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION_TYPES.GET_CONTACTS:
      return {
        ...state,
        arrContacts: payload,
      };
    
      case ACTION_TYPES.CREATE_EMPTY_CONTACT:
      return {
        ...state,
        arrContacts: [...state.arrContacts, payload],
      };

    
    case ACTION_TYPES.ADD_MOVIE:
      return {
        ...state,
        arrContacts: [...state.arrContacts, payload],
      };

    case ACTION_TYPES.DELETE_MOVIE:
      return {
        ...state,
        arrContacts: [...state.arrContacts.filter((movie) => movie.id !== payload)],
      };

    case ACTION_TYPES.TOGGLE_MOVIE:
      return {
        ...state,
        arrContacts: [
          ...state.arrContacts.map((movie) =>
            movie.id === payload ? { ...movie, isDone: !movie.isDone } : movie
          ),
        ],
      };
    
    default:
      return state;
  }
}
