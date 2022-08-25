import { stringLength } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import contactsDataService from "../services/contact-services";

const AddContact = ({ id, setContactId, contactForm, showForm}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || address === "" || phone === "" || email === "") {
      setMessage({ error: true, msg: "Please put a valid contact!" });
      return;
    } 
    const newContact = {
      name,
      address,
      phone,
      email,
    };
    console.log(newContact);

    try {
      if (id !== undefined && id !== "") {
        await contactsDataService.updateContact(id, newContact);
        setContactId("");
        showForm()
      } else {
        await contactsDataService.addContact(newContact);
        showForm()
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message});
      console.log(message, "Mensaje")
    }

    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
  };


  const editHandler = async () => {
    setMessage("");
    try {
      const contactToEdit = await contactsDataService.getContacts(id);
      console.log("the record is :", contactToEdit.data());
      setName(contactToEdit.data().name);
      setAddress(contactToEdit.data().address);
      setPhone(contactToEdit.data().phone);
      setEmail(contactToEdit.data().email);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  useEffect(() => {
    if(contactForm === false) {
      console.log("false");
      setContactId("")
    }
  }, [showForm] )


  
  return (
    <>
      <div className={contactForm ? "p-4 box" : "notShowing"}>
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <i className="bi bi-x-circle closeForm" onClick={showForm}></i>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formContactName">
            <InputGroup>
              <InputGroup.Text id="formContactName">Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contact Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactPhone">
            <InputGroup>
              <InputGroup.Text id="formContactPhone">Number</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Contact Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactEmail">
            <InputGroup>
              <InputGroup.Text id="formContactEmail">Email</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Contact Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactAdress">
            <InputGroup>
              <InputGroup.Text id="formContactAdress">Address</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contact Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              {id ? "Update Contact" : "Add New Contact"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddContact;