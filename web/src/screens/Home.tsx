import * as React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { editors, utility } from '../configuration/Sections';
import { Column, Columns, ColumnSizes } from '../components';
import { ReactElement, ReactNode } from 'react';

interface HomeProps {
    history: string[];
}

export default function Home(props: HomeProps): ReactElement {
    return (
        <Columns>
            <Column />
            <Column size={ColumnSizes.HALF}>
                <h1>SamiSaleh.com</h1>
                <Columns>
                    <Column>
                        {editors.map(
                            (section): ReactNode => (
                                <Card
                                    key={section.title}
                                    interactive={true}
                                    elevation={Elevation.TWO}
                                    onClick={(): number => props.history.push(section.path)}
                                >
                                    <h3>{section.title}</h3>
                                    <p>{section.description}</p>
                                </Card>
                            ),
                        )}
                    </Column>
                    <Column>
                        {utility.map(
                            (section): ReactNode => (
                                <Card
                                    key={section.title}
                                    interactive={true}
                                    elevation={Elevation.TWO}
                                    onClick={(): number => props.history.push(section.path)}
                                >
                                    <h3>{section.title}</h3>
                                    <p>{section.description}</p>
                                </Card>
                            ),
                        )}
                    </Column>
                </Columns>
            </Column>
            <Column />
        </Columns>
    );
}
