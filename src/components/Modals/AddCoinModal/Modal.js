import React, { useEffect, useRef, useState } from 'react';
import './Modal.scss';
import { useDispatch } from 'react-redux';
import { addCoin } from '../../../redux/walletReducer';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ active, setActive, currentCoin }) => {
    const [input, setInput] = useState('');

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    });

    const notifySuccess = () => toast.success(`Successfully add ${input} ${currentCoin.name}!`);
    const notifyError = () => toast.error(`You can't add ${input} ${currentCoin.name}!`);

    const addToWallet = (e) => {
        e.preventDefault();
        if (+input <= 0) {
            setInput('');
            setActive(false);
            notifyError();
            return;
        }
        const coin = {
            coinId: currentCoin.id,
            coinPrice: +currentCoin.priceUsd,
            amount: +input
        };
        dispatch(addCoin(coin));
        setInput('');
        setActive(false);
        notifySuccess();
    };

    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={() => {
                setActive(false);
                setInput('');
            }}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__header-name">{currentCoin.name}</div>
                    <button
                        className="modal__header-button"
                        onClick={() => {
                            setActive(false);
                            setInput('');
                        }}>
                        X
                    </button>
                </div>
                <form className="modal__form" onSubmit={addToWallet}>
                    <div className="modal__form-data">
                        <div className="modal__data-price">
                            Price:{' '}
                            {currentCoin.priceUsd > 1
                                ? (+currentCoin.priceUsd).toFixed(2)
                                : (+currentCoin.priceUsd).toFixed(5)}
                        </div>
                        {+currentCoin.changePercent24Hr > 0 ? (
                            <div className="modal__price-change modal__price-change_posChange">
                                {`+${(+currentCoin.changePercent24Hr).toFixed(2)}%`}
                            </div>
                        ) : (
                            <div className="modal__price-change modal__price-change_negChange">
                                {`${(+currentCoin.changePercent24Hr).toFixed(2)}%`}
                            </div>
                        )}
                    </div>
                    <input
                        className="modal__form-input"
                        placeholder="Your input..."
                        type="number"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        ref={inputRef}
                    />
                    <button className="modal__form-button">Add to wallet</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
