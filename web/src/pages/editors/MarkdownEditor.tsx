import * as React from 'react';
import { Component, ReactNode } from 'react';
import AceEditor from 'react-ace';

import * as Markdown from 'markdown-to-jsx';
import '../../styles/markdown.css';
import styles from '../../styles/Editor.module.scss';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-monokai';
import { markdownSample } from '../../snippets';
import { SiteNavbar } from '../../components/SiteNavbar';

interface MarkdownEditorState {
    data: string;
}

export class MarkdownEditor extends Component<{}, MarkdownEditorState> {
    public state: MarkdownEditorState = {
        data: markdownSample,
    };

    public render(): ReactNode {
        return (
            <>
                <SiteNavbar />
                <div className={styles.editor}>
                    <div className={styles.col50}>
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
                    <div className={styles.col50}>{Markdown.compiler(this.state.data)}</div>
                </div>
            </>
        );
    }

    private onChange = (data: string): void => {
        const newData = data.trim();
        if (newData !== this.state.data) {
            this.setState({ data: newData });
        }
    };
}
