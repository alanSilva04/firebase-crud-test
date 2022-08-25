import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import contactsDataService from "../services/contact-services";


const ContactsList = ({ getContactId, showForm, contactForm }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("")
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const data = await contactsDataService.getAllContacts();
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

  const searchContact= (e)=>{
    e.preventDefault();
    setContacts(contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(search.toLowerCase())
    ));
  };

  useEffect(() => {
    getContacts()
  }, [contactForm])

  return (
    <div className="listContainer">
      <div className="searchBar">
        <form onChange={searchContact}>
          <input 
            type="search" 
            placeholder="Search for a contact..."
            onChange={(e) => {setSearch(e.target.value)}}
          />
        </form>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address</th>
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
                <td>{contact.email}</td>
                <td>{contact.address}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ContactsList;