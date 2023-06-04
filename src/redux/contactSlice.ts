import { createSlice } from '@reduxjs/toolkit'

export interface ContactState {
    contacts: ContactState["newForm"][],
    newForm: {
        firstName: string
        lastName: string
        status: string
        [key: string]: any
    }
}

const defaultFormValue = {
    firstName: "",
    lastName: "",
    status: "active",
};
const initialState: ContactState = {
    contacts: [],
    newForm: defaultFormValue,
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addAContact(state) {
            state.contacts = [...state?.contacts, { id: state.contacts.length + 1, ...state.newForm }]
            state.newForm = defaultFormValue
            return state;
        },
        onUpdateContact(state) {
            state.contacts = state.contacts.filter(contact => contact?.id !== state.newForm?.id)
            state.contacts.push(state?.newForm)
            return state
        },
        deleteContact(state, action) {
            state.contacts = state.contacts.filter(contact => contact?.id !== action.payload)
            return state
        },
        onFormUpdate(state, action) {
            state.newForm[action.payload.type] = action?.payload.value
            return state
        },
        onFormEditModalOpen(state, action) {
            const contact = state?.contacts?.find(c => c?.id === action.payload)
            state.newForm = contact || defaultFormValue
            return state
        },
        resetForm(state) {
            state.newForm = defaultFormValue
            return state
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    addAContact, onUpdateContact, deleteContact,
    onFormUpdate, onFormEditModalOpen, resetForm
} = contactSlice.actions

export default contactSlice.reducer