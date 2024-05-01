import { contactsState } from '../../model/initialStates';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  arrContacts: contactsState,
  currentContact: createEmptyContact(),
};

export default function contactsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ACTION_TYPES.GET_CONTACTS:
      return {
        ...state,
        arrContacts: payload,
      };

    case ACTION_TYPES.SELECT_CONTACT:
      return {
        ...state,
        currentContact: [...state.currentContact, payload],
      };

    case ACTION_TYPES.ADD_NEW_CONTACT:
      return {
        ...state,
        currentContact: createEmptyContact(),
      };

    case ACTION_TYPES.CREATE_CONTACT:
      return {
        ...state,
        arrContacts: [...state.arrContacts, payload],
        currentContact: createEmptyContact(),
      };

    case ACTION_TYPES.UPDATE_CONTACT:
      return {
        ...state,
        arrContacts: [
          ...state.arrContacts.map((contact) =>
            contact.id !== payload.id ? contact : payload
          ),
        ],
        currentContact: createEmptyContact(),
      };

    case ACTION_TYPES.SAVE_CONTACT:
      if (!payload.id) {
        return {
          ...state,
          arrContacts: [...state.arrContacts, payload],
          currentContact: createEmptyContact(),
        };
      } else {
        return {
          ...state,
          arrContacts: [
            ...state.arrContacts.map((contact) =>
              contact.id !== payload.id ? contact : payload
            ),
          ],
          currentContact: createEmptyContact(),
        };
      }

    case ACTION_TYPES.DELETE_CONTACT:
      return {
        ...state,
        arrContacts: [
          ...state.arrContacts.filter((contact) => contact.id !== payload),
        ],
        currentContact: createEmptyContact(),
      };

    default:
      return state;
  }
}

function createEmptyContact() {
  return {
    id: null,
    fName: '',
    lName: '',
    eMail: '',
    cPhone: '',
  };
}
