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
            {currentCoins &&
                currentCoins.map((coin, i) => (
                    <div className="coins-page__each-coin" key={i}>
                        <Link
                            to={`/coin/${coin.id}`}
                            element={<Coin />}
                            className="coins-page__each-coin__without-button"
                            key={coin.id}>
                            <div className="coins-page__each-coin__without-button__rank coins-page__each-coin__without-button__element">
                                {coin.rank}
                            </div>
                            <div className="coins-page__each-coin__without-button__name coins-page__each-coin__without-button__element">
                                {coin.name}
                            </div>
                            <div className="coins-page__each-coin__without-button__symbol coins-page__each-coin__without-button__element">
                                {coin.symbol}
                            </div>
                            <div className="coins-page__each-coin__without-button__price coins-page__each-coin__without-button__element">
                                {coin.priceUsd > 1.1
                                    ? (+(+coin.priceUsd).toFixed(2)).toLocaleString()
                                    : (+coin.priceUsd).toFixed(5)}{' '}
                                $
                            </div>
                            {+coin.changePercent24Hr > 0 ? (
                                <div className="coins-page__each-coin__without-button__posChange coins-page__each-coin__without-button__element">
                                    {`+${(+coin.changePercent24Hr).toFixed(2)}%`}
                                </div>
                            ) : (
                                <div className="coins-page__each-coin__without-button__negChange coins-page__each-coin__without-button__element">
                                    {`${(+coin.changePercent24Hr).toFixed(2)}%`}
                                </div>
                            )}
                        </Link>
                        <button
                            className="coins-page__each-coin__button"
                            onClick={() => {
                                setModalActive(true);
                                setCurrentCoin(coin);
                            }}
                            key={coin.name}>
                            +
                        </button>
                    </div>
                ))}
            <Modal active={modalActive} setActive={setModalActive} currentCoin={currentCoin} />
        </div>
    );
};

export default Coins;
