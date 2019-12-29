import React, { ReactElement } from 'react';
import { Header, Item, Container, Icon, Grid, Label, Segment } from 'semantic-ui-react';
import styles from '../../styles/Home.module.scss';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { Link } from 'react-router-dom';
import { pageGroups } from '../index';
import { flatDeep } from '../../util';

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

const pageGroupToItems = function(): ReactElement[][] {
    return flatDeep(
        pageGroups().map(({ pages, title }) =>
            pages.map(page => (
                <Item key={page.title + '-' + title}>
                    <Item.Image>
                        <Icon key={page.title} bordered inverted color={randomFill()} name={page.icon} size={'huge'} />
                    </Item.Image>
                    <Item.Content>
                        <Item.Header as={'h1'}>
                            <Link to={page.path}>{page.title}</Link>
                        </Item.Header>
                        <Item.Description>{page.description}</Item.Description>
                        <Item.Extra>
                            <Label color={'purple'}>{title}</Label>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            )),
        ),
    );
};

export const Home = function(): ReactElement {
    const itemsSet = pageGroupToItems();
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
                <Segment basic={true}>
                    <Grid stackable={true} textAlign={'center'} centered={true} columns={2}>
                        <Grid.Column>
                            <Item.Group className={styles.homeItem}>{itemsSet}</Item.Group>
                        </Grid.Column>
                        <Grid.Column>
                            <Item.Group className={styles.homeItem}>{itemsSet2}</Item.Group>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        </div>
    );
};
