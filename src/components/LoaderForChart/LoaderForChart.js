import React from "react";
import "./LoaderForChart.scss";

const LoaderForChart = () => {
    return (
        <div className="loader-wrapper-chart">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoaderForChart;
