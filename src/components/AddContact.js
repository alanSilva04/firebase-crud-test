import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import contactsDataService from "../services/contact-services";

const AddContact = ({ id, setContactId, contactForm, showForm}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || address === "" || phone === "" || relation === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newContact = {
      name,
      address,
      phone,
      relation,
    };
    console.log(newContact);

    try {
      if (id !== undefined && id !== "") {
        await contactsDataService.updateContact(id, newContact);
        setContactId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await contactsDataService.addContact(newContact);
        setMessage({ error: false, msg: "New Contact added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message});
      console.log(message, "Mensaje")
    }

    setName("");
    setAddress("");
    setPhone("");
    setRelation("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const contactToEdit = await contactsDataService.getContacts(id);
      console.log("the record is :", contactToEdit.data());
      setName(contactToEdit.data().name);
      setAddress(contactToEdit.data().address);
      setPhone(contactToEdit.data().phone);
      setRelation(contactToEdit.data().relation);
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
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactPhone">
            <InputGroup>
              <InputGroup.Text id="formContactPhone">Number</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contact Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactAdress">
            <InputGroup>
              <InputGroup.Text id="formContactAdress">Address</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactRelation">
            <InputGroup>
              <InputGroup.Text id="formContactRelation">Relation</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Relation with the contact"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" onClick={showForm}>
              {id ? "Update Contact" : "Add New Contact"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddContact;