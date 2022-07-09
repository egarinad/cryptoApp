const defaultWallet = {
    wallet: {}
};

export const ADD_COIN = 'ADD_COIN';
export const DEL_COIN = 'DEL_COIN';
export const ADD_COINS_FROM_STORAGE = 'ADD_COINS_FROM_STORAGE';

export const walletReducer = (state = defaultWallet, action) => {
    console.log(action);
    const { type, coinId, coinPrice, amount } = action;

    switch (type) {
        case ADD_COINS_FROM_STORAGE:
            return { ...state, wallet: { ...action.payload } };
        case ADD_COIN: {
            const newWallet = { ...state.wallet };
            const obj = {};
            obj[coinPrice] = amount;
            if (newWallet[coinId]) {
                if (coinPrice in newWallet[coinId])
                    newWallet[coinId][coinPrice] = newWallet[coinId][coinPrice] + amount;
                else newWallet[coinId] = { ...newWallet[coinId], ...obj };
            } else newWallet[coinId] = obj;
            localStorage.setItem('wallet', JSON.stringify(newWallet));
            return { ...state, wallet: { ...newWallet } };
        }
        case DEL_COIN: {
            const delWallet = { ...state.wallet };
            delete delWallet[coinId];
            localStorage.setItem('wallet', JSON.stringify(delWallet));
            return { ...state, wallet: { ...delWallet } };
        }
        default:
            return state;
    }
};

export const addCoinsFromStorage = (payload) => ({
    type: ADD_COINS_FROM_STORAGE,
    payload
});

export const addCoin = ({ coinId, coinPrice, amount }) => ({
    type: ADD_COIN,
    coinId,
    coinPrice,
    amount
});
export const delCoin = ({ coinId }) => ({
    type: DEL_COIN,
    coinId
});
