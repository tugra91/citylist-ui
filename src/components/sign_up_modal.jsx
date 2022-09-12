import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { registerUser } from "../api/call_api";
import InformationModal from "./information_modal";

function SignUpModal(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="md"
                aria-labelledby="signUp-modal-title-vcenter"
                backdrop="static"
                keyboard={true}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="signUp-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="signUpUsernameForm">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signUpPasswordForm">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signUpNameForm">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant="danger" >Close</Button>
                    <Button onClick={() => props.signUp(username, password, name)} variant="success">Register</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SignUpModal;