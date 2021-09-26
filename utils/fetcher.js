import axios from 'axios';

const baseURL = 'https://magnifier-forum.herokuapp.com/api';

const publicFetch = axios.create({ baseURL });

export { publicFetch, baseURL };