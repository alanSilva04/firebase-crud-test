import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import restaurantDataService from "../services/restaurant-services";

const AddRestaurant = ({ id, setRestaurantId, contactForm}) => {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || adress === "" || phone === "" || relation === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newRestaurant = {
      name,
      adress,
      phone,
      relation,
    };
    console.log(newRestaurant);

    try {
      if (id !== undefined && id !== "") {
        await restaurantDataService.updateRestaurant(id, newRestaurant);
        setRestaurantId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await restaurantDataService.addRestaurant(newRestaurant);
        setMessage({ error: false, msg: "New Restaurant added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setAdress("");
    setPhone("");
    setRelation("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await restaurantDataService.getRestaurant(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().title);
      setAdress(docSnap.data().adress);
      setPhone(docSnap.data().phone);
      setRelation(docSnap.data().relation);
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

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRestaurantName">
            <InputGroup>
              <InputGroup.Text id="formRestaurantName">Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contact Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRestaurantAdress">
            <InputGroup>
              <InputGroup.Text id="formRestaurantAdress">Number</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contact Phone Number"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRestaurantPhone">
            <InputGroup>
              <InputGroup.Text id="formRestaurantPhone">Address</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Address"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRestaurantSchedule">
            <InputGroup>
              <InputGroup.Text id="formRestaurantSchedule">Relation</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Relation with the contact"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add / Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddRestaurant;