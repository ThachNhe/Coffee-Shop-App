// import the dependency
import remove from 'lodash.remove';
import actionTypes from '../actions/actionType';
// reducer

const initialState = {
    CoffeeList: [],
    CartList: [],
    CartPrice: 0,
    orderDateNow: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_COFFEE_LIST:
            state.CoffeeList = action.payload;
            // console.log('check state.CoffeeList : ', state.CoffeeList);
            return { ...state };
        case actionTypes.GET_CART_LIST:
            state.CartList = action.payload.products;
            state.CartPrice = action.payload.cost;
            return { ...state };
        default:
            return state;
    }
}

export default rootReducer;
