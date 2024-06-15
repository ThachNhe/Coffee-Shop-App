import axios from '../axios';
const userLoginService = (body) => {
    return axios.post('/login', body);
};
const getCoffeeList = () => {
    return axios.get('/products/coffee');
};
const AddCoffeeToCartService = (userId, body) => {
    return axios.post(`/carts/${userId}/addToCart`, body);
};
const getCartListService = (userId) => {
    return axios.get(`/carts/${userId}`);
};
const createLinkPaymentService = (body) => {
    return axios.post('/create-payment-link', body);
};
const getFavouriteItemService = (userId) => {
    // console.log('service favour  ID:', userId);
    return axios.get(`/users/${userId}/myFavorite`);
};
const getStatusPaymentService = (paymentId) => {
    return axios.get(`/payment/${paymentId}`);
};
const addItemToFavourService = (userId, body) => {
    return axios.post(`/users/${userId}/addToFavorite`, body);
};
const deleteItemToFavourService = (userId, body) => {
    console.log('delete favour ', userId, body);
    return axios.post(`/users/${userId}/deleteFromFavorite`, body);
};
const isItemFavourService = (userId, productId) => {
    return axios.get(`/users/${userId}/products/${productId}`);
};
const getBeanList = () => {
    return axios.get('/products/bean');
};
const getUserAddressByIdServices = (userId) => {
    return axios.get(`/users/${userId}/addresses`);
};
const updateDefaultAddressService = (userId, addressId) => {
    return axios.put(`/users/${userId}/addresses/${addressId}/default`);
};
const addAddressService = (userId, addressBody) => {
    return axios.post(`/users/${userId}/addresses`, { body: addressBody });
};
const getReviewByProductIdService = (productId) => {
    return axios.get(`/reviews/product/${productId}`);
};
const postReviewService = (productId, userId, body) => {
    return axios.post(`/reviews/${productId}/users/${userId}/create`, { body: body });
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
    userLoginService,
    getBeanList,
    getUserAddressByIdServices,
    updateDefaultAddressService,
    addAddressService,
    getReviewByProductIdService,
    postReviewService,
};
