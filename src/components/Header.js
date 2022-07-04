import React from "react";
import {useSelector} from "react-redux";
import "../scss/Header.scss";

const Header = () => {
    let coins = useSelector((state) => state.coinsRed.coins);
    coins = coins.slice(0, 3);
    return (
        <div className="header">
            <div className="container">
                <ul className="topThreeCoins">
                    {coins.map((coin, i) => (
                        <li className={`topThreeCoins__${coin.rank} item`} key={coin.symbol}>
                            <div className="coin-symbol">
                                {coin.symbol}
                            </div>
                            <div className="coin-price">
                                {+coin.priceUsd > 5
                                    ? (+coin.priceUsd).toFixed(2)
                                    : (+coin.priceUsd).toFixed(4)}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="wallet">WALLET</div>
            </div>
        </div>
    );
};

export default Header;
