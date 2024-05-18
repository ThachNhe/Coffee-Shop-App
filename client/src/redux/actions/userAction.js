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
                payload: coffeeList,
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
            dispatch({
                type: actionType.GET_CART_LIST,
                payload: cartList[0],
            });
        } catch (error) {
            console.error('err from get cart list : ', error);
        }
    };
};

export const createLinkPaymentAction = (body) => {
    return async (dispatch) => {
        try {
            console.log('check body payment : ', body);
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
