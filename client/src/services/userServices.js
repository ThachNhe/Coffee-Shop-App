import axios from '../axios';
const getCoffeeList = () => {
    return axios.get('/products/coffee');
};
export { getCoffeeList };
