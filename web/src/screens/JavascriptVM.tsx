import * as React from 'react';
import { Component } from 'react';
import AceEditor from 'react-ace';

// @ts-ignore
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { SiteContainer } from '../components/SiteContainer';

interface IState {
    data: string;
    result: string[] | null;
    error: boolean;
}

export default class JavascriptVM extends Component<{}, IState> {
    private currentData = `// executes a function and returns your value - WIP

const numbers = [4,1,2,3,4,1,5,6,1];

return [...new Set(numbers)]
              .sort((a,b) => a - b )
              .map(num => 'Mapped number ' + num)`;
    private oldConsole: any = console;

    state: IState = {
        data: this.currentData,
        result: ['Press control + enter to execute javascript code!'],
        error: false,
    };

    componentDidMount(): void {
        // @ts-ignore
        console = this.consoleHack;
    }

    componentWillUnmount(): void {
        console = this.oldConsole;
    }

    private consoleHack = {
        log: (value: string) => value,
        warn: (value: string) => value,
        error: (value: string) => value,
    };

    private checkExecute = (event: any) => {
        if (event.ctrlKey && event.key === 'Enter') {
            this.execute();
        }
    };

    private execute = () => {
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

    private onChange = (data: string) => {
        const newData = data.trim();
        if (newData !== this.state.data) {
            this.setState({ data: newData });
        }
    };

    render() {
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
                                    result.map(result => result && <li key={result}>{result.toString()}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </SiteContainer>
        );
    }
}
