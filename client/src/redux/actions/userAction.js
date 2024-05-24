// Action Creators
import actionType from './actionType';
import axios from '../../axios';
import * as services from '../../services/index';

export const getCoffeeListAction = () => {
    return async (dispatch) => {
        try {
            const coffeeList = await services.getCoffeeList();

            dispatch({
                type: actionType.GET_COFFEE_LIST,
                payload: coffeeList.coffees,
            });
        } catch (error) {
            console.error('err from get coffee list:', error);
        }
    };
};

export const getCartListAction = () => {
    return async (dispatch) => {
        try {
            const cartList = await services.getCartListService();
            console.log('get cart list action  :', cartList.cart);
            dispatch({
                type: actionType.GET_CART_LIST,
                payload: cartList.cart[0],
            });
        } catch (error) {
            console.error('err from get cart list : ', error);
        }
    };
};

export const createLinkPaymentAction = (body) => {
    return async (dispatch) => {
        try {
            // console.log('check body payment : ', body);
            const res = await services.createLinkPaymentService(body);
            dispatch({
                type: actionType.CREATE_LINK_PAYMENT,
                payload: res,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getFavouriteListAction = () => {
    return async (dispatch) => {
        try {
            const itemFavourite = await services.getFavouriteItemService();

            dispatch({
                type: actionType.GET_FAVOURITE_LIST,
                payload: itemFavourite,
            });
        } catch (error) {
            console.error('err from get favourite list:', error);
        }
    };
};
export const isItemFavourAction = (productId) => {
    return async (dispatch) => {
        try {
            const isItemFour = await services.isItemFavourService(productId);
            console.log('check isItemFour: ', isItemFour);
            dispatch({
                type: actionType.IS_ITEM_FAVOUR,
                payload: isItemFour,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const clearPaymentInfo = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionType.CLEAR_PAYMENT_INFO,
                payload: '',
            });
        } catch (error) {
            console.error(error);
        }
    };
};
