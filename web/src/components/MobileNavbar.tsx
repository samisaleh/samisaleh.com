import React, { FC } from 'react';
import { ReactNode } from 'react';
import { ReactElement } from 'react';
import styles from '../styles/SiteNavBar.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Menu, MenuItemProps, Sidebar, SidebarProps } from 'semantic-ui-react';
import { pageGroups } from '../pages';

interface MobileNavProps {
    actions?: ReactNode;
    sidebarHandler: (isOpen: boolean) => void;
}

export const sidebarForMobile = function(visible: boolean, mobileHandler: (isOpen: boolean) => void): ReactElement {
    const history = useHistory();
    const isActive = (path: string): boolean => history.location.pathname === path;
    const clickHandler = (event: React.MouseEvent<HTMLElement>, data: SidebarProps | MenuItemProps): void => {
        const routerPath = data && data['data-router-path'];
        if (routerPath && !data.active) {
            history.push(routerPath);
        }
        mobileHandler(false);
    };
    return (
        <Sidebar as={Menu} animation={'push'} onHide={clickHandler} vertical={true} visible={Boolean(visible)}>
            {pageGroups()
                .sort()
                .map(pageGroup => (
                    <Menu.Item key={pageGroup.title}>
                        <Menu.Header>{pageGroup.title}</Menu.Header>
                        <Menu.Menu>
                            {pageGroup.pages.map(page => (
                                <Menu.Item
                                    key={page.title}
                                    name={page.title}
                                    data-router-path={page.path}
                                    active={isActive(page.path)}
                                    onClick={clickHandler}
                                />
                            ))}
                        </Menu.Menu>
                    </Menu.Item>
                ))}
        </Sidebar>
    );
};

export const MobileNav: FC<MobileNavProps> = function({ sidebarHandler, actions }: MobileNavProps): ReactElement {
    return (
        <div className={styles.siteNavBar}>
            <div className={styles.item}>
                <Icon color={'purple'} name="sidebar" onClick={sidebarHandler} />
            </div>
            <div className={styles.item}>
                <Link className={'site-branding'} to={'/'}>
                    Sami Saleh
                </Link>
            </div>
            <div className={styles.item}>{actions}</div>
        </div>
    );
};
