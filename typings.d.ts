declare module '*.hbs?raw' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    const content: any;
    export default content;
}
