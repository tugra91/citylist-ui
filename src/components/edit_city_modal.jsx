import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editCity } from "../api/call_api";
import { getData } from "../api/client";
import { citiesChanged } from "../reducers/cities_reducer";
import InformationModal from "./information_modal";


function EditCityModal({ show, onHide, cityId, cityName, photoUrl }) {

    const [newPhotoUrl, setNewPhotoUrl] = useState(photoUrl);
    const [newCityName, setNewCityName] = useState(cityName);
    const [showInfo, setShowInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const dispatch = useDispatch();
    const initCityList = async () => {
        let data = await getData('/api/getAllCities');
        dispatch(citiesChanged(data.cityList));
    }

    const loginProcess = useSelector((state) => state.loginProcess);

    const processChangeCityInfo = async () => {
        const newCity = await editCity(cityId, newCityName, newPhotoUrl, loginProcess.token)
            .catch((error) => {
                onHide();
                setInfoMessage(error.message);
                setShowInfo(true);
            });
        if (newCity !== null && newCity !== undefined) {
            initCityList();
            onHide();
            setInfoMessage("Wow! Saved your changes successfully.");
            setShowInfo(true);
        }
    }

    return (
        <>
            <Modal
                show={show}
                size="md"
                aria-labelledby="edit-city-modal-title-vcenter"
                backdrop="static"
                keyboard={true}
                centered
            >
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id="edit-city-modal-title-vcenter">
                        Edit City Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="editCityPhotoForm">
                            <Form.Label>Photo Url</Form.Label>
                            <Form.Control type="text" defaultValue={photoUrl} onChange={(e) => setNewPhotoUrl(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editCityNameForm">
                            <Form.Label>City Name</Form.Label>
                            <Form.Control type="text" defaultValue={cityName} onChange={(e) => setNewCityName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="danger" >Close</Button>
                    <Button onClick={() => processChangeCityInfo()} variant="primary" >Change</Button>
                </Modal.Footer>
            </Modal>
            <InformationModal message={infoMessage} show={showInfo} hide={() => setShowInfo(false)} ></InformationModal>
        </>
    )
}

export default EditCityModal;