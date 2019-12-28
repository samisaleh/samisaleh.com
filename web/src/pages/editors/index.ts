import { PageDetails } from '../../interfaces';

export const editors: PageDetails[] = [
    {
        description: 'A split view Markdown editor which will render content as you type',
        icon: 'code',
        path: '/markdown-editor',
        title: 'Markdown Editor',
    },
    {
        description: 'A simple JSON editor with minification and pretty options',
        icon: 'code',
        path: '/json-editor',
        title: 'JSON Editor',
    },
];

export * from './MarkdownEditor';
export * from './JsonEditor';
