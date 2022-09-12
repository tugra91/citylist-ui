import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchAllCities } from "../api/call_api";
import { getData } from "../api/client";
import { citiesChanged } from "../reducers/cities_reducer";

function SearchFieldComponent() {

    const [searchText, setSearchText] = useState();

    const dispatch = useDispatch();

    const initCityList = async () => {
        let data = await getData('/api/getAllCities');
        dispatch(citiesChanged(data.cityList));
    }

    const resetSearch = () => {
        initCityList();
        setSearchText("");
    }

    const processSearchResult = async () => {
        if (searchText === "") {
            initCityList();
        } else {
            const result = await searchAllCities(searchText)
                .catch((error) => {
                    resetSearch();
                });
            if (result !== null && result !== undefined) {
                dispatch(citiesChanged(result));
            }
        }
    }

    return (
        <>
            <Container >
                <Row>
                    <Col>
                        <InputGroup className="mb3">
                            <Form.Control
                                placeholder="Please type anything city of you want."
                                aria-label="Please type anything city of you want."
                                onChange={(e) => setSearchText(e.target.value)}
                            >
                            </Form.Control>
                            <Button variant="primary" onClick={() => processSearchResult()}>Search</Button>
                            <Button variant="outline-primary" onClick={() => resetSearch()}>Reset</Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SearchFieldComponent;