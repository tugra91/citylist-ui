
import { Button, Modal } from "react-bootstrap";

function InformationModal(props) {
    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default InformationModal;