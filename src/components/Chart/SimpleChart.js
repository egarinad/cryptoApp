import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import LoaderForChart from '../LoaderForChart/LoaderForChart';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SimpleChart = () => {
    const params = useParams();
    const url = `https://api.coincap.io/v2/assets/${params.coinId}/history?interval=h1`;
    const [dates, setDates] = useState([]);
    const [price, setPrice] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url) => {
        await setLoading(true);
        const result = await fetch(url);
        const info = await result.json();
        const data = await info.data.reverse().slice(0, 24).reverse();
        await setPrice(
            data.map((item) => {
                return item.priceUsd > 1
                    ? +(+item.priceUsd).toFixed(2)
                    : +(+item.priceUsd).toFixed(5);
            })
        );
        setDates(
            data.map((item) => {
                return new Date(item.date).getHours() + 'h';
            })
        );
        await setLoading(false);
    };

    useEffect(() => {
        fetchData(url);
    }, []);

    return (
        <>
            {loading ? (
                <LoaderForChart />
            ) : (
                <Line
                    width="360px"
                    height="210px"
                    data={{
                        labels: [...dates],
                        datasets: [
                            {
                                label: 'Usd',
                                fill: false,
                                lineTension: 0,
                                backgroundColor: '#8d93ab',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                data: [...price]
                            }
                        ]
                    }}
                    options={{
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            )}
        </>
    );
};
export default SimpleChart;
