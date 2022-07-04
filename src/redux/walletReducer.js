const defaultWallet = {
    wallet: {
        bitcoin: 2,
        bnb: 3,
    }
};

export const ADD_COIN = "LOAD_COINS_SUCCESS";

export const walletReducer = (state = defaultWallet, action) => {
    switch (action.type) {
        case ADD_COIN:
            const newWallet = {...state}
            newWallet[action.coinId] = action.price
            return newWallet;
        default:
            return state;
    }
};
export const addCoin = (payload) => ({type: ADD_COIN, payload});
