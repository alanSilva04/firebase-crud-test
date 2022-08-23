import React, { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import restaurantDataService from "../services/restaurant-services";


const RestaurantsList = ({ getRestaurantId }) => {
  const [restaurant, setRestaurants] = useState([]);
  useEffect(() => {
    getRestaurants();
  }, []);

const [flag, setFlag] = useState(true);

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

      {/* <pre>{JSON.stringify(restaurants, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Restaurant Adress</th>
            <th>Restaurant Phone Number</th>
            <th>Restaurant Schedule</th>
            <th>Open Now</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurant.map((doc) => {
            return (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.adress}</td>
                <td>{doc.phone}</td>
                <td>{doc.schedule}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getRestaurantId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default RestaurantsList;