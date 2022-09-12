import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CityCardItem from "./city_card_item";


function CityCardList() {

    const cityList = useSelector((state) => state.cities);

    const [activeNumber, setActiveNumber] = useState(1);
    const [dataRowList, setDataRowList] = useState([<Row><Col>It wasn't found a data about cities.</Col></Row>]);

    useEffect(() => {
        createCityList();
    }, [activeNumber, cityList])

    const createCityList = () => {
        if (cityList.length > 0) {
            let rowList = [];
            let isDivideExactly = cityList.length % 10 === 0;
            let startData = ((activeNumber - 1) * 10) + 1;
            let endData = isDivideExactly ? activeNumber * 10 : activeNumber * 10 > cityList.length ? cityList.length : activeNumber * 10;
            for (let dataNumber = startData; dataNumber <= endData; dataNumber++) {
                rowList.push(
                    <>
                        <Row>
                            <Col><CityCardItem cityId={cityList[dataNumber - 1].cityId} cityName={cityList[dataNumber - 1].cityName} cityNumber={cityList[dataNumber - 1].cityNumber} photoUrl={cityList[dataNumber - 1].photoUrl}></CityCardItem></Col>
                        </Row>
                        <Row><Col><br></br></Col></Row>
                    </>
                )
            }
            setDataRowList(rowList);
        } else {
            setDataRowList([<Row><Col>It wasn't found a data about cities.</Col></Row>])
        }
    }



    let pageItemList = [];

    if (cityList.length > 0) {
        let pageSize = cityList.length % 10 === 0 ? cityList.length / 10 : (cityList.length / 10) + 1;
        if (pageSize !== 1) {
            for (let pageNumber = 1; pageNumber <= pageSize; pageNumber++) {
                pageItemList.push(<Pagination.Item key={pageNumber} active={activeNumber === pageNumber} onClick={() => setActiveNumber(pageNumber)} >{pageNumber}</Pagination.Item>)
            }
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Pagination>
                            {pageItemList}
                        </Pagination>
                    </Col>
                </Row>
                {dataRowList}

            </Container>
        </>
    )

}

export default CityCardList;