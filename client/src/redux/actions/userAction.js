// Action Creators
import actionType from './actionType';
import * as services from '../../services/index';
import axios from 'axios';
import { TOKEN } from '../../theme/theme';
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
export const getBeanListAction = () => {
    return async (dispatch) => {
        try {
            const beanList = await services.getBeanList();
            dispatch({
                type: actionType.GET_BEAN_LIST,
                payload: beanList.beans,
            });
        } catch (error) {
            console.error(error);
        }
    };
};
export const getCartListAction = (userId) => {
    return async (dispatch) => {
        try {
            const cartList = await services.getCartListService(userId);
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

export const getFavouriteListAction = (userId) => {
    return async (dispatch) => {
        try {
            console.log('ACTION: ', userId);
            const itemFavourite = await services.getFavouriteItemService(userId);

            dispatch({
                type: actionType.GET_FAVOURITE_LIST,
                payload: itemFavourite,
            });
        } catch (error) {
            console.error('err from get favourite list:', error);
        }
    };
};
export const isItemFavourAction = (userId, productId) => {
    return async (dispatch) => {
        try {
            console.log('check isItemFour userId: ', userId, productId);
            const isItemFour = await services.isItemFavourService(userId, productId);

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

export const userLoginAction = (body) => {
    return async (dispatch) => {
        try {
            let res = await services.userLoginService(body);
            // console.log('check action login : ', res);
            dispatch({
                type: actionType.USER_LOGIN,
                payload: res,
            });
        } catch (error) {
            console.error(error);
        }
    };
};
export const userLogoutAction = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionType.USER_LOGOUT,
                payload: '',
            });
        } catch (error) {
            console.error(error);
        }
    };
};
export const getProvincesAction = () => {
    return async (dispatch) => {
        try {
            let provinces = await axios.get(' https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: { token: TOKEN.token },
            });

            dispatch({
                type: actionType.GET_PROVINCE_LIST,
                payload: provinces.data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getDistrictAction = (province_id) => {
    return async (dispatch) => {
        try {
            let districts = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
                headers: { token: TOKEN.token },
                params: {
                    province_id: province_id,
                },
            });
            dispatch({
                type: actionType.GET_DISTRICT_LIST,
                payload: districts.data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getWardAction = (district_id) => {
    return async (dispatch) => {
        try {
            let wards = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
                headers: { token: TOKEN.token },
                params: {
                    district_id: district_id,
                },
            });
            dispatch({
                type: actionType.GET_WARD_LIST,
                payload: wards.data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const clearAddressAction = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionType.CLEAR_ADDRESS,
                payload: '',
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const pushAddressToFormAction = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionType.PUSH_ADDRESS,
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getAddressListAction = (id) => {
    return async (dispatch) => {
        try {
            let res = await services.getUserAddressByIdServices(id);

            dispatch({
                type: actionType.GET_ADDRESS_LIST,
                payload: res,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getReviewByProductIdAction = (productId) => {
    return async (dispatch) => {
        try {
            console.log('check productId OKOKOOK: ', productId);
            if (productId === undefined) return console.log('productId is undefined');
            let res = await services.getReviewByProductIdService(productId);
            dispatch({
                type: actionType.GET_REVIEW_BY_PRODUCT_ID,
                payload: res,
            });
        } catch (error) {
            console.error(error);
        }
    };
};
