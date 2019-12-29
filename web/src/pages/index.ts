import { PageDetails, PageRedirects } from '../interfaces';
import { editorPages } from './editors';
import { designPages } from './designs';

interface PageGroup {
    pages: PageDetails[];
    redirects?: PageRedirects[];
    title: string;
}

export const pageGroups = function(withComponent = false): PageGroup[] {
    const filterPages = function(pages: PageDetails[]): PageDetails[] {
        if (withComponent) return pages;
        return pages.map(({ description, icon, path, title }) => ({ description, icon, path, title }));
    };

    return [
        {
            pages: filterPages(designPages),
            redirects: [
                {
                    from: '/shop-shelves',
                    to: '/designs/shop-shelves',
                },
            ],
            title: 'Designs',
        },
        {
            pages: filterPages(editorPages),
            redirects: [
                {
                    from: '/json-editor',
                    to: '/editors/json',
                },
                {
                    from: '/markdown-editor',
                    to: '/editors/markdown',
                },
            ],
            title: 'Editors',
        },
    ];
};
