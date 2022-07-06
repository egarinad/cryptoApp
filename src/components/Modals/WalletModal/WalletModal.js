import React, {useEffect} from "react";
import "./WalletMadal.scss";
import {useDispatch, useSelector} from "react-redux";
import {addCoinsFromStorage, delCoin} from "../../../redux/walletReducer";

const WalletModal = ({active, setActive}) => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.walletRed.wallet);
    const coins = useSelector((state) => state.coinsRed.coins);
    // useEffect(()=>{
    //     const savedWallet = localStorage.getItem("wallet")
    //     console.log(savedWallet)
    //     if(savedWallet)
    //         dispatch(addCoinsFromStorage(JSON.parse(savedWallet)))
    // }, []);
    let arr = Object.entries(wallet);
    console.log("Wallet",arr);
    arr = arr.map((elem) => {
        let price = coins.find((coin) => elem[0] === coin.id);
        elem.push(price);
        return elem;
    });
    arr = arr.map((item) => {
        item.push(+item[2].priceUsd);
        item.push(item[1] * item[3]);
        return item;
    });
    arr.sort((a, b) => (a[4] < b[4] ? 1 : -1));
    const fullPrice = arr.reduce((sum, current) => {
        return (sum += +current[4]);
    }, 0);



    const delFromWallet = (coin) => {
        const a = {
            coinId: coin.id,
        };
        dispatch(delCoin(a));
    };

    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => {
                setActive(false);
            }}
        >
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-wallet-header">
                    <div className="modal-wallet-header__name">Your wallet</div>
                    <button
                        className="modal-wallet-header__button"
                        onClick={() => {
                            setActive(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="wallet-price">
                    <span className="wallet-price__text">Full price: </span>
                    {fullPrice > 1 ? (+fullPrice).toFixed(2) : (+fullPrice).toFixed(5)} $
                </div>
                <ul className="wallet-list">
                    {arr.map((item, i) => (
                        <>
                            <li className="wallet-list-item" key={i}>
                                <div className="wallet-list-item__name">{(item[2]).symbol}</div>
                                <div className="wallet-list-item__amount">{item[1]}</div>
                                <div className="wallet-list-item__sum">
                                    {item[4] > 1 ? (+item[4]).toFixed(2) : (+item[4]).toFixed(5)}{" "}
                                    $
                                </div>
                                <button
                                    key={i}
                                    className="wallet-list-item__button"
                                    onClick={() => delFromWallet(item[2])}
                                >
                                    X
                                </button>
                            </li>
                        </>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WalletModal;
