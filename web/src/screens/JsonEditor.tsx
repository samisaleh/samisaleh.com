import * as React from 'react';
import { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/monokai';
import { Annotation } from 'react-ace/types';
import { Toaster, Popover, Menu, Button, Position, IToaster } from '@blueprintjs/core';
import { SiteContainer } from '../components/SiteContainer';

interface IState {
    data: string;
}

const toaster: IToaster = Toaster.create(
    {
        canEscapeKeyClear: true,
    },
    document.body,
);

export default class JsonEditor extends Component<{}, IState> {
    private currentData = '';
    private errors: Annotation[] = [];

    state: IState = {
        data: this.currentData,
    };

    private format = (pretty: boolean) => {
        if (this.errors.length !== 0) {
            toaster.show({
                message: this.errors
                    .map(error => {
                        return `${error.row}:${error.column} - ${error.text}`;
                    })
                    .join('\n'),
                intent: 'danger',
                timeout: 1000,
            });
        }
        try {
            const parsedData = JSON.parse(this.currentData);
            this.setState({
                data: JSON.stringify(parsedData, null, pretty ? 2 : 0),
            });
        } catch (err) {}
    };

    private validate = (annotations: Annotation[]) => {
        this.errors = annotations;
    };

    private prettyData = () => this.format(true);
    private minifyData = () => this.format(false);

    private onChange = (data: string) => {
        this.currentData = data;
    };

    private actionMenu = () => (
        <Popover
            content={
                <Menu>
                    <Menu.Item onClick={this.prettyData} text="Pretty print" />
                    <Menu.Item onClick={this.minifyData} text="Minify" />
                </Menu>
            }
            position={Position.RIGHT}
        >
            <Button intent={'primary'} text="Format JSON" />
        </Popover>
    );

    render() {
        return (
            <SiteContainer navActions={this.actionMenu()}>
                <div className={'editor--fullsize'}>
                    <AceEditor
                        mode="json"
                        theme="monokai"
                        onChange={this.onChange}
                        value={this.state.data}
                        fontSize={'18px'}
                        onValidate={this.validate}
                        width={'100%'}
                        height={'100%'}
                        editorProps={{ $blockScrolling: Infinity }}
                        wrapEnabled={true}
                    />
                </div>
            </SiteContainer>
        );
    }
}
