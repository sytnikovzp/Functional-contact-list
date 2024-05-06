import ACTION_TYPES from './actionTypes';

// Creating
export const createContactAction = (contact) => {
  return {
    type: ACTION_TYPES.POST_CONTACT_ACTION,
    payload: contact,
  };
};

export const createContactRequest = () => {
  return {
    type: ACTION_TYPES.POST_CONTACT_REQUEST,
  };
};

export const createContactSuccess = (contact) => {
  return {
    type: ACTION_TYPES.POST_CONTACT_SUCCESS,
    payload: contact,
  };
};

export const createContactError = (error) => {
  return {
    type: ACTION_TYPES.POST_CONTACT_ERROR,
    payload: error,
  };
};

// Updating
export const updateContactAction = (contact) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_ACTION,
    payload: contact,
  };
};

export const updateContactRequest = () => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_REQUEST,
  };
};

export const updateContactSuccess = (contact) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_SUCCESS,
    payload: contact,
  };
};

export const updateContactError = (error) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_ERROR,
    payload: error,
  };
};

// Deleting
export const deleteContactAction = (id) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_ACTION,
    payload: id,
  };
};

export const deleteContactRequest = () => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_REQUEST,
  };
};

export const deleteContactSuccess = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_SUCCESS,
    payload,
  };
};

export const deleteContactError = (error) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_ERROR,
    payload: error,
  };
};

// Getting
export const getContactsAction = () => {
  return {
    type: ACTION_TYPES.GET_CONTACTS_ACTION,
  };
};

export const getContactsRequest = () => {
  return {
    type: ACTION_TYPES.GET_CONTACTS_REQUEST,
  };
};

export const getContactsSuccess = (contacts) => {
  return {
    type: ACTION_TYPES.GET_CONTACTS_SUCCESS,
    payload: contacts,
  };
};

export const getContactsError = (error) => {
  return {
    type: ACTION_TYPES.GET_CONTACTS_ERROR,
    payload: error,
  };
};

// Other
export const selectContact = (contact) => {
  return {
    type: ACTION_TYPES.SELECT_CONTACT,
    payload: contact,
  };
};

export const addNewContact = () => {
  return {
    type: ACTION_TYPES.ADD_NEW_CONTACT,
  };
};
