import React, { FC, ReactElement, ReactNode, useState } from 'react';
import { DesktopNavbar } from './DesktopNavbar';
import { Responsive, Sidebar } from 'semantic-ui-react';
import { MobileNav, sidebarForMobile } from './MobileNavbar';

interface SiteContainerProps {
    children: ReactNode;
    navActions?: ReactNode;
}

const DesktopContainer: FC<SiteContainerProps> = function({ children, navActions }: SiteContainerProps): ReactElement {
    return (
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <DesktopNavbar navActions={navActions} />
            {children}
        </Responsive>
    );
};

const MobileContainer: FC<SiteContainerProps> = function({ children, navActions }: SiteContainerProps): ReactElement {
    const [visible = false, setVisible] = useState();
    const sidebarHandler = (isOpen = true): void => {
        setVisible(isOpen);
    };
    return (
        <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyMobile.maxWidth}>
            {sidebarForMobile(visible, sidebarHandler)}
            <MobileNav actions={navActions} sidebarHandler={sidebarHandler} />
            {children}
        </Responsive>
    );
};

export const SiteContainer: FC<SiteContainerProps> = function(props: SiteContainerProps): ReactElement {
    const { children } = props;
    return (
        <>
            <DesktopContainer {...props}>{children}</DesktopContainer>
            <MobileContainer {...props}>{children}</MobileContainer>
        </>
    );
};
