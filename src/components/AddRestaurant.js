import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import restaurantDataService from "../services/restaurant-services";

const AddRestaurant = ({ id, setRestaurantId }) => {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [schedule, setSchedule] = useState("");
  const [status, setStatus] = useState("Open");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || adress === "" || phone === "" || schedule === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newRestaurant = {
      name,
      adress,
      phone,
      schedule,
      status,
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
    setSchedule("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await restaurantDataService.getRestaurant(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().title);
      setAdress(docSnap.data().adress);
      setPhone(docSnap.data().phone);
      setSchedule(docSnap.data().schedule);
      setStatus(docSnap.data().status);
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
      <div className="p-4 box">
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
              <InputGroup.Text id="formRestaurantName">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Restaurant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRestaurantAdress">
            <InputGroup>
              <InputGroup.Text id="formRestaurantAdress">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Restaurant Adress"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRestaurantPhone">
            <InputGroup>
              <InputGroup.Text id="formRestaurantPhone">C</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Restaurant Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRestaurantSchedule">
            <InputGroup>
              <InputGroup.Text id="formRestaurantSchedule">D</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Restaurant Schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </InputGroup>
          </Form.Group>


          <ButtonGroup aria-label="Basic example" className="mb-3 status-button">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Open");
                setFlag(true);
              }}
            >
              Open
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Closed");
                setFlag(false);
              }}
            >
              Closed
            </Button>
          </ButtonGroup>
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