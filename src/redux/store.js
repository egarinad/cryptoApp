import {applyMiddleware, combineReducers, createStore} from "redux";
import {coinsReducer} from "./coinsReducer";
import {walletReducer} from "./walletReducer";
import createSagaMiddleware from "redux-saga";
//import {rootWatcher} from "../saga/allSagas";
import {coinsWatcher} from "../saga/coinsSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    coinsRed: coinsReducer,
    walletRed: walletReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(coinsWatcher);
