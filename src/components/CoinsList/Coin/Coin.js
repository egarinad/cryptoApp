import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loader from "../../Loader/Loader";
import Modal from "../../Modals/AddCoinModal/Modal";
import "./Coin.scss";
//import SimpleChart from "../../../Chart/SimpleChart";

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
                <Loader/>
            ) : (
                <div className="coin-container">
                    <div className="coin-header">
                        <div className="coin-header__rank">#{info.rank}</div>
                        <div className="coin-header__name">{info.name}</div>
                        <button
                            className="coin-header__button"
                            onClick={() => {
                                setModalActive(true);
                            }}
                            key={info.name}
                        >
                            +
                        </button>
                    </div>
                    <div className="coin-chart">Chart</div>
                    <div className="coin-info info">
                        <div className="info__symbol">
                            <span className="marker">Symbol: </span>
                            {info.symbol}
                        </div>
                        <div className="info__price">
                            <span className="marker">Price: </span>
                            {info.priceUsd > 1
                                ? (+info.priceUsd).toFixed(2)
                                : (+info.priceUsd).toFixed(5)}{" "}
                            $
                        </div>
                        {+info.changePercent24Hr > 0 ? (
                            <div className="info__posChange">
                                <span className="marker">Changed: </span>{" "}
                                {`+${(+info.changePercent24Hr).toFixed(2)}%`}
                            </div>
                        ) : (
                            <div className="info__negChange">
                                <span className="marker">Changed: </span>{" "}
                                {`${(+info.changePercent24Hr).toFixed(2)}%`}
                            </div>
                        )}
                        <div className="info__marketCap">
                            <span className="marker">MarketCap: </span>{" "}
                            {(+info.marketCapUsd).toLocaleString()} $
                        </div>
                    </div>
                    <button
                        className="add-to-wallet-button-button"
                        onClick={() => {
                            setModalActive(true);

                        }}
                        key={info.name}
                    >
                        Add to wallet
                    </button>
                </div>
            )}
            <Modal
                active={modalActive}
                setActive={setModalActive}
                currentCoin={currentCoin}
            />
        </>
    );
};

export default Coin;
