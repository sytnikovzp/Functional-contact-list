import { contactsState } from '../../model/initialStates';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  arrContacts: contactsState,
  currentContact: createEmptyContact(),
  isPending: false,
  error: null,
};

export default function contactsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    // Success
    case ACTION_TYPES.POST_CONTACT_SUCCESS:
      return {
        ...state,
        arrContacts: [...state.arrContacts, payload],
        currentContact: createEmptyContact(),
        isPending: false,
      };

    case ACTION_TYPES.PUT_CONTACT_SUCCESS:
      return {
        ...state,
        arrContacts: [
          ...state.arrContacts.map((contact) =>
            contact.id !== payload.id ? contact : payload
          ),
        ],
        isPending: false,
      };

    case ACTION_TYPES.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        arrContacts: [
          ...state.arrContacts.filter((contact) => contact.id !== payload),
        ],
        currentContact: createEmptyContact(),
        isPending: false,
      };

    case ACTION_TYPES.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        arrContacts: payload,
        isPending: false,
      };

    // Requesting
    case ACTION_TYPES.POST_CONTACT_REQUEST:
    case ACTION_TYPES.PUT_CONTACT_REQUEST:
    case ACTION_TYPES.DELETE_CONTACT_REQUEST:
    case ACTION_TYPES.GET_CONTACTS_REQUEST:
      return {
        ...state,
        isPending: true,
      };

    // Error
    case ACTION_TYPES.POST_CONTACT_ERROR:
    case ACTION_TYPES.PUT_CONTACT_ERROR:
    case ACTION_TYPES.DELETE_CONTACT_ERROR:
    case ACTION_TYPES.GET_CONTACTS_ERROR:
      return {
        ...state,
        isPending: false,
        error: payload,
      };

    // Other
    case ACTION_TYPES.SELECT_CONTACT:
      return {
        ...state,
        currentContact: payload,
      };

    case ACTION_TYPES.ADD_NEW_CONTACT:
      return {
        ...state,
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
