const defaultWallet = {
    wallet: {

    },
};

export const ADD_COIN = "ADD_COIN";
export const DEL_COIN = "DEL_COIN"

export const walletReducer = (state = defaultWallet, action) => {
    const {type, coinId, amount} = action;

    switch (type) {
        case ADD_COIN:
            const newWallet = {...state.wallet};
            if(newWallet[coinId]) newWallet[coinId] = newWallet[coinId] + amount;
            else newWallet[coinId] = amount;
            return {...state, wallet: {...newWallet}};
        case DEL_COIN:
            const delWallet = {...state.wallet};
            delete delWallet[coinId]
            return {...state,  wallet: {...delWallet}}
        default:
            return state;
    }
};
export const addCoin = ({coinId, amount}) => ({
    type: ADD_COIN,
    coinId,
    amount,
});
export const delCoin = ({coinId}) => ({
    type: DEL_COIN,
    coinId,
});
