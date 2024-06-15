// import the dependency
import remove from 'lodash.remove';
import actionTypes from '../actions/actionType';
import { isCancel } from 'axios';
// reducer

const initialState = {
    CoffeeList: [],
    BeanList: [],
    CartList: [],
    ProvincesList: [],
    DistrictList: [],
    WardList: [],
    CartPrice: 0,
    orderDateNow: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
    PaymentInfo: '',
    FavourList: [],
    isItemFavour: false,
    userInfo: '',
    formAddress: '',
    AddressList: [],
    ReviewListByProduct: [],
    AllPaymentList: [],
    AdminAllPayment: [],
    isCancelOrder: false,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_COFFEE_LIST:
            state.CoffeeList = action.payload;
            return { ...state };
        case actionTypes.GET_BEAN_LIST:
            state.BeanList = action.payload;
            return { ...state };
        case actionTypes.GET_CART_LIST:
            state.CartList = action.payload.products;
            state.CartPrice = action.payload.cost;

            return { ...state };
        case actionTypes.CREATE_LINK_PAYMENT:
            state.PaymentInfo = action.payload;
            return { ...state };
        case actionTypes.CLEAR_PAYMENT_INFO:
            state.PaymentInfo = action.payload;
            return { ...state };
        case actionTypes.GET_FAVOURITE_LIST:
            state.FavourList = action.payload;
            return { ...state };
        case actionTypes.IS_ITEM_FAVOUR:
            state.isItemFavour = action.payload;
            return { ...state };
        case actionTypes.USER_LOGIN:
            state.userInfo = action.payload;
            return { ...state, isLogin: true };
        case actionTypes.USER_LOGOUT:
            state.userInfo = action.payload;
            return { ...state, isLogin: false };
        /// conduct fill out address form
        case actionTypes.GET_PROVINCE_LIST:
            state.ProvincesList = action.payload.data;
            return { ...state };
        case actionTypes.GET_DISTRICT_LIST:
            state.DistrictList = action.payload.data;
            return { ...state };
        case actionTypes.GET_WARD_LIST:
            state.WardList = action.payload.data;
            return { ...state };
        case actionTypes.CLEAR_ADDRESS:
            state.DistrictList = action.payload;
            state.WardList = action.payload;
            return { ...state };
        case actionTypes.PUSH_ADDRESS:
            state.formAddress = action.payload;
            return { ...state };
        // ====================================
        case actionTypes.GET_ADDRESS_LIST:
            state.AddressList = action.payload;
            return { ...state };
        case actionTypes.GET_REVIEW_BY_PRODUCT_ID:
            state.ReviewListByProduct = action.payload;
        case actionTypes.GET_ALL_PAYMENT_BY_USER_ID:
            state.AllPaymentList = action.payload;
            return { ...state };
        case actionTypes.GET_ALL_PAYMENT:
            state.AdminAllPayment = action.payload;
            return { ...state };
        case actionTypes.CANCEL_ORDER:
            state.isCancelOrder = action.payload;
            return { ...state };
        default:
            return state;
    }
}

export default rootReducer;
