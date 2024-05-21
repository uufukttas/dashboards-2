import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PaginationItem from './PaginationItem';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { IPaginationProps } from '../types';

const Pagination: React.FC<IPaginationProps> = ({ currentPage, totalCounts, setCurrentPage }: IPaginationProps) => {
    const sectionPrefix: string = `${BRAND_PREFIX}-pagination`;
    const totalPages: number = Math.ceil(totalCounts / 10);

    const renderPageNumbers = (): React.ReactNode[] => {
        const maxVisiblePages: number = 3;
        const pageNumbers: React.ReactNode[] | HTMLElement = [];
        let startPage: number = 1;

        if (currentPage > Math.floor(maxVisiblePages / 2)) {
            startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        };

        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (startPage > 1) {
            pageNumbers.push(
                <PaginationItem
                    isActive={false}
                    isDisabled={false}
                    key={1}
                    pageNumber={1}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </PaginationItem>
            );

            if (startPage > 2) {
                pageNumbers.push(
                    <li
                        className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg'
                        key="ellipsisStart"
                    >
                        ...
                    </li>
                );
            };
        };

        for (let pageIndex: number = startPage; pageIndex <= endPage; pageIndex++) {
            pageNumbers.push(
                <PaginationItem
                    isActive={pageIndex === currentPage}
                    isDisabled={false}
                    key={pageIndex}
                    pageNumber={pageIndex}
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
                    pageNumber={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                >
                    {totalPages}
                </PaginationItem>
            );
        };

        return pageNumbers;
    };

    return (
        <div aria-label="Page navigation" className={`${sectionPrefix}-container flex w-full justify-end`}>
            <div className={`${sectionPrefix}-total-counts-container flex items-center justify-center mt-4 px-2`}>
                <p className={`${sectionPrefix} text-sm text-text font-bold`}>
                    Total: {totalCounts}
                </p>
            </div>
            <ul className={`${sectionPrefix}-list-container flex items-center -space-x-px h-8 text-sm mt-4 pl-2`}>
                <PaginationItem
                    isActive={false}
                    isDisabled={currentPage === 1}
                    pageNumber={currentPage - 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <FaChevronLeft />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem
                    isActive={false}
                    isDisabled={currentPage === totalPages}
                    pageNumber={currentPage + 1}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <FaChevronRight />
                </PaginationItem>
            </ul>
        </div>
    );
};

export default Pagination;
