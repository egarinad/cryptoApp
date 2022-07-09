import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_COINS, loadCoins, loadCoinsSuccess } from '../redux/coinsReducer';

const url = 'https://api.coincap.io/v2/assets';

const fetchCoinsFromApi = () => fetch(url);

function* fetchCoinsWorker() {
    yield put(loadCoins());
    const coins = yield call(fetchCoinsFromApi);
    const json = yield call(() => new Promise((res) => res(coins.json())));
    yield put(loadCoinsSuccess(json));
}

export function* coinsWatcher() {
    yield takeEvery(FETCH_COINS, fetchCoinsWorker);
}
