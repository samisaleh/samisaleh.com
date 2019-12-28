declare module '*.module.scss' {
    const content: { [className: string]: string };
    export = content;
}

declare module '*.png' {
    const content: string;
    export = content;
}

declare module '*.gltf' {
    const content: string;
    export = content;
}

declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': any;
    }
}
