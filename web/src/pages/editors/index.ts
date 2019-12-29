import { PageDetails } from '../../interfaces';
import { MarkdownEditor } from './MarkdownEditor';
import { JsonEditor } from './JsonEditor';

export const editorPages: PageDetails[] = [
    {
        component: MarkdownEditor,
        description: 'A split view Markdown editor which will render content as you type',
        icon: 'code',
        path: '/editors/markdown',
        title: 'Markdown',
    },
    {
        component: JsonEditor,
        description: 'A simple JSON editor with minification and pretty options',
        icon: 'code',
        path: '/editors/json',
        title: 'JSON',
    },
];

export * from './MarkdownEditor';
export * from './JsonEditor';
