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
                <div className="modal__content__confirm-modal-text">
                    {' '}
                    You want to delete{' '}
                    <span className="confirm-modal-coin-name">{currentCoin.name}</span> ?
                </div>
                <div className="modal__content__confirm-modal-buttons">
                    <button
                        className="modal__content__confirm-modal-buttons__confirm-button confirm-button"
                        onClick={() => {
                            delFromWallet(currentCoin);
                            setConfirmModal(false);
                        }}>
                        Yes
                    </button>
                    <button
                        className="modal__content__confirm-modal-buttons__non-confirm-button confirm-button"
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
