import React from 'react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { RouteComponentProps } from 'react-router';

export interface PageDetails {
    component?: React.ComponentType<RouteComponentProps> | React.ComponentType;
    description: string;
    icon: SemanticICONS;
    path: string;
    title: string;
}

export interface PageRedirects {
    from: string;
    to: string;
}
