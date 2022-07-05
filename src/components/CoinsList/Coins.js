import React from "react";
import {useDispatch} from "react-redux";
import {addCoin} from "../../redux/walletReducer";
import {Link} from "react-router-dom";
import Coin from "./Coin/Coin";
import "./Coins.scss";

const Coins = ({currentCoins}) => {
    const dispatch = useDispatch();
    const show = (coin) => {
        const a = {
            coinId: coin.id,
            amount: 1,
        };
        dispatch(addCoin(a));
    };

    return (
        <div className="coins-container">
            {currentCoins &&
                currentCoins.map((coin, i) => (
                    <div className="each-coin-with-button">
                        <Link
                            to={`/coin/${coin.id}`}
                            element={<Coin/>}
                            className="coin"
                            key={coin.id}
                        >
                            <div className="coin__rank coin__element">{coin.rank}</div>
                            <div className="coin__name coin__element">{coin.name}</div>
                            <div className="coin__symbol coin__element">{coin.symbol}</div>
                            <div className="coin__price coin__element">
                                {coin.priceUsd > 1
                                    ? (+coin.priceUsd).toFixed(2)
                                    : (+coin.priceUsd).toFixed(5)}
                            </div>
                            {+coin.changePercent24Hr > 0 ? (
                                <div className="coin__posChange coin__element">
                                    {`+${(+coin.changePercent24Hr).toFixed(2)}%`}
                                </div>
                            ) : (
                                <div className="coin__negChange coin__element">
                                    {`${(+coin.changePercent24Hr).toFixed(2)}%`}
                                </div>
                            )}
                        </Link>
                        <button
                            className="add-to-wallet-button"
                            onClick={() => show(coin)}
                            key={coin.name}
                        >
                            +
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default Coins;
