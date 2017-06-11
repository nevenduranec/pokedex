import axios from 'axios';

export const API = axios.create({
    baseURL: `http://pokeapi.co/api/v2/`
})
