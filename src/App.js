import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import {fetchCoins} from "./redux/coinsReducer";
import "./scss/style.scss";
import Header from "./components/Header/Header";
import Coin from "./components/CoinsList/Coin/Coin";
import Loader from "./components/Loader/Loader";
import Pagination from "./components/Pagination/Pagination";
import {addCoinsFromStorage} from "./redux/walletReducer";
import {ToastContainer} from "react-toastify";

const App = () => {
    const dispatch = useDispatch();
    const coins = useSelector((state) => state.coinsRed.coins);
    const loading = useSelector((state) => state.coinsRed.loading);

    useEffect(() => {
        dispatch(fetchCoins());
    }, []);

    useEffect(()=>{
        const savedWallet = localStorage.getItem("wallet")
        setTimeout(()=>{
            if(savedWallet)
                dispatch(addCoinsFromStorage(JSON.parse(savedWallet)))
        },500)
    }, []);

    return (
        <div className="wrapper">
            <Header/>
            <Routes>
                <Route
                    path="/"
                    element={loading ? <Loader/> : <Pagination coins={coins}/>}
                />
                <Route path="/coin" element={<Coin/>}>
                    <Route path=":coinId" element={<Coin/>}/>
                </Route>
            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default App;
