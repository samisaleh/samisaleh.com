import * as React from 'react';
import { SiteNavbar } from './SiteNavbar';
import { ReactNode } from 'react';

interface SiteContainerProps {
    children: ReactNode;
    navActions?: ReactNode;
}

export const SiteContainer = (props: SiteContainerProps) => {
    return (
        <div className={'site-container'}>
            <SiteNavbar navActions={props.navActions} />
            {props.children}
        </div>
    );
};
