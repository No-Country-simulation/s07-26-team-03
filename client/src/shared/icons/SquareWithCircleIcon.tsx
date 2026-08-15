import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const SquareWithCircleIcon: React.FC<IconProps> = ({ className, ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M7 10 V7 H10" />
            <path d="M14 7 H17 V10" />
            <path d="M17 14 V17 H14" />
            <path d="M10 17 H7 V14" />
        </svg>
    );
};