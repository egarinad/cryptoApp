import React from 'react';
import './ConfirmationMadal.scss';
import { delCoin } from '../../../redux/walletReducer';
import { useDispatch } from 'react-redux';

const ConfirmationModal = ({ confirmModal, setConfirmModal, currentCoin }) => {
    const dispatch = useDispatch();

    const delFromWallet = (coin) => {
        const a = {
            coinId: coin.id
        };
        dispatch(delCoin(a));
    };

    return (
        <div
            className={confirmModal ? 'modal active' : 'modal'}
            onClick={(e) => {
                setConfirmModal(false);
                e.stopPropagation();
            }}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__confirm-text">
                    {' '}
                    You want to delete <span className="confirm-coin-name">
                        {currentCoin.name}
                    </span>{' '}
                    ?
                </div>
                <div className="modal__confirm-buttons">
                    <button
                        className="modal__confirm-button modal__confirm-button_confirm-button"
                        onClick={() => {
                            delFromWallet(currentCoin);
                            setConfirmModal(false);
                        }}>
                        Yes
                    </button>
                    <button
                        className="modal__confirm-button modal__confirm-button_non-confirm-button"
                        onClick={() => {
                            setConfirmModal(false);
                        }}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
