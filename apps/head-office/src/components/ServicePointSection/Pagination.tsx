import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PaginationItem from './PaginationItem';

interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (currentPage: number) => void;
};

const Pagination = ({ currentPage, totalPages, setCurrentPage }: IPaginationProps) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        let startPage = 1;

        if (currentPage > Math.floor(maxVisiblePages / 2)) {
            startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        }

        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (startPage > 1) {
            pageNumbers.push(
                <PaginationItem
                    key={1}
                    currentPage={currentPage}
                    page={1}
                    onClick={() => setCurrentPage(1)} isActive={false}
                    isDisabled={false}
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
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PaginationItem
                    key={i}
                    currentPage={currentPage}
                    page={i}
                    onClick={() => setCurrentPage(i)}
                    isActive={i === currentPage}
                    isDisabled={false}
                >
                    {i}
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <li
                        key="ellipsisEnd"
                        className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg'
                    >
                        ...
                    </li>
                );
            }
            pageNumbers.push(
                <PaginationItem
                    key={totalPages}
                    currentPage={currentPage}
                    page={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    isActive={false}
                    isDisabled={false}
                >
                    {totalPages}
                </PaginationItem>
            );
        }

        return pageNumbers;
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination flex items-center -space-x-px h-8 text-sm mt-4">
                <PaginationItem
                    currentPage={currentPage}
                    page={currentPage - 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    isActive={false}
                    isDisabled={currentPage === 1}
                >
                    <FaChevronLeft />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem
                    currentPage={currentPage}
                    page={currentPage + 1}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    isActive={false}
                    isDisabled={currentPage === totalPages}
                >
                    <FaChevronRight />
                </PaginationItem>
            </ul>
        </nav>
    );
};

export default Pagination;
