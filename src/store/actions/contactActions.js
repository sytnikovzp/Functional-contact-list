import ACTION_TYPES from './actionTypes';

export const getContacts = (contacts) => {
  return {
    type: ACTION_TYPES.GET_CONTACTS,
    payload: contacts,
  };
};

export const createContact = (contact) => {
  return {
    type: ACTION_TYPES.CREATE_CONTACT,
    payload: contact,
  };
};

export const updateContact = (contact) => {
  return {
    type: ACTION_TYPES.UPDATE_CONTACT,
    payload: contact,
  };
};

export const deleteContact = (id) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT,
    payload: id,
  };
};
