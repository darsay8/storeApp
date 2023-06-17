import axios from 'axios';

const baseURL = 'http://192.168.3.10:8080/api';

const storeApi = axios.create({baseURL});

export default storeApi;
