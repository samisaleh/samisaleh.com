import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MarkdownEditor, JsonEditor } from './pages/editors';
import { ReactElement } from 'react';
import { Home } from './pages/home';

export default function App(): ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/json-editor" component={JsonEditor} />
                <Route path="/markdown-editor" component={MarkdownEditor} />
            </Switch>
        </BrowserRouter>
    );
}
