import axios from 'axios';
import { CreateUser, User } from './UserModel';

axios.defaults.baseURL = 'https://localhost:7029/api/User/';
export const api = {
    getAll: () => axios.get('all').then(response => response.data),
    get: (id: string) => axios.get(id),
    post: (user: CreateUser) => axios.post('', user),
    put: (user: User) => axios.put('', user),
    delete: (id: string) => axios.delete(id),
    updateEmail: (id: string, email: string) => axios.patch(`${id}/updateEmail`, { email: email }).then(response => response.data),
}