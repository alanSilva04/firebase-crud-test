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
      <Navbar bg="dark" variant="dark" className={contactForm ? "hide header" : "header"}>
        <Container className="navbar">
          <Navbar.Brand href="#home" className="navbarText">CRUD/Bootstrap/Firebase - Agenda Project By Alan Silva</Navbar.Brand>
          <Navbar.Brand><Button onClick={showForm} className="navbarButton">Add New Contact</Button></Navbar.Brand>
        </Container>
      </Navbar>

      <div className="contactForm">
            <AddContact
              id={contactId} 
              setContactId={setContactId} 
              contactForm={contactForm} 
              showForm={showForm}
            />
      </div>

      <div className={contactForm ? "hide contactList" : "contactList"} >
            <ContactsList 
              getContactId={getContactIdHandler} 
              showForm={showForm}
              contactForm={contactForm}
            />
      </div>
      
    </>
  )
}

export default App;
