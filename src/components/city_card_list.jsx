import { useEffect, useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
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

    let ellipticNumber = 4;
    if (cityList.length > 0) {
        let pageSize = cityList.length % 10 === 0 ? cityList.length / 10 : (cityList.length / 10) + 1;
        let pageSizeNumber = parseInt(pageSize);
        while (pageItemList.length > 0) {
            pageItemList.pop();
        }
        if (pageSize > 10) {
            pageItemList.push(<Pagination.First onClick={() => setActiveNumber(1)} />)
            pageItemList.push(<Pagination.Prev onClick={() => setActiveNumber(activeNumber - 1 < 1 ? 1 : activeNumber - 1)} />)
            pageItemList.push(<Pagination.Item key={1} active={activeNumber === 1} onClick={() => setActiveNumber(1)} >1</Pagination.Item>)
            if (activeNumber < ellipticNumber) {
                for (let pageNumber = activeNumber; pageNumber <= activeNumber + ellipticNumber; pageNumber++) {
                    if (pageNumber === 1) {
                        continue;
                    }
                    pageItemList.push(<Pagination.Item key={pageNumber} active={activeNumber === pageNumber} onClick={() => setActiveNumber(pageNumber)} >{pageNumber}</Pagination.Item>)
                }
                let ellipticNumberValue = activeNumber + ellipticNumber + 1;
                pageItemList.push(<Pagination.Ellipsis key={ellipticNumberValue} onClick={() => setActiveNumber(ellipticNumberValue)} ></Pagination.Ellipsis>)
            } else if (pageSizeNumber - activeNumber < ellipticNumber) {
                let ellipticNumberValue = activeNumber - ellipticNumber - 1;
                pageItemList.push(<Pagination.Ellipsis key={ellipticNumberValue} onClick={() => setActiveNumber(ellipticNumberValue)} ></Pagination.Ellipsis>)
                for (let pageNumber = activeNumber - ellipticNumber; pageNumber <= pageSizeNumber; pageNumber++) {
                    pageItemList.push(<Pagination.Item key={pageNumber} active={activeNumber === pageNumber} onClick={() => setActiveNumber(pageNumber)} >{pageNumber}</Pagination.Item>)
                }
            } else {
                pageItemList.push(<Pagination.Ellipsis key={activeNumber - ellipticNumber - 1} onClick={() => setActiveNumber(activeNumber - ellipticNumber - 1)}></Pagination.Ellipsis>);
                for (let pageNumber = activeNumber - ellipticNumber; pageNumber <= activeNumber + ellipticNumber; pageNumber++) {
                    pageItemList.push(<Pagination.Item key={pageNumber} active={activeNumber === pageNumber} onClick={() => setActiveNumber(pageNumber)} >{pageNumber}</Pagination.Item>)
                }
                pageItemList.push(<Pagination.Ellipsis key={activeNumber + ellipticNumber + 1} onClick={() => setActiveNumber(activeNumber + ellipticNumber + 1)}></Pagination.Ellipsis>)
            }
            pageItemList.push(<Pagination.Next onClick={() => setActiveNumber(activeNumber + 1 > pageSizeNumber ? pageSizeNumber : activeNumber + 1)}></Pagination.Next>);
            pageItemList.push(<Pagination.Last onClick={() => setActiveNumber(pageSizeNumber)}></Pagination.Last>);
        } else {
            for (let pageNumber = 1; pageNumber <= pageSize; pageNumber++) {
                pageItemList.push(<Pagination.Item key={pageNumber} active={activeNumber === pageNumber} onClick={() => setActiveNumber(pageNumber)} >{pageNumber}</Pagination.Item>)
            }
        }
    }

    return (
        <>
            <div>
                <Pagination>
                    {pageItemList}
                </Pagination>
                {dataRowList}
            </div>
        </>
    )

}

export default CityCardList;