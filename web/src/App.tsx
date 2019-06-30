import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import JsonEditor from './screens/JsonEditor';
import MarkdownEditor from './screens/MarkdownEditor';
import JavascriptVM from './screens/JavascriptVM';
import { ReactElement } from 'react';

export default function App(): ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/json-editor" component={JsonEditor} />
                <Route path="/js-runner" component={JavascriptVM} />
                <Route path="/markdown-editor" component={MarkdownEditor} />
            </Switch>
        </BrowserRouter>
    );
}
