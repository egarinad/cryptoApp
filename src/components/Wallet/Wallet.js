import React from "react";
import {useSelector} from "react-redux";

const Wallet = () => {
    const wallet = useSelector((state) => state.walletRed.wallet);
    let arr = Object.entries(wallet);
    return (
        <div className="wallet">
            {arr.map((item, i) => (
                <div key={i}>{item}</div>
            ))}
        </div>
    );
};

export default Wallet;
