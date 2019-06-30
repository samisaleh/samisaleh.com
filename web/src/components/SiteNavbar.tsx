import * as React from 'react';
import { Classes, Navbar, Alignment, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Sections } from '../configuration/Sections';
import { ReactNode } from 'react';
import { ReactElement } from 'react';

interface SiteNavbarProps {
    navActions?: ReactNode;
}

export function SiteNavbar(props: SiteNavbarProps): ReactElement {
    return (
        <Navbar className={'site-navbar'}>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>
                    <Link style={{ textDecoration: 'none' }} to={'/'}>
                        SamiSaleh.com
                    </Link>
                </Navbar.Heading>

                <Navbar.Divider />
                {Sections.map(
                    (section): ReactElement => (
                        <Link style={{ textDecoration: 'none' }} key={section.path} to={section.path}>
                            <Button className={Classes.MINIMAL} intent={'warning'}>
                                {section.title}
                            </Button>
                        </Link>
                    ),
                )}

                {props.navActions}
            </Navbar.Group>
        </Navbar>
    );
}
