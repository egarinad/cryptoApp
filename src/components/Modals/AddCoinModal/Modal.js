import React, {useEffect, useRef, useState} from "react";
import "./Modal.scss";
import {useDispatch} from "react-redux";
import {addCoin} from "../../../redux/walletReducer";

const Modal = ({active, setActive, currentCoin}) => {
    const [input, setInput] = useState("");

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    });

    const addToWallet = (e) => {
        e.preventDefault();
        const coin = {
            coinId: currentCoin.id,
            amount: +input,
        };
        dispatch(addCoin(coin));
        setInput("");
        setActive(false);
    };

    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => {
                setActive(false);
                setInput("");
            }}
        >
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-header__name">{currentCoin.name}</div>
                    <button
                        className="modal-header__button"
                        onClick={() => {
                            setActive(false);
                            setInput("");
                        }}
                    >
                        X
                    </button>
                </div>
                <form className="modal-form" onSubmit={addToWallet}>
                    <div className="modal-form__data data">
                        <div className="data__price">
                            Price:{" "}
                            {currentCoin.priceUsd > 1
                                ? (+currentCoin.priceUsd).toFixed(2)
                                : (+currentCoin.priceUsd).toFixed(5)}
                        </div>
                        {+currentCoin.changePercent24Hr > 0 ? (
                            <div className="data__posChange">
                                {`+${(+currentCoin.changePercent24Hr).toFixed(2)}%`}
                            </div>
                        ) : (
                            <div className="data__negChange">
                                {`${(+currentCoin.changePercent24Hr).toFixed(2)}%`}
                            </div>
                        )}
                    </div>
                    <input
                        className="modal-form__input"
                        placeholder="Your input..."
                        type="number"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        ref={inputRef}
                    />
                    <button className="modal-form__button">Add to wallet</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
