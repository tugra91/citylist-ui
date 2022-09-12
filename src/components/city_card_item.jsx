import { useState } from "react";
import { Button, Card, Col, Container, Figure, Row } from "react-bootstrap";
import EditCityModal from "./edit_city_modal";

function CityCardItem({ cityName, cityNumber, photoUrl, cityId }) {

    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <Card>
                <Card.Body>
                    <Figure>
                        <Figure.Image width={500} height={500} alt="500x500" src={photoUrl}></Figure.Image>
                        <Figure.Caption>
                            <Container>
                                <Row>
                                    <Col sm={8}>{cityNumber} - {cityName}</Col>
                                    <Col sm={4} ><Button variant="outline-primary" onClick={() => setShowEditModal(true)}  >Edit City</Button></Col>
                                </Row>
                            </Container>
                        </Figure.Caption>
                    </Figure>
                </Card.Body>
            </Card>
            <EditCityModal show={showEditModal}
                onHide={() => setShowEditModal(false)}
                cityId={cityId}
                cityName={cityName}
                photoUrl={photoUrl}
            ></EditCityModal>
        </>
    )
}

export default CityCardItem;