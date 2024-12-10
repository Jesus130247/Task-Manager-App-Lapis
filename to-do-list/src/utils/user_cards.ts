import axios from 'axios'
import { getUserFromLocalStorage } from './auth_services';

export async function createCard(data: any) {
    const user = getUserFromLocalStorage()
    try {
      let res = await axios.post(`/todolist/create/card/${user.id}`, data); 
      return res.data;
    } catch (error) {
      console.error('Error creating card:', error);
      throw error; 
    }
}

export async function getCardsFromDatabase(user_id: Text) {
    try {
        const res = await axios.get(`/todolist/user/cards/${user_id}`); 
        return res.data; 
    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error; 
    }
}


export async function updateCard(data: any) {
    try {
        const res = await axios.put(`/todolist/update/card/`, data) 
        return res.data; 
    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error; 
    }
}


export async function DeleteCard(card_id: number) {
    try {
        const res = await axios.delete(`/todolist/delete/card/`, {
            data: { card_id } 
        });
        return res.data;
    } catch (error) {
        console.error("Error deleting card:", error);
        throw error;
    }
}

export async function nextVal() {
    try {
        const res = await axios.get(`/todolist/card/nextVal`);
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error("Error get value card:", error);
        throw error;
    }
}