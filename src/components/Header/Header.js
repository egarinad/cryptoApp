import React from 'react';
import { useSelector } from 'react-redux';
import './Header.scss';
import { useState } from 'react';
import WalletModal from '../Modals/WalletModal/WalletModal';

const Header = () => {
    const [modalActive, setModalActive] = useState(false);
    const [walletPrice, setWalletPrice] = useState(0);
    const [walletBuyPrice, setWalletBuyPrice] = useState(0);

    const difference = walletPrice - walletBuyPrice;
    let percent = ((difference / walletPrice)*100).toFixed(2);
    if (isNaN(percent)) {
        percent = 0;
    }
    let coins = useSelector((state) => state.coinsRed.coins).slice(0, 3);
    return (
        <div className="header">
            <div className="header__container">
                <ul className="header__topThreeCoins">
                    {coins.map((coin) => (
                        <li className="header__item" key={coin.symbol}>
                            <div className="header__item-symbol">{coin.symbol}</div>
                            <div className="header__item-price">
                                {+coin.priceUsd > 1 || +coin.priceUsd === 0
                                    ? (+coin.priceUsd).toFixed(2)
                                    : (+coin.priceUsd).toFixed(4)}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="header__wallet-info">
                    <div className="header__price">
                        <div className="header__current-price">
                            {(+walletPrice).toLocaleString('ru')} $
                        </div>
                        {+difference > 0 ? (
                            <div className="header__difference header__difference_positive">
                                +{(+(+difference).toFixed(2)).toLocaleString()} $ {`(${percent}%)`}
                            </div>
                        ) : (
                            <div className="header__difference header__difference_negative">
                                {(+(+difference).toFixed(2)).toLocaleString()} $ {`(${percent})%`}
                            </div>
                        )}
                    </div>
                    <button className="header__button" onClick={() => setModalActive(true)}>
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
