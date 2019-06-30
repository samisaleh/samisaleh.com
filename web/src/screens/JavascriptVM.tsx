import * as React from 'react';
import { Component, KeyboardEvent, ReactNode } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { SiteContainer } from '../components/SiteContainer';
import { javascriptSample } from '../snippets';

interface JavascriptVMState {
    data: string;
    result: string[] | null;
    error: boolean;
}

export default class JavascriptVM extends Component<{}, JavascriptVMState> {
    public state: JavascriptVMState = {
        data: javascriptSample,
        result: ['Press control + enter to execute javascript code!'],
        error: false,
    };

    private oldConsole = console;

    private consoleHack = {
        log: (value: string): string => value,
        warn: (value: string): string => value,
        error: (value: string): string => value,
    };

    public componentDidMount(): void {
        (console as unknown) = this.consoleHack;
    }

    public componentWillUnmount(): void {
        console = this.oldConsole;
    }

    public render(): ReactNode {
        const { error, result } = this.state;
        return (
            <SiteContainer>
                <div onKeyDown={this.checkExecute} className={'editor--split'}>
                    <div className="columns">
                        <div className="column">
                            <AceEditor
                                mode="javascript"
                                theme="monokai"
                                onChange={this.onChange}
                                value={this.state.data}
                                fontSize={'18px'}
                                width={'100%'}
                                height={'100%'}
                                editorProps={{ $blockScrolling: Infinity }}
                                wrapEnabled={true}
                            />
                        </div>
                        <div className="column js-output">
                            <ul className={error ? 'js-error' : ''}>
                                {result &&
                                    result.map &&
                                    result.map(
                                        (result): ReactNode => result && <li key={result}>{result.toString()}</li>,
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
            </SiteContainer>
        );
    }

    private checkExecute = (event: KeyboardEvent): void => {
        if (event.ctrlKey && event.key === 'Enter') {
            this.execute();
        }
    };

    private execute = (): void => {
        try {
            let result = Function('"use strict";' + this.state.data)();
            result = typeof result === 'object' ? result : [result];
            this.setState({
                result,
                error: false,
            });
        } catch (err) {
            this.setState({
                result: [err.message],
                error: true,
            });
        }
    };

    private onChange = (data: string): void => {
        const newData = data.trim();
        if (newData !== this.state.data) {
            this.setState({ data: newData });
        }
    };
}
