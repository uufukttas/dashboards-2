import React from 'react';
import { Button } from '@projects/button';

interface IPaginationItemProps {
    currentPage: number;
    page: number;
    onClick: () => void;
    children: React.ReactNode;
    isActive: boolean;
    isDisabled: boolean;
};

const PaginationItem = ({ currentPage, page, onClick, children, isActive, isDisabled }: IPaginationItemProps) => {
    const className =
        `flex items-center justify-center px-3 h-8 leading-tight border
    ${isActive
            ? 'z-10 text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700'
            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
        }
    ${isDisabled
            ? 'hidden'
            : 'flex'
        }
    `;

    return (
        <li className={isActive ? 'active' : ''}>
            <Button
                aria-current={isActive ? "page" : undefined}
                className={className}
                id={`pagination-item-${page}`}
                onClick={onClick}
                type='button'
            >
                {children}
            </Button>
        </li>
    );
};

export default PaginationItem;
