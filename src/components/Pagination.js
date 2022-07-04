import React, {useEffect, useState} from "react";
import "../scss/pagination.scss";
import ReactPaginate from "react-paginate";
import "../scss/Coins.scss";
import {Link} from "react-router-dom";
import Coin from "./Coin";

function Items({currentCoins}) {

    const show = (coin) => {
        // const a={
        //     coin,
        //     1,
        // }
    }

    return (
        <div className="coins">
            <div className="coins-container">
                {currentCoins && currentCoins.map((coin, i) => (
                    <div className="each-element">
                        <Link to={`/coin/${coin.id}`} element={<Coin/>} className="coin"
                              key={coin.id}>
                            <div className="coin__rank coin__element">{coin.rank}</div>
                            <div className="coin__name coin__element">{coin.name}</div>
                            <div className="coin__symbol coin__element">{coin.symbol}</div>
                            <div className="coin__price coin__element">
                                {coin.priceUsd > 1
                                    ? (+coin.priceUsd).toFixed(2)
                                    : (+coin.priceUsd).toFixed(5)}
                            </div>
                            {+coin.changePercent24Hr > 0 ? (
                                <div className="coin__posChange coin__element">
                                    {`+${(+coin.changePercent24Hr).toFixed(2)}%`}
                                </div>
                            ) : (
                                <div className="coin__negChange coin__element">
                                    {`${(+coin.changePercent24Hr).toFixed(2)}%`}
                                </div>
                            )}
                        </Link>
                        <button className="addToWalletButton" onClick={()=>show(coin.id)}>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Pagination = ({coins}) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + 15;
        setCurrentItems(coins.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(coins.length / 15));
    }, [itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 15) % coins.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="pag">
            <Items className="items" currentCoins={currentItems}/>
            <div className="pages-container">
                <div className="pages">
                    <ReactPaginate
                        pageLinkClassName="iter"
                        activeClassName="it active"
                        breakClassName="it break-me"
                        containerClassName="pages"
                        disabledClassName="it disabled-page"
                        nextClassName="it next"
                        previousClassName="it previous"
                        className="pagination"
                        pageClassName="it"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    );
};

export default Pagination;
