import './styles.css';

export default function NoContactsFound() {
    return <section className="no-contact-container centered-tyo">
        <i className="bi bi-x-circle no-contact-icon"></i>
        <p className="no-contact-text">No contacts found. Please add contact from Create Contact button</p>
    </section>
}