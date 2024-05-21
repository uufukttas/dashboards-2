import React from 'react';
import { Button } from '@projects/button';
import type { IPaginationItemProps } from '../types';

const PaginationItem = ({ children, isActive, isDisabled, pageNumber, onClick }: IPaginationItemProps) => {
    const className: string =
        `flex items-center justify-center px-3 h-8 leading-tight border ${
            isActive
                ? 'z-10 text-yellow-600 bg-yellow-50 border-yellow-300 hover:bg-yellow-100 hover:text-yellow-700'
                : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
        } ${
            isDisabled
                ? 'hidden'
                : 'flex'
        }`;

    return (
        <li className={isActive ? 'active' : ''}>
            <Button
                aria-current={isActive ? "page" : undefined}
                className={className}
                id={`pagination-item-${pageNumber}`}
                type='button'
                onClick={onClick}
            >
                {children}
            </Button>
        </li>
    );
};

export default PaginationItem;
