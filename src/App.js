import { useState } from "react";
import { Container, Navbar, Row, Col, Button } from "react-bootstrap";
import AddRestaurant from "./components/AddRestaurant";
import RestaurantsList from "./components/RestaurantsList";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [restaurantId, setRestaurantId] = useState("");
  const [contactForm, showContactForm] = useState(false)

  const getRestaurantIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setRestaurantId(id);
  };

  function showForm() {
    if(contactForm === false) {
      showContactForm(true)
    } else {
      showContactForm(false)
    }
  }
  
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">CRUD/Bootstrap/Firebase - Agenda Project By Alan Silva</Navbar.Brand>
          <Navbar.Brand><Button onClick={showForm}>Add New Contact</Button></Navbar.Brand>
        </Container>
      </Navbar>
      
      
      <Container style={{ width: "400px"}}>
        <Row>
          <Col>
            <AddRestaurant 
              id={restaurantId} 
              setRestaurantId={setRestaurantId} 
              contactForm={contactForm} 
              showForm={showForm}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <RestaurantsList 
              getRestaurantId={getRestaurantIdHandler} 
              showForm={showForm}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;
