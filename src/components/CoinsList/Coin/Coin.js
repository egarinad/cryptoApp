import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Modal from '../../Modals/AddCoinModal/Modal';
import './Coin.scss';
import SimpleChart from '../../Chart/SimpleChart';

const Coin = () => {
    const params = useParams();
    const url = `https://api.coincap.io/v2/assets/${params.coinId}`;
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const [modalActive, setModalActive] = useState(false);
    const currentCoin = info;

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((r) => r.json())
            .then((json) => {
                setInfo(json.data);
            })
            .then(() => setLoading(false));
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="coin-page">
                    <div className="coin-page__container">
                        <div className="coin-page__header">
                            <div className="coin-page__header-rank">#{info.rank}</div>
                            <div className="coin-page__header-name">{info.name}</div>
                            <Link to={'/'} className="coin-page__header-link" key={info.name}>
                                {'<--'}
                            </Link>
                        </div>
                        <div className="coin-page__chart">
                            <SimpleChart />
                        </div>
                        <div className="coin-page__info">
                            <div className="coin-page__info-symbol">
                                <span className="marker">Symbol: </span>
                                {info.symbol}
                            </div>
                            <div className="coin-page__info-price">
                                <span className="marker">Price: </span>
                                {info.priceUsd > 1
                                    ? (+(+info.priceUsd).toFixed(2)).toLocaleString()
                                    : (+info.priceUsd).toFixed(5)}{' '}
                                $
                            </div>
                            {+info.changePercent24Hr > 0 ? (
                                <div className="coin-page__info-change coin-page__info-change_posChange">
                                    <span className="marker">Changed: </span>{' '}
                                    {`+${(+info.changePercent24Hr).toFixed(2)}%`}
                                </div>
                            ) : (
                                <div className="coin-page__info-change coin-page__info-change_negChange">
                                    <span className="marker">Changed: </span>{' '}
                                    {`${(+info.changePercent24Hr).toFixed(2)}%`}
                                </div>
                            )}
                            <div className="coin-page__info-marketCap">
                                <span className="marker">MarketCap: </span>{' '}
                                {(+info.marketCapUsd).toLocaleString()} $
                            </div>
                        </div>
                        <button
                            className="coin-page__add-to-wallet-button-button"
                            onClick={() => {
                                setModalActive(true);
                            }}
                            key={info.name}>
                            Add to wallet
                        </button>
                    </div>
                </div>
            )}
            <Modal active={modalActive} setActive={setModalActive} currentCoin={currentCoin} />
        </>
    );
};

export default Coin;
