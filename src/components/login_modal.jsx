import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { checkStringIsEmtpty } from "../util/request_util";

function LoginModal(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (!checkStringIsEmtpty(username) && !checkStringIsEmtpty(password)) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [username, password]);

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="login-modal-title-vcenter"
            backdrop="static"
            keyboard={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="login-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="loginUsernameForm">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="loginPasswordForm">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="danger" >Close</Button>
                <Button onClick={() => props.login(username, password)} variant="primary" disabled={submitDisabled} >Login</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;