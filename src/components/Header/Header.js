import React from "react";
import {useSelector} from "react-redux";
import "./Header.scss";
import {Link} from "react-router-dom";
import Wallet from "../Wallet/Wallet";

const Header = () => {
    let coins = useSelector((state) => state.coinsRed.coins);
    coins = coins.slice(0, 3);
    return (
        <div className="header">
            <div className="header-container">
                <ul className="topThreeCoins">
                    {coins.map((coin, i) => (
                        <li
                            className={`topThreeCoins__${coin.rank} item`}
                            key={coin.symbol}
                        >
                            <div className="item__symbol">{coin.symbol}</div>
                            <div className="item__price">
                                {+coin.priceUsd > 5
                                    ? (+coin.priceUsd).toFixed(2)
                                    : (+coin.priceUsd).toFixed(4)}
                            </div>
                        </li>
                    ))}
                </ul>
                <Link to="/wallet" element={<Wallet/>} className="wallet">
                    WALLET
                </Link>
            </div>
        </div>
    );
};

export default Header;
