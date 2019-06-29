import * as React from 'react';
import { Component } from 'react';
import AceEditor from 'react-ace';

// @ts-ignore
import * as Markdown from 'markdown-to-jsx';
import '../styles/markdown.css';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import { SiteContainer } from '../components/SiteContainer';

interface IState {
    data: string;
}

export default class MarkdownEditor extends Component<{}, IState> {
    private currentData = `# Hello!

Type something **here** to get *started*!

1. list
  1. nested
- more stuff
- even \`more\` ~~things~~ stuff


\`\`\`
sample code block
\`\`\``;

    state: IState = {
        data: this.currentData,
    };

    private onChange = (data: string) => {
        const newData = data.trim();
        if (newData !== this.state.data) {
            this.setState({ data: newData });
        }
    };

    render() {
        return (
            <SiteContainer>
                <div className={'editor--split'}>
                    <div className="columns">
                        <div className="column">
                            <AceEditor
                                mode="markdown"
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
                        <div className="column markdown-body">{Markdown.compiler(this.state.data)}</div>
                    </div>
                </div>
            </SiteContainer>
        );
    }
}
