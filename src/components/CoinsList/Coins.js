import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Coin from './Coin/Coin';
import './Coins.scss';
import Modal from '../Modals/AddCoinModal/Modal';

const Coins = ({ currentCoins }) => {
    const [modalActive, setModalActive] = useState(false);
    const [currentCoin, setCurrentCoin] = useState({});

    return (
        <div className="coins-page">
            <div className="coins-page__container">
                {currentCoins &&
                    currentCoins.map((coin, i) => (
                        <div className="coins-page__each-coin" key={i}>
                            <Link
                                to={`/coin/${coin.id}`}
                                element={<Coin />}
                                className="coins-page__each-coin-without-button"
                                key={coin.id}>
                                <div className="coins-page__each-coin-without-button-rank coins-page__element">
                                    {coin.rank}
                                </div>
                                <div className="coins-page__each-coin-without-button-name coins-page__element">
                                    {coin.name}
                                </div>
                                <div className="coins-page__each-coin-without-button-symbol coins-page__element">
                                    {coin.symbol}
                                </div>
                                <div className="coins-page__each-coin-without-button-price coins-page__element">
                                    {coin.priceUsd > 1.1
                                        ? (+(+coin.priceUsd).toFixed(2)).toLocaleString()
                                        : (+coin.priceUsd).toFixed(5)}{' '}
                                    $
                                </div>
                                {+coin.changePercent24Hr > 0 ? (
                                    <div className="coins-page__each-coin-without-button-change coins-page__each-coin-without-button-change_posChange coins-page__element">
                                        {`+${(+coin.changePercent24Hr).toFixed(2)}%`}
                                    </div>
                                ) : (
                                    <div className="coins-page__each-coin-without-button-change coins-page__each-coin-without-button-change_negChange coins-page__element">
                                        {`${(+coin.changePercent24Hr).toFixed(2)}%`}
                                    </div>
                                )}
                            </Link>
                            <button
                                className="coins-page__addButton"
                                onClick={() => {
                                    setModalActive(true);
                                    setCurrentCoin(coin);
                                }}
                                key={coin.name}>
                                +
                            </button>
                        </div>
                    ))}
            </div>
            <Modal active={modalActive} setActive={setModalActive} currentCoin={currentCoin} />
        </div>
    );
};

export default Coins;
