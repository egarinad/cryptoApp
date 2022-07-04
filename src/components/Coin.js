import React from 'react';
import {useParams} from "react-router-dom";
import Chart from "./Chart";

const Coin = () => {
    const params= useParams()
    console.log(params)
    return (
        <div>
            {params.coinId}
        </div>
    );
};

export default Coin;