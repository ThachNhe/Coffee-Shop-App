// import the dependency
import remove from 'lodash.remove';
import actionTypes from '../actions/actionType';
// reducer

const initialState = {
    CoffeeList: [],
    CartList: [],
    CartPrice: 0,
    orderDateNow: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
    PaymentInfo: '',
    FavourList: [],
    isItemFavour: false,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_COFFEE_LIST:
            state.CoffeeList = action.payload;
            return { ...state };
        case actionTypes.GET_CART_LIST:
            state.CartList = action.payload.products;
            state.CartPrice = action.payload.cost;
            console.log('====================================');
            console.log('redux cartList  :', state.CartList);
            console.log('====================================');
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
        default:
            return state;
    }
}

export default rootReducer;
