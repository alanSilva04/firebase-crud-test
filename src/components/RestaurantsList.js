import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import restaurantDataService from "../services/restaurant-services";


const RestaurantsList = ({ getRestaurantId, showForm }) => {
  const [restaurant, setRestaurants] = useState([]);
  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const data = await restaurantDataService.getAllRestaurants();
    console.log(data.docs);
    setRestaurants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async(id) => {
    await restaurantDataService.deleteRestaurant(id);
    getRestaurants();
  }

  

  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getRestaurants}>
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
          {restaurant.map((doc) => {
            return (
              <tr key={doc.id}>
              <td>
              <Button
                variant="secondary"
                className="edit"
                onClick={(e) => getRestaurantId(doc.id)}
              >
                <i class="bi bi-pen" onClick={showForm}></i>
              </Button>
              <Button
                variant="danger"
                className="delete"
                onClick={(e) => deleteHandler(doc.id)}
              >
                <i class="bi bi-person-dash"></i>
              </Button>
            </td>
                <td>{doc.name}</td>
                <td>{doc.phone}</td>
                <td>{doc.adress}</td>
                <td>{doc.relation}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default RestaurantsList;