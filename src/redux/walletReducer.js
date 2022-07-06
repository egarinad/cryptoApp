const defaultWallet = {
    wallet: {

    },
};

export const ADD_COIN = "ADD_COIN";
export const DEL_COIN = "DEL_COIN"
export const ADD_COINS_FROM_STORAGE = "ADD_COINS_FROM_STORAGE"

export const walletReducer = (state = defaultWallet, action) => {
    const {type, coinId, amount} = action;

    switch (type) {
        case ADD_COINS_FROM_STORAGE:
            return {...state, wallet: {...action.payload}}
        case ADD_COIN:
            const newWallet = {...state.wallet};
            if(newWallet[coinId]) newWallet[coinId] = newWallet[coinId] + amount;
            else newWallet[coinId] = amount;
            localStorage.setItem("wallet", JSON.stringify(newWallet))
            return {...state, wallet: {...newWallet}};
        case DEL_COIN:
            const delWallet = {...state.wallet};
            delete delWallet[coinId]
            localStorage.setItem("wallet", JSON.stringify(delWallet))
            return {...state,  wallet: {...delWallet}}
        default:
            return state;
    }
};

export const addCoinsFromStorage = (payload) => ({
    type: ADD_COINS_FROM_STORAGE,
    payload
})

export const addCoin = ({coinId, amount}) => ({
    type: ADD_COIN,
    coinId,
    amount,
});
export const delCoin = ({coinId}) => ({
    type: DEL_COIN,
    coinId,
});
