import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PaginationItem from './PaginationItem';
import type { IPaginationProps } from '../types';

const Pagination = ({ currentPage, totalCounts, setCurrentPage }: IPaginationProps) => {
    const totalPages = Math.ceil(totalCounts / 10);
    const renderPageNumbers = () => {
        const maxVisiblePages = 3;
        const pageNumbers = [];
        let startPage = 1;

        if (currentPage > Math.floor(maxVisiblePages / 2)) {
            startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        };

        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (startPage > 1) {
            pageNumbers.push(
                <PaginationItem
                    isDisabled={false}
                    key={1}
                    page={1}
                    onClick={() => setCurrentPage(1)} isActive={false}
                >
                    1
                </PaginationItem>
            );

            if (startPage > 2) {
                pageNumbers.push(
                    <li key="ellipsisStart"
                        className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg'
                    >
                        ...
                    </li>
                );
            };
        };

        for (let pageIndex = startPage; pageIndex <= endPage; pageIndex++) {
            pageNumbers.push(
                <PaginationItem
                    isActive={pageIndex === currentPage}
                    isDisabled={false}
                    key={pageIndex}
                    page={pageIndex}
                    onClick={() => setCurrentPage(pageIndex)}
                >
                    {pageIndex}
                </PaginationItem>
            );
        };

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <li
                        className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg'
                        key="ellipsisEnd"
                    >
                        ...
                    </li>
                );
            };

            pageNumbers.push(
                <PaginationItem
                    isActive={false}
                    isDisabled={false}
                    key={totalPages}
                    page={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                >
                    {totalPages}
                </PaginationItem>
            );
        };

        return pageNumbers;
    };

    return (
        <div aria-label="Page navigation" className="flex w-full justify-between">
            <div className="total-counts-wrapper flex items-center justify-center mt-4">
                <p className="total-counts text-sm text-text font-bold">
                    Total: {totalCounts}
                </p>
            </div>
            <ul className="pagination flex items-center -space-x-px h-8 text-sm mt-4">
                <PaginationItem
                    isActive={false}
                    isDisabled={currentPage === 1}
                    page={currentPage - 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <FaChevronLeft />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem
                    isActive={false}
                    isDisabled={currentPage === totalPages}
                    page={currentPage + 1}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <FaChevronRight />
                </PaginationItem>
            </ul>
        </div>
    );
};

export default Pagination;
