import React, { ChangeEvent, FC, ReactElement, useState } from 'react';
import { SiteContainer } from '../../components';
import { Grid, Header, Segment, Form } from 'semantic-ui-react';

export const Ladder: FC = function(): ReactElement {
    const [total, setTotal] = useState('0');

    const calculateTotal = (event: ChangeEvent<HTMLInputElement>): void => {
        const MAX_CALC_LENGTH = 7;
        const { value } = event.target;
        let limit = parseInt(value, 10),
            newTotal = 0;

        if (value.trim() === '' || limit === 0) {
            return setTotal('0');
        }

        const isUnsafe = Number.isNaN(limit) || limit <= 0 || Number(limit).toString().length > MAX_CALC_LENGTH;

        if (isUnsafe) {
            return setTotal(`We aren't going to allow that...`);
        }
        limit++;
        while (limit--) {
            newTotal += limit;
        }
        setTotal(String(newTotal));
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
