import { useState } from "react";
import { Container, Navbar, Row, Col, Button } from "react-bootstrap";
import AddContact from "./components/AddContact";
import ContactsList from "./components/ContactList";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [contactId, setContactId] = useState("");
  const [contactForm, showContactForm] = useState(false)

  const getContactIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setContactId(id);
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
            <AddContact
              id={contactId} 
              setContactId={setContactId} 
              contactForm={contactForm} 
              showForm={showForm}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <ContactsList 
              getContactId={getContactIdHandler} 
              showForm={showForm}
              contactForm={contactForm}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;
