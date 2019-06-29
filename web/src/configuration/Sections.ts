interface Section {
    title: string;
    path: string;
    description: string;
}

export const editors: Section[] = [
    {
        title: 'Markdown Editor',
        path: '/markdown-editor',
        description: 'A split view Markdown editor which will render content as you type',
    },
    {
        title: 'JSON Editor',
        path: '/json-editor',
        description: 'A simple JSON editor with minification and pretty options',
    },
];

export const utility: Section[] = [
    {
        title: 'Javascript Runner',
        path: '/js-runner',
        description: 'Test Javascript without having to open up the debugger',
    },
];

export const Sections: Section[] = [...editors, ...utility].sort((a, b): number => a.title.localeCompare(b.title));
