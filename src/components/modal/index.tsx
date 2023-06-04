import Modal from 'react-bootstrap/Modal';

export default function TayoModal(props: TayoModalProps) {

    return (
        <>
            <Modal show={props.isOpen} onHide={props.onClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.modalBody}</Modal.Body>
                {props?.modalFooter && (<Modal.Footer>{props.modalFooter || ""}</Modal.Footer>)}
            </Modal>
        </>
    );
}

export interface TayoModalProps {
    modalTitle: string | JSX.Element;
    modalBody?: JSX.Element;
    modalFooter: string | JSX.Element;
    onPrimaryAction?: any;
    isOpen: boolean;
    onClose: any;
}
