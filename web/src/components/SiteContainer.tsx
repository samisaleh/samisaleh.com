import * as React from 'react';
import { SiteNavbar } from './SiteNavbar';
import { ReactElement, ReactNode } from 'react';

interface SiteContainerProps {
    children: ReactNode;
    navActions?: ReactNode;
}

export const SiteContainer = (props: SiteContainerProps): ReactElement => {
    return (
        <div className={'site-container'}>
            <SiteNavbar navActions={props.navActions} />
            {props.children}
        </div>
    );
};
