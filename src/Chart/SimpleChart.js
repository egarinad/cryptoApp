import React from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis} from "recharts";

const simpleData = [
    {
        priceUsd: 6379.3997635993342453,
        time: 1,
    },
    {
        priceUsd: 6466.313562276229528,
        time: 2,
    },
    {
        priceUsd: 6601.0724971279524219,
        time: 3,
    },
    {
        priceUsd: 6581.0092630267574887,
        time: 4,
    },
    {
        priceUsd: 6629.136292717177387,
        time: 5,
    },
    {
        priceUsd: 6549.1112450806328349,
        time: 6,
    },
    {
        priceUsd: 6655.9108972488685303,
        time: 7,
    },
    {
        priceUsd: 6818.2081672225807333,
        time: 8,
    },
    {
        priceUsd: 6741.7764822044089258,
        time: 9,
    },
    {
        priceUsd: 6525.5093638185088059,
        time: 10,
    },
    {
        priceUsd: 6585.4814995139912926,
        time: 11,
    },
    {
        priceUsd: 6489.0484273708415619,
        time: 12,
    },
    {
        priceUsd: 6291.014699884455363,
        time: 13,
    },
    {
        priceUsd: 6252.1208882488125434,
        time: 14,
    },
    {
        priceUsd: 6340.1868649492544957,
        time: 15,
    },
    {
        priceUsd: 6379.3997635993342453,
        time: 16,
    },
    {
        priceUsd: 6466.313562276229528,
        time: 17,
    },
    {
        priceUsd: 6601.0724971279524219,
        time: 18,
    },
    {
        priceUsd: 6581.0092630267574887,
        time: 19,
    },
    {
        priceUsd: 6629.136292717177387,
        time: 20,
    },
    {
        priceUsd: 6549.1112450806328349,
        time: 21,
    },
    {
        priceUsd: 6655.9108972488685303,
        time: 22,
    },
    {
        priceUsd: 6818.2081672225807333,
        time: 23,
    },
    {
        priceUsd: 6741.7764822044089258,
        time: 24,
    },
    {
        priceUsd: 6525.5093638185088059,
        time: 25,
    },
    {
        priceUsd: 6585.4814995139912926,
        time: 26,
    },
    {
        priceUsd: 6489.0484273708415619,
        time: 27,
    },
    {
        priceUsd: 6291.014699884455363,
        time: 28,
    },
    {
        priceUsd: 6252.1208882488125434,
        time: 29,
    },
    {
        priceUsd: 6840.1868649492544957,
        time: 30,
    },
];
const SimpleChart = () => {
    return (
        <ResponsiveContainer width="40%" height="200px" aspect={2}>
            <LineChart data={simpleData}>
                <XAxis dataKey="time"/>
                <Line dataKey="priceUsd"/>
                <YAxis/>
            </LineChart>
        </ResponsiveContainer>
    );
};
export default SimpleChart;
