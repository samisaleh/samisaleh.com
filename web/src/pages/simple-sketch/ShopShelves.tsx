import React, { FC, ReactElement } from 'react';
import { ModelViewerModal, PageContainer } from '../../components';
import shopShelves from '../../sketch-models/shop-shelves.gltf';
import { Grid, Image, Header, Item } from 'semantic-ui-react';
import shelfImage from '../../img/shop-shelves-measurements.png';

export const ShopShelves: FC = function(): ReactElement {
    return (
        <PageContainer>
            <Grid centered={true} stackable={true}>
                <Grid.Column width={8}>
                    <Header as="h1">Shop Shelves</Header>
                    <Item.Group>
                        <Item>
                            <Item.Image as="a" href={shelfImage} size={'large'} src={shelfImage} />
                            <Item.Content>
                                <Item.Description>
                                    <p>
                                        Basic design made up of 1 1/2&quot; legs/rails with 5 1/4&quot; slats for
                                        shelves. Materials could be mixed or stained 2 different colors for a unique
                                        design!
                                    </p>
                                    <ModelViewerModal
                                        model={shopShelves}
                                        openText={'View Model'}
                                        title={'Shop Shelves'}
                                    />
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
        </PageContainer>
    );
};
