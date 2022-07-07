import React from "react";
import {useSelector} from "react-redux";
import "./Header.scss";
import {useState} from "react";
import WalletModal from "../Modals/WalletModal/WalletModal";

const Header = () => {
    const [modalActive, setModalActive] = useState(false);
    const [walletPrice, setWalletPrice] = useState(0);
    const [walletBuyPrice, setWalletBuyPrice] = useState(0);

    const difference = walletPrice - walletBuyPrice;
    let percent = (difference / walletPrice).toFixed(2);
    if(isNaN(percent)){
        percent=0
    }
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
                                {+coin.priceUsd > 1 || +coin.priceUsd===0
                                    ? (+coin.priceUsd).toFixed(2)
                                    : (+coin.priceUsd).toFixed(4)}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="wallet-info">
                    <div className="wallet-price-info">
                        <div className="wallet-price-info__current-price">
                            {walletPrice} $
                        </div>
                        {+difference > 0 ? (
                            <div className="wallet-price-info__difference-positive">
                                +
                                {(+difference).toFixed(2)} $ {`(${percent}%)`}
                            </div>
                        ) : (
                            <div className="wallet-price-info__difference-negative">
                                {(+difference).toFixed(2)} $ {`(${percent})%`}
                            </div>
                        )}
                    </div>
                    <button
                        className="wallet-button"
                        onClick={() => setModalActive(true)}
                    >
                        WALLET
                    </button>
                </div>
            </div>
            <WalletModal
                difference={difference}
                percent={percent}
                setWalletPrice={setWalletPrice}
                setWalletBuyPrice={setWalletBuyPrice}
                active={modalActive}
                setActive={setModalActive}
            />
        </div>
    );
};

export default Header;
