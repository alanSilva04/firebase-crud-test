import { db } from "../firebase-config";

import {collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";


const restaurantCollectionRef = collection(db, "restaurants")
class restaurantDataService {
    addRestaurant = (newRestaurant) => {
        return addDoc(restaurantCollectionRef, newRestaurant)
    }

    updateRestaurant = (id, updateRestaurant) => {
        const restaurantDoc = doc(db, "restaurants", id);
        return updateDoc(restaurantDoc, updateRestaurant);
    };

    deleteRestaurant = (id) => {
        const restaurantDoc = doc(db, "restaurants", id);
        return deleteDoc(restaurantDoc);
    };

    getAllRestaurants = () => {
        return getDocs(restaurantCollectionRef);
    };

    getRestaurant = (id) => {
        const restaurantDoc = doc(db, "restaurants", id);
        return getDoc(restaurantDoc);
    };
}

export default new restaurantDataService();