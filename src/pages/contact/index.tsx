import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, Col, Form, Row } from 'react-bootstrap'
import { addAContact, deleteContact, onFormEditModalOpen, onFormUpdate, onUpdateContact, resetForm } from "../../redux/contactSlice"
import NoContactsFound from "../../components/no-contacts"
import TayoModal from "../../components/modal"
import TayoCard from '../../components/card'
import TyoToast from '../../components/toast'
import { RootState } from '../../redux/store'
import { setShowToast } from '../../redux/toastSlice'
import "./styles.css"


export default function Contacts() {
    const contacts = useSelector((state: RootState) => state?.contactData?.contacts)
    const toastState = useSelector((state: RootState) => state?.toast?.showToast)
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => {
        // Also dispatch resetForm
        setIsOpen(false)
    };

    return <div className="contacts-container">
        <Button className="btn btn-primary add-contact-btn"
            onClick={() => setIsOpen(!isOpen)}
        >Add New Contact</Button>

        <div className="cards-container">
            {contacts?.length ? contacts.map(contact => (<TayoCard
                key={`${contact?.firstName}-${contact?.firstName}`}
                contact={contact}
                cardActions={<CardActions contactId={contact?.id} setIsOpen={setIsOpen} />}
            />)) : <NoContactsFound />}
        </div>
        <TayoModal
            modalTitle={"Create a new contact"}
            modalBody={<ModalBody />}
            modalFooter={<ModalFooter onClose={onClose} setIsOpen={setIsOpen} />}
            isOpen={isOpen}
            onClose={onClose}

        />
        <TyoToast
            toastBody={toastState?.body}
            toastTitle={toastState?.type}
            toastVariant={toastState?.type}
        />
    </div>
}

const ModalBody = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.contactData?.newForm)

    return <Form>
        <Row style={{ margin: "1rem 0" }}>
            <Col sm={4}><Form.Label>First Name: </Form.Label></Col>
            <Col><Form.Control
                type="text"
                id="firstNameInput"
                aria-describedby="firstNameHelpBlock"
                value={formData?.firstName}
                onChange={e => dispatch(onFormUpdate({ type: "firstName", value: e?.target?.value }))}
            /></Col>
        </Row>
        <Row style={{ margin: "1rem 0" }}>
            <Col sm={4}><Form.Label>Last Name: </Form.Label></Col>
            <Col><Form.Control
                type="text"
                id="lastNameInput"
                aria-describedby="lastNameHelpBlock"
                value={formData?.lastName}
                onChange={e => dispatch(onFormUpdate({ type: "lastName", value: e?.target?.value }))}
            /></Col>
        </Row>
        <Row style={{ margin: "1rem 0" }}>
            <Col sm={4}><Form.Label>Status: </Form.Label></Col>
            <Col>
                {["active", "inactive"].map(type => <Form.Check
                    key={type}
                    className="contact-status-radio"
                    name="contact-status-radio"
                    type={'radio'}
                    label={type}
                    id={`contact-${type}`}
                    checked={formData?.status === type}
                    onChange={e => dispatch(onFormUpdate({ type: "status", value: e?.target?.value }))}
                />)}
            </Col>
        </Row>
    </Form>
}

const ModalFooter = (props: any) => {

    const formData = useSelector((state: RootState) => state?.contactData?.newForm)
    const dispatch = useDispatch()
    const onSave = () => {
        formData.id ? dispatch(onUpdateContact()) : dispatch(addAContact())
        dispatch(setShowToast({
            status: true,
            type: "success",
            body: formData?.id ? "Updated Contact." : "Saved new contact to store."
        }))
        props.setIsOpen(false)
    }

    const onCancel = () => {
        props?.onClose()
        dispatch(resetForm())
    }

    return <>
        <Button variant="secondary" onClick={onCancel}>
            Close
        </Button>
        <Button variant="primary" onClick={onSave}>
            {formData.id ? "Update" : "Create"} Contact
        </Button>
    </>
}


function CardActions({ contactId, setIsOpen }: any) {
    const dispatch = useDispatch()
    const onEditContact = () => {
        dispatch(onFormEditModalOpen(contactId))
        setIsOpen(true)
    }

    const onDeleteOnctact = () => {
        dispatch(deleteContact(contactId))
        dispatch(setShowToast({
            status: true,
            type: "success",
            body: `Deleted contact with id ${contactId} from store.`
        }))
    }

    return <div className="tayo-btn-grp">
        <Button variant="primary" onClick={onEditContact}>Edit</Button>
        <Button variant="danger" onClick={onDeleteOnctact}>Delete</Button>
    </div>
}
