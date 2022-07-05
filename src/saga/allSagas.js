//import {all} from "redux-saga/effects"
import {coinsWatcher} from "./coinsSaga";

export function* rootWatcher() {
    yield coinsWatcher();
}
