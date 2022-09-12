import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, signIn } from "../api/call_api";
import { loginOK, logout } from "../reducers/login_reducer";
import InformationModal from "./information_modal";
import LoginModal from "./login_modal";
import SignUpModal from "./sign_up_modal";

function WelcomeComponent() {

    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    const [infoMessage, setInfoMessage] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const dispatch = useDispatch();

    const loginProcess = useSelector((state) => state.loginProcess);

    useEffect(() => {
        if (loginProcess.loginStatus) {
            setIsLogin(true);

        }
    }, [loginProcess.loginStatus]);

    const processSignUp = async (username, password, name) => {
        const registerResponse = await registerUser(username, password, name);
        if (registerResponse !== null) {
            setShowSignUp(false);
            setShowInfo(true);
            setInfoMessage("Successfully your account was created.");
        } else {
            setShowSignUp(false);
            setShowInfo(true);
            setInfoMessage("Unfortunately your account isn't registered due to we have been facing some issues. Please try again later.");
        }
    }

    const processSignIn = async (username, password) => {
        const accessToken = await signIn(username, password);
        if (accessToken != null) {
            dispatch(loginOK({ token: accessToken, name: username }))
            localStorage.setItem('login_info', JSON.stringify({ token: accessToken, name: username }));
            setShowLogin(false);
            setShowInfo(true);
            setInfoMessage("Successfully you was logged in to system.");
        } else {
            dispatch(logout())
            localStorage.removeItem('login_info');
            setShowLogin(false);
            setShowInfo(true);
            setInfoMessage("Unfortunately you isn't logged in to system due to we have been facing some issues. Please try again later.");
        }
    }

    const logoutFunction = () => {
        localStorage.removeItem('login_info');
        dispatch(logout({ token: null, name: null }));
        setShowInfo(true);
        setInfoMessage("You was logged out from system. Come Again");
    }

    if (!loginProcess.loginStatus) {
        return (
            <>
                <InformationModal message={infoMessage} show={showInfo} hide={() => setShowInfo(false)} ></InformationModal>
                <Container>
                    <Row>
                        <Col><Button variant="primary" onClick={() => setShowSignUp(true)} > Sign Up </Button></Col>
                        <Col><Button variant="primary" onClick={() => setShowLogin(true)} > Login </Button></Col>
                        <Col></Col>
                    </Row>
                </Container>

                <SignUpModal
                    show={showSignUp}
                    onHide={() => setShowSignUp(false)}
                    signUp={(username, password, name) => processSignUp(username, password, name)}
                >
                </SignUpModal>
                <LoginModal
                    show={showLogin}
                    onHide={() => setShowLogin(false)}
                    login={(username, password) => processSignIn(username, password)}
                >
                </LoginModal>
            </>
        )
    } else {
        return (
            <>
                <InformationModal message={infoMessage} show={showInfo} hide={() => setShowInfo(false)} ></InformationModal>
                <Container>
                    <Row>
                        <Col>Welcome on board. Mr/Mrs {loginProcess.name}</Col>
                        <Col><Button variant="primary" onClick={() => logoutFunction()} > Logout </Button></Col>
                    </Row>
                </Container>
            </>)
    }
}

export default WelcomeComponent;