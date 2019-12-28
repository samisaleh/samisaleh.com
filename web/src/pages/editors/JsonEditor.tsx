import React from 'react';
import { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/monokai';
import 'brace/ext/searchbox';
import { Annotation } from 'react-ace/types';
import { ReactNode } from 'react';
import { jsonSample } from '../../snippets';
import { SiteNavbar } from '../../components/SiteNavbar';
import { Button, Dropdown } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import styles from '../../styles/Editor.module.scss';

interface JsonEditorState {
    data: string;
}

const tabWidth = 4;
const ZERO = 0;

export class JsonEditor extends Component<{}, JsonEditorState> {
    public state: JsonEditorState = {
        data: jsonSample,
    };

    private currentData = jsonSample;
    private errors: Annotation[] = [];

    public render(): ReactNode {
        return (
            <>
                <SemanticToastContainer position={'top-center'} />
                <SiteNavbar navActions={this.actionMenu()} />
                <div className={styles.editor}>
                    <AceEditor
                        name={'json-editor'}
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
            </>
        );
    }

    private checkErrors = (): boolean => {
        if (this.errors.length !== ZERO || !this.currentData) {
            const isEmpty = !this.currentData && 'Please enter some JSON!';
            toast({
                description:
                    isEmpty ||
                    this.errors
                        .map((error): string => {
                            return `${error.row}:${error.column} - ${error.text}`;
                        })
                        .join('\n'),
                time: 2000,
                title: 'Error',
                type: 'error',
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
                data: JSON.stringify(parsedData, null, pretty ? tabWidth : ZERO),
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
        const sortedKeys = Object.keys(data).sort((a, b): number => {
            return a.localeCompare(b);
        });
        sortedKeys.forEach((key: string): void => {
            if (typeof data[key] !== 'string' && typeof data[key] !== 'boolean' && data[key] !== null) {
                if (Array.isArray(data[key])) {
                    if (typeof data[key][ZERO] === 'object') {
                        data[key].forEach((chunk: object): object => (newObj[key] = this.sortKeys(chunk)));
                    } else {
                        newObj[key] = data[key].sort((a: string | number, b: string | number):
                            | number
                            | string
                            | undefined => {
                            if (typeof a === 'string' && typeof b === 'string') {
                                return a.localeCompare(b);
                            } else if (typeof a === 'number' && typeof b === 'number') {
                                return a - b;
                            }
                        });
                    }
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
        this.setState({ data: JSON.stringify(sorted, null, tabWidth) });
    };

    private actionMenu = (): ReactNode => (
        <Button.Group color="pink">
            <Dropdown
                className={'button'}
                text={'Actions'}
                options={[
                    { key: 'minify', text: 'Minify', value: 'minify', onClick: this.minifyData },
                    { key: 'pretty', text: 'Pretty print', value: 'pretty', onClick: this.prettyData },
                    { key: 'sort-keys', text: 'Sort keys', value: 'sort-keys', onClick: this.sortKeysRecursive },
                ]}
            />
        </Button.Group>
    );
}
