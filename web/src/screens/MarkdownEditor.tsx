import * as React from 'react';
import { Component, ReactNode } from 'react';
import AceEditor from 'react-ace';

import * as Markdown from 'markdown-to-jsx';
import '../styles/markdown.css';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import { SiteContainer } from '../components/SiteContainer';
import { markdownSample } from '../snippets';

interface MarkdownEditorState {
    data: string;
}

export default class MarkdownEditor extends Component<{}, MarkdownEditorState> {
    public state: MarkdownEditorState = {
        data: markdownSample,
    };

    public render(): ReactNode {
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

    private onChange = (data: string): void => {
        const newData = data.trim();
        if (newData !== this.state.data) {
            this.setState({ data: newData });
        }
    };
}
