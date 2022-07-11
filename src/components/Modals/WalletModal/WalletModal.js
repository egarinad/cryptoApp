import React, { useState } from 'react';
import './WalletMadal.scss';
import { useSelector } from 'react-redux';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const WalletModal = ({
    active,
    setActive,
    difference,
    percent,
    setWalletPrice,
    setWalletBuyPrice
}) => {
    const wallet = useSelector((state) => state.walletRed.wallet);
    const coins = useSelector((state) => state.coinsRed.coins);

    const [confirmModal, setConfirmModal] = useState(false);
    const [currentCoin, setCurrentCoin] = useState({});

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

    arr.sort((a, b) => (a[5] < b[5] ? 1 : -1));
    const fullPrice = arr.reduce((sum, current) => {
        return (sum += +current[5]);
    }, 0);

    const buyPrice = arr.reduce((sum, current) => {
        return (sum += +current[4]);
    }, 0);

    setWalletPrice(
        fullPrice > 1 || +fullPrice === 0 ? (+fullPrice).toFixed(2) : (+fullPrice).toFixed(5)
    );
    setWalletBuyPrice(
        buyPrice > 1 || +buyPrice === 0 ? (+buyPrice).toFixed(2) : (+buyPrice).toFixed(5)
    );

    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={() => {
                setActive(false);
            }}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                {fullPrice === 0 ? (
                    <div className="modal__header">
                        <div className="modal__header-name">Your wallet is Empty</div>
                        <button
                            className="modal__header-button"
                            onClick={() => {
                                setActive(false);
                            }}>
                            X
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="modal__header">
                            <div className="modal__header-name">Your wallet</div>
                            <button
                                className="modal__header-button"
                                onClick={() => {
                                    setActive(false);
                                }}>
                                X
                            </button>
                        </div>
                        <div className="modal__wallet-price">
                            <div className="modal__wallet-current-price">
                                {fullPrice > 1
                                    ? (+(+fullPrice).toFixed(2)).toLocaleString()
                                    : (+fullPrice).toFixed(5)}
                                $
                            </div>
                            {+difference > 0 ? (
                                <div className="modal__wallet-difference modal__wallet-difference_positive">
                                    +{(+difference).toFixed(2)} $ {`(${percent}%)`}
                                </div>
                            ) : (
                                <div className="modal__wallet-difference modal__wallet-difference_negative">
                                    {(+difference).toFixed(2)} $ {`(${percent})%`}
                                </div>
                            )}
                        </div>
                        <ul className="modal__wallet-list">
                            {arr.map((item, i) => (
                                <li className="modal__wallet-list-item" key={i}>
                                    <div className="modal__wallet-list-item-name">
                                        {item[2].symbol}
                                    </div>
                                    <div className="modal__wallet-list-item-amount">
                                        {(+item[3]).toLocaleString()}
                                    </div>
                                    <div className="modal__wallet-list-item-sum">
                                        {item[5] > 1
                                            ? (+(+item[5]).toFixed(2)).toLocaleString()
                                            : (+item[5]).toFixed(5)}{' '}
                                        $
                                    </div>
                                    <button
                                        className="modal__wallet-list-item-button"
                                        onClick={() => {
                                            setConfirmModal(true);
                                            setCurrentCoin(item[2]);
                                        }}>
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <ConfirmationModal
                confirmModal={confirmModal}
                setConfirmModal={setConfirmModal}
                currentCoin={currentCoin}
            />
        </div>
    );
};

export default WalletModal;
