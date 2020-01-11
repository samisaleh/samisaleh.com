import React, { ChangeEvent, FC, ReactElement, useState } from 'react';
import { SiteContainer } from '../../components';
import { Grid, Header, Segment, Form } from 'semantic-ui-react';

export const Ladder: FC = function(): ReactElement {
    const [total, setTotal] = useState(0);
    const calculateTotal = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        let limit = Number(value),
            total = 0;
        if (Number.isNaN(limit) || limit <= 0) {
            return setTotal(total);
        }
        limit++;
        while (limit--) {
            total += limit;
        }
        setTotal(total);
    };

    return (
        <SiteContainer>
            <Grid centered={true} stackable={true}>
                <Grid.Column width={8}>
                    <Segment basic={true}>
                        <Header as="h1">Ladder Calc</Header>
                        <Form.Input type="text" onChange={calculateTotal} />
                        Total: {total}
                    </Segment>
                </Grid.Column>
            </Grid>
        </SiteContainer>
    );
};
