import axios from '../axios';
const getCoffeeList = () => {
    return axios.get('/products/coffee');
};

const AddCoffeeToCartService = (body) => {
    return axios.post('/cart/addToCart', body);
};
const getCartListService = () => {
    return axios.get('/cart/myCart');
};
const createLinkPaymentService = (body) => {
    return axios.post('/create-payment-link', body);
};
const getFavouriteItemService = () => {
    return axios.get('/users/6613d5018c360f7f06ef7a53/myFavorite');
};
const getStatusPaymentService = (paymentId) => {
    return axios.get(`/payment/${paymentId}`);
};
const addItemToFavourService = (body) => {
    return axios.post('/users/6613d5018c360f7f06ef7a53/addToFavorite', body);
};
const deleteItemToFavourService = (body) => {
    return axios.post('/users/6613d5018c360f7f06ef7a53/deleteFromFavorite', body);
};
const isItemFavourService = (productId) => {
    return axios.get(`/users/6613d5018c360f7f06ef7a53/products/${productId}`);
};
export {
    getCoffeeList,
    AddCoffeeToCartService,
    getCartListService,
    createLinkPaymentService,
    getFavouriteItemService,
    getStatusPaymentService,
    addItemToFavourService,
    deleteItemToFavourService,
    isItemFavourService,
};
