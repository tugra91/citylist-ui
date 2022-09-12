
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import CityCardList from './components/city_card_list';
import SearchFieldComponent from './components/search_field_component';
import WelcomeComponent from './components/welcome_component';
import useCheckLoginInfo from './hooks/use_check_login_info';
import useLoadCitiesList from './hooks/use_load_cities_list';


function App() {
  useLoadCitiesList();
  useCheckLoginInfo();
  return (
    <Container>
      <Row className="justify-content-md-center" >
        <Container>
          <Row><br></br></Row>
          <Row>
            <WelcomeComponent></WelcomeComponent>
          </Row>
          <Row><Col><br></br></Col></Row>
          <Row>
            <SearchFieldComponent></SearchFieldComponent>
          </Row>
          <Row><Col><br></br></Col></Row>
          <Row>
            <CityCardList></CityCardList>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}


export default App;
