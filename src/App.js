import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Routes, Route } from 'react-router-dom'
import {fetchCoins} from "./redux/coinsReducer";
import "./scss/style.scss"
import Header from "./components/Header";
import Coin from "./components/Coin";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";

const App = () => {
    const dispatch = useDispatch();
    const coins = useSelector((state) => state.coinsRed.coins);
    const wallet = useSelector((state) => state.walletRed.wallet);
    const loading = useSelector((state) => state.coinsRed.loading);

    console.log(wallet)

    useEffect(() => {
        dispatch(fetchCoins());
    }, []);
    if(!loading)
        console.log(coins);

    return (
        <div className="wrapper">
            <Header/>
            <Routes>
                <Route path='/' element={loading ? <Loader/> : <Pagination coins={coins}/>}/>
                <Route  path='/coin' element={<Coin />}>
                    <Route  path=':coinId' element={<Coin />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
