import axios from 'axios'

export async function login(userInfo: any) {
    let res = await axios.post(`/todolist/login`, userInfo) 
    // console.log(res)
    return res.data.token
}

export async function signUp(userInfo: any) {
    let res = await axios.post(`/todolist/signUp`, userInfo) 
    // console.log(res)
    return res.data.token
}
