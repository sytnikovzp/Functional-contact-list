import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactsState } from '../../model/initialStates';
import { CONTACT_SLICE_NAME } from '../../constants';
import { emptyContact } from '../../constants';
import api from '../../api/contact-service';

const initialState = {
  arrContacts: contactsState,
  currentContact: createEmptyContact(),
  isFetching: false,
  error: null,
};

export const getContacts = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/getContacts`,
  async function (_, { rejectWithValue }) {
    try {
      const responce = await api.get(`/${CONTACT_SLICE_NAME}`);
      if (responce.status >= 400) {
        throw new Error(`Error status is ${responce.status}`);
      }
      const { data } = responce;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/createContact`,
  async (contact, { rejectWithValue }) => {
    try {
      const responce = await api.post(`/${CONTACT_SLICE_NAME}`, contact);
      if (responce.status >= 400) {
        throw new Error(
          `Can't create contact. Error status is ${responce.status}`
        );
      }
      const { data } = responce;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/updateContact`,
  async (contact, { rejectWithValue }) => {
    try {
      const responce = await api.put(
        `/${CONTACT_SLICE_NAME}/${contact.id}`,
        contact
      );
      if (responce.status >= 400) {
        throw new Error(
          `Can't create contact. Error status is ${responce.status}`
        );
      }
      const { data } = responce;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/deleteContact`,
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const responce = await api.delete(`/${CONTACT_SLICE_NAME}/${id}`);
      if (responce.status >= 400) {
        throw new Error(
          `Can't delete contact. Error status is ${responce.status}`
        );
      }
      dispatch(removeContact(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setFetching = (state) => {
  state.isFetching = true;
  state.error = null;
};

const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};

function createEmptyContact() {
  return emptyContact;
}

const contactSlice = createSlice({
  name: CONTACT_SLICE_NAME,
  initialState,
  reducers: {
    selectContact(state, { payload }) {
      state.currentContact = payload;
    },

    addNewContact(state) {
      state.currentContact = createEmptyContact();
    },

    removeContact(state, { payload }) {
      state.arrContacts = [
        ...state.arrContacts.filter((contact) => contact.id !== payload),
      ];
      state.currentContact = createEmptyContact();
    },
  },

  extraReducers: (builder) => {
    // Get all
    builder.addCase(getContacts.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.error = null;
      state.arrContacts = payload;
      state.currentContact = createEmptyContact();
    });
    builder.addCase(getContacts.pending, setFetching);
    builder.addCase(getContacts.rejected, setError);

    // Create
    builder.addCase(createContact.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.error = null;
      state.arrContacts.push(payload);
      state.currentContact = createEmptyContact();
    });
    builder.addCase(createContact.pending, setFetching);
    builder.addCase(createContact.rejected, setError);

    // Update
    builder.addCase(updateContact.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.error = null;
      state.arrContacts = state.arrContacts.map((contact) =>
        contact.id !== payload.id ? contact : payload
      );
    });
    builder.addCase(updateContact.pending, setFetching);
    builder.addCase(updateContact.rejected, setError);

    // Delete
    builder.addCase(deleteContact.pending, setFetching);
    builder.addCase(deleteContact.rejected, setError);
  },
});

const { actions, reducer } = contactSlice;

export const { selectContact, addNewContact, removeContact } = actions;

export default reducer;
