import React, { ReactElement } from 'react';
import { Header, Item, Container, Icon, Grid } from 'semantic-ui-react';

import styles from '../../styles/Home.module.scss';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { editors } from '../editors';
import { Link } from 'react-router-dom';
import { sketchPages } from '../simple-sketch';

const availableColors: SemanticCOLORS[] = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
];

const randomFill = function(): SemanticCOLORS {
    return availableColors[Math.floor(Math.random() * availableColors.length)];
};

export const Home = function(): ReactElement {
    const availablePages = [...editors, ...sketchPages];
    const itemsSet = availablePages.map(page => ({
        content: (
            <Item.Content verticalAlign={'middle'}>
                <Item.Header as={'h1'}>
                    <Link to={page.path}>{page.title}</Link>
                </Item.Header>
                <Item.Description>{page.description}</Item.Description>
            </Item.Content>
        ),
        image: <Icon bordered inverted color={randomFill()} name={page.icon} size={'huge'} />,
    }));

    const itemsSet2 = itemsSet.splice(Math.ceil(itemsSet.length / 2));

    return (
        <div>
            <div className={styles.homeBanner}>
                <Container>
                    <Header inverted={true} as={'h1'}>
                        SamiSaleh.com
                    </Header>
                </Container>
            </div>
            <Container>
                <Grid stackable={true} textAlign={'center'} centered={true} columns={2}>
                    <Grid.Column>
                        <Item.Group className={styles.homeItem} relaxed={true} items={itemsSet} />
                    </Grid.Column>
                    <Grid.Column>
                        <Item.Group className={styles.homeItem} relaxed={true} items={itemsSet2} />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
};
