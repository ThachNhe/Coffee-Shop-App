import axios from '../axios';
const getCoffeeList = () => {
    return axios.get('/products/coffee');
};

const CoffeeCardAddToCartService = (body) => {
    return axios.post('/cart/addToCart', body);
};
const getCartListService = () => {
    return axios.get('/cart/myCart');
};
const createLinkPaymentService = (body) => {
    return axios.post('/create-payment-link', body);
};
export { getCoffeeList, CoffeeCardAddToCartService, getCartListService, createLinkPaymentService };
