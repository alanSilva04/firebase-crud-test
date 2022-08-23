import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import contactsDataService from "../services/contact-services";


const ContactsList = ({ getContactId, showForm, contactForm }) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const data = await contactsDataService.getAllContacts();
    console.log(data.docs);
    setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async(id) => {
    let confirmAction = window.confirm("Are you sure you want to delete this contact?");
    if (confirmAction){
    await contactsDataService.deleteContact(id);
    alert("Deleted")
    getContacts()
    } else {
      alert("Action Aborted")
    }
  }

  useEffect(() => {
    getContacts()
  }, [contactForm])

  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getContacts}>
          Refresh List
        </Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Relation</th>
            <th> 
              <input type="search" placeholder="Search by name..."/>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
              <td>
              <Button
                variant="secondary"
                className="edit"
                onClick={(e) => getContactId(contact.id)}
              >
                <i className="bi bi-pen" onClick={showForm}></i>
              </Button>
              <Button
                variant="danger"
                className="delete"
                onClick={(e) => deleteHandler(contact.id)}
              >
                <i className="bi bi-person-dash"></i>
              </Button>
            </td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
                <td>{contact.relation}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ContactsList;