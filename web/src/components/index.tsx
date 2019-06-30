import * as React from 'react';
import { ReactElement, ReactNode } from 'react';

interface ColumnsProps {
    children: ReactNode;
}

export function Columns(props: ColumnsProps): ReactElement {
    return <div className="columns">{props.children}</div>;
}

export enum ColumnSizes {
    THREE_QUARTERS = 'is-three-quarters',
    TWO_THIRDS = 'is-two-thirds',
    HALF = 'is-half',
    ONE_THIRD = 'is-one-third',
    ONE_QUARTER = 'is-one-quarter',
    FULL = 'is_full',
}

interface ColumnProps {
    children?: ReactNode;
    size?: ColumnSizes;
}

export function Column(props: ColumnProps): ReactElement {
    return <div className={`column ${props.size || ''}`.trim()}>{props.children}</div>;
}
