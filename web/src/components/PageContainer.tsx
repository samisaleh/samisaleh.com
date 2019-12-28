import React, { FC, ReactElement, ReactNode } from 'react';
import { PageNavbar } from './PageNavbar';

interface SiteContainerProps {
    children: ReactNode;
    navActions?: ReactNode;
    withNavSpacer?: boolean;
}

export const PageContainer: FC<SiteContainerProps> = function({
    children,
    navActions,
    withNavSpacer = true,
}: SiteContainerProps): ReactElement {
    return (
        <div className={'page-container'}>
            <PageNavbar navActions={navActions} />
            {withNavSpacer && <div className={'nav-spacer'} />}
            {children}
        </div>
    );
};
