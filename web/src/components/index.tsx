import * as React from 'react';
import { ReactNode } from 'react';

interface ColumnsProps {
    children: ReactNode;
}

export function Columns(props: ColumnsProps) {
    return <div className="columns">{props.children}</div>;
}

export const ColumnSizes = {
    THREE_QUARTERS: 'is-three-quarters',
    TWO_THIRDS: 'is-two-thirds',
    HALF: 'is-half',
    ONE_THIRD: 'is-one-third',
    ONE_QUARTER: 'is-one-quarter',
    FULL: 'is_full',
};

type ColumnSizes = typeof ColumnSizes[keyof typeof ColumnSizes];

interface ColumnProps {
    children?: ReactNode;
    size?: ColumnSizes;
}

export function Column(props: ColumnProps) {
    return <div className={`column ${props.size || ''}`.trim()}>{props.children}</div>;
}
