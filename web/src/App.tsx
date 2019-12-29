import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ReactElement } from 'react';
import { Home } from './pages/home';
import { pageGroups } from './pages';

export default function App(): ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                {pageGroups(true).map(({ pages, redirects = [] }) => {
                    return [
                        ...redirects.map(({ from, to }) => <Redirect key={`${from}-${to}`} from={from} to={to} />),
                        ...pages.map(page => <Route key={page.path} path={page.path} component={page.component} />),
                    ];
                })}
                <Route component={Home} />
            </Switch>
        </BrowserRouter>
    );
}
