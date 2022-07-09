import React, { useEffect, useState } from 'react';
import './pagination.scss';
import ReactPaginate from 'react-paginate';
import Coins from '../CoinsList/Coins';

const Pagination = ({ coins }) => {
    const ITEMS_ON_PAGE = 15;

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + ITEMS_ON_PAGE;
        setCurrentItems(coins.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(coins.length / ITEMS_ON_PAGE));
    }, [itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * ITEMS_ON_PAGE) % coins.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="pag">
            <Coins className="items" currentCoins={currentItems} />
            <div className="pages-container">
                <div className="pages">
                    <ReactPaginate
                        className="pagination"
                        pageLinkClassName="iter"
                        activeClassName="it active"
                        breakClassName="it break-me"
                        containerClassName="pages"
                        disabledClassName="it disabled-page"
                        nextClassName="it next"
                        previousClassName="it previous"
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
