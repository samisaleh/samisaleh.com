import React from 'react';
import { ReactNode } from 'react';
import { ReactElement } from 'react';
import styles from '../styles/SiteNavBar.module.scss';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { pageGroups } from '../pages';

interface DesktopNavbarProps {
    navActions?: ReactNode;
}

export function DesktopNavbar({ navActions }: DesktopNavbarProps): ReactElement {
    const history = useHistory();

    return (
        <div className={styles.siteNavBar}>
            <div className={styles.item}>
                <Link className={'site-branding'} to={'/'}>
                    Sami Saleh
                </Link>
            </div>
            {pageGroups().map(pageGroup => (
                <div key={pageGroup.title} className={styles.item}>
                    <Dropdown text={pageGroup.title}>
                        <Dropdown.Menu>
                            {pageGroup.pages.map(sketchPage => (
                                <Dropdown.Item
                                    key={sketchPage.title}
                                    text={sketchPage.title}
                                    onClick={(): void => history.push(sketchPage.path)}
                                />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ))}
            <div className={styles.item}>{navActions}</div>
        </div>
    );
}
