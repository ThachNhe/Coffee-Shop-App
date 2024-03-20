import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

const useStore = create(
    persist(
        (set, get) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            CartPrice: 0,
            FavoritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart: (cartItem) =>
                set(
                    produce((state) => {
                        console.log('item size : ', cartItem);
                        let found = false;
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == cartItem.id) {
                                found = true;
                                let size = false;
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size == cartItem.prices[0].size) {
                                        size = true;
                                        state.CartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                                if (size == false) {
                                    state.CartList[i].prices.push(cartItem.prices[0]);
                                }

                                state.CartList[i].prices.sort((a, b) => {
                                    if (a.size > b.size) return -1;
                                    if (a.size < b.size) return 1;
                                    return 0;
                                });
                                break;
                            }
                        }
                        if (found == false) {
                            state.CartList.push(cartItem);
                        }
                    }),
                ),

            calculateCartPrice: () =>
                set(
                    produce((state) => {
                        let totalprice = 0;
                        for (let i = 0; i < state.CartList.length; i++) {
                            let tempprice = 0;
                            for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                tempprice =
                                    tempprice +
                                    parseFloat(state.CartList[i].prices[j].price) *
                                        state.CartList[i].prices[j].quantity;
                            }
                            state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
                            totalprice = totalprice + tempprice;
                        }
                        state.CartPrice = totalprice.toFixed(2).toString();
                    }),
                ),
            addToFavoritesList: (type, id) =>
                set(
                    produce((state) => {
                        if (type == 'Coffee') {
                            for (let i = 0; i < state.CoffeeList.length; i++) {
                                if (state.CoffeeList[i].id == id) {
                                    if (state.CoffeeList[i].favourite == false) {
                                        state.CoffeeList;
                                        [i].favourite = true;
                                        state.FavoritesList.unshift(state.CoffeeList[i]);
                                    }
                                    break;
                                }
                            }
                        } else if (type == 'Beans') {
                            for (let i = 0; i < state.BeanList.length; i++) {
                                if (state.BeanList[i].id == id) {
                                    if (state.BeanList[i].favourite == false) {
                                        state.BeanList[i].favourite = true;
                                        state.FavoritesList.unshift(state.BeanList[i]);
                                    }
                                    break;
                                }
                            }
                        }
                    }),
                ),
            deleteFromFavouriteList: (type, id) =>
                set(
                    produce((state) => {
                        if (type == 'Coffee') {
                            for (let i = 0; i < state.CoffeeList.length; i++) {
                                if (state.CoffeeList[i].id == id) {
                                    if (state.CoffeeList[i].favourite == true) {
                                        state.CoffeeList;
                                        [i].favourite = false;
                                        state.FavoritesList.unshift(state.CoffeeList[i]);
                                    }
                                    break;
                                }
                            }
                        } else if (type == 'Beans') {
                            for (let i = 0; i < state.BeanList.length; i++) {
                                if (state.BeanList[i].id == id) {
                                    if (state.BeanList[i].favourite == true) {
                                        state.BeanList;
                                        [i].favourite = false;
                                        state.FavoritesList.unshift(state.BeanList[i]);
                                    }
                                    break;
                                }
                            }
                        }
                        let spliceIndex = -1;
                        for (let i = 0; i < state.FavoritesList.length; i++) {
                            if (state.FavoritesList[i].id == id) {
                                spliceIndex = i;
                                break;
                            }
                        }
                        state.FavoritesList.splice(spliceIndex, 1);
                    }),
                ),
            incrementCartItemQuantity: (id, size) =>
                set(
                    produce((state) => {
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == id) {
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size == size) {
                                        state.CartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                            }
                        }
                    }),
                ),
            decrementCartItemQuantity: (id, size) =>
                set(
                    produce((state) => {
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == id) {
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size == size) {
                                        if (state.CartList[i].prices.length > 1) {
                                            if (state.CartList[i].prices[j].quantity > 1) {
                                                state.CartList[i].prices[j].quantity--;
                                            } else {
                                                state.CartList[i].prices.splice(j, 1);
                                            }
                                        } else {
                                            if (state.CartList[i].prices[j].quantity > 1) {
                                                state.CartList[i].prices[j].quantity--;
                                            } else {
                                                state.CartList.splice(i, 1);
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }),
                ),
        }),

        {
            name: 'coffee-app',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export default useStore;
