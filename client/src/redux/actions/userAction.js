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
