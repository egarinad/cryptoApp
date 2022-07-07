import React, {useEffect, useState} from "react";
import "./WalletMadal.scss";
import {useDispatch, useSelector} from "react-redux";
import {delCoin} from "../../../redux/walletReducer";

const WalletModal = ({
                         active,
                         setActive,
                         difference,
                         percent,
                         setWalletPrice,
                         setWalletBuyPrice,
                     }) => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.walletRed.wallet);
    const coins = useSelector((state) => state.coinsRed.coins);
    //console.log(wallet)
    let arr = Object.entries(wallet);
    arr = arr.map((item) => {
        let sum = 0;
        let amount = 0;
        let fullInfo = coins.find((coin) => item[0] === coin.id);
        item.push(fullInfo);
        for (let key in item[1]) {
            sum += key * item[1][key];
            amount += item[1][key];
        }
        item.push(amount);
        item.push(sum);
        item.push(+amount * item[2].priceUsd);
        return item;
    });

    arr.sort((a,b)=> a[5]<b[5] ? 1 : -1)
    const fullPrice = arr.reduce((sum, current) => {
        return (sum += +current[5]);
    }, 0);

    const buyPrice = arr.reduce((sum, current) => {
        return (sum += +current[4]);
    }, 0);

    setWalletPrice(
        fullPrice > 1 || +fullPrice === 0
            ? (+fullPrice).toFixed(2)
            : (+fullPrice).toFixed(5)
    );
    setWalletBuyPrice(
        buyPrice > 1 || +buyPrice === 0
            ? (+buyPrice).toFixed(2)
            : (+buyPrice).toFixed(5)
    );
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
                    <div className="wallet-price-info__current-price">
                        {fullPrice > 1 ? (+fullPrice).toFixed(2) : (+fullPrice).toFixed(5)}{" "}
                        $
                    </div>
                    {+difference > 0 ? (
                        <div className="wallet-price-info__difference-positive">
                            +
                            {+difference > 1 || +difference === 0
                                ? (+difference).toFixed(2)
                                : (+difference).toFixed(4)}{" "}
                            $ {`(${percent}%)`}
                        </div>
                    ) : (
                        <div className="wallet-price-info__difference-negative">
                            {+difference < -1 || +difference === 0
                                ? (+difference).toFixed(2)
                                : (+difference).toFixed(4)}{" "}
                            $ {`(${percent})%`}
                        </div>
                    )}
                </div>
                <ul className="wallet-list">
                    {arr.map((item, i) => (
                        <li className="wallet-list-item" key={i}>
                            <div className="wallet-list-item__name">{item[2].symbol}</div>
                            <div className="wallet-list-item__amount">{item[3]}</div>
                            <div className="wallet-list-item__sum">
                                {item[5] > 1 ? (+item[5]).toFixed(2) : (+item[5]).toFixed(5)} $
                            </div>
                            <button
                                className="wallet-list-item__button"
                                onClick={() => delFromWallet(item[2])}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WalletModal;
