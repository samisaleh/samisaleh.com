import * as React from 'react';
import { ReactNode } from 'react';
import { ReactElement } from 'react';
import styles from '../styles/SiteNavBar.module.scss';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { editors } from '../pages/editors';
import { useHistory } from 'react-router-dom';

interface SiteNavbarProps {
    navActions?: ReactNode;
}

export function SiteNavbar(props: SiteNavbarProps): ReactElement {
    let history = useHistory();

    const editorLinks = editors.map(editor => (
        <Dropdown.Item key={editor.title} text={editor.title} onClick={() => history.push(editor.path)} />
    ));
    return (
        <div className={styles.siteNavBar}>
            <div className={styles.item}>
                <Link to={'/'}>SamiSaleh.com</Link>
            </div>
            <div className={styles.item}>
                <Dropdown text="Editors">
                    <Dropdown.Menu>{editorLinks}</Dropdown.Menu>
                </Dropdown>
            </div>
            <div className={styles.item}>{props.navActions}</div>
        </div>
    );
}
