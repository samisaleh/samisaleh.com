import * as React from 'react';
import { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/monokai';
import { Annotation } from 'react-ace/types';
import { Toaster, Popover, Menu, Button, Position, IToaster } from '@blueprintjs/core';
import { SiteContainer } from '../components/SiteContainer';
import { ReactNode } from 'react';

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

    private checkErrors = (): boolean => {
        if (this.errors.length !== 0 || !this.currentData) {
            const isEmpty = !this.currentData && 'Please enter some JSON!';
            toaster.show({
                message:
                    isEmpty ||
                    this.errors
                        .map(error => {
                            return `${error.row}:${error.column} - ${error.text}`;
                        })
                        .join('\n'),
                intent: 'danger',
                timeout: 1000,
            });
            return true;
        }
        return false;
    };

    private format = (pretty: boolean): void => {
        if (this.checkErrors()) return;
        try {
            const parsedData = JSON.parse(this.currentData);
            this.setState({
                data: JSON.stringify(parsedData, null, pretty ? 2 : 0),
            });
        } catch (err) {}
    };

    private validate = (annotations: Annotation[]): void => {
        this.errors = annotations;
    };

    private prettyData = (): void => this.format(true);
    private minifyData = (): void => this.format(false);

    private onChange = (data: string): void => {
        this.currentData = data;
    };

    private sortKeys = (data: any): object => {
        const newObj: any = {};
        const sortedKeys = Object.keys(data).sort((a, b) => {
            return a.localeCompare(b);
        });
        sortedKeys.forEach((key: string) => {
            if (typeof data[key] !== 'string' && typeof data[key] !== 'boolean') {
                if (Array.isArray(data[key])) {
                    newObj[key] = data[key].sort((a: string, b: string) => a.localeCompare(b));
                } else {
                    newObj[key] = this.sortKeys(data[key]);
                }
            } else {
                newObj[key] = data[key];
            }
        });
        return newObj;
    };

    private sortKeysRecursive = (): void => {
        if (this.checkErrors()) return;
        const data = JSON.parse(this.currentData);
        const sorted = this.sortKeys(data);
        this.setState({ data: JSON.stringify(sorted, null, 2) });
    };

    private actionMenu = (): ReactNode => (
        <Popover
            content={
                <Menu>
                    <Menu.Item onClick={this.minifyData} text="Minify" />
                    <Menu.Item onClick={this.prettyData} text="Pretty print" />
                    <Menu.Item onClick={this.sortKeysRecursive} text="Sort Keys" />
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
