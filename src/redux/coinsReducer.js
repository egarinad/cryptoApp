const defaultCoins = {
    coins: [],
    loading: false,
};

export const LOAD_COINS = "LOAD_COINS";
export const FETCH_COINS = "FETCH_COINS";
export const LOAD_COINS_SUCCESS = "LOAD_COINS_SUCCESS";

export const coinsReducer = (state = defaultCoins, action) => {
    switch (action.type) {
        case LOAD_COINS:
            return {...state, loading: true};
        case LOAD_COINS_SUCCESS:
            return {...state, coins: action.payload.data, loading: false};
        default:
            return state;
    }
};

export const loadCoins = (payload) => ({type: LOAD_COINS});
export const loadCoinsSuccess = (payload) => ({type: LOAD_COINS_SUCCESS, payload});
export const fetchCoins = () => ({type: FETCH_COINS});
