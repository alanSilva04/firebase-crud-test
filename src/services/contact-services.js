import { db } from "../firebase-config";

import {collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";


const contactsCollectionRef = collection(db, "contacts")
class contactsDataService {
    addContact = (newContact) => {
        return addDoc(contactsCollectionRef, newContact)
    }

    updateContact = (id, updateContact) => {
        const contactDoc = doc(db, "contacts", id);
        return updateDoc(contactDoc, updateContact);
    };

    deleteContact = (id) => {
        const contactDoc = doc(db, "contacts", id);
        return deleteDoc(contactDoc);
    };

    getAllContacts = () => {
        return getDocs(contactsCollectionRef);
    };

    getContacts = (id) => {
        const contactDoc = doc(db, "contacts", id);
        return getDoc(contactDoc);
    };
}

export default new contactsDataService();