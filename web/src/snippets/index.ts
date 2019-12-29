const trimmer = (sample: string): string => sample.replace(/^\s*[\r\n]/g, '');

export const jsonSample = trimmer(`
{
  "use": "the formatter above!",
  "this": true,
  "nums": [3,1,2,4],
  "is": {
    "notInOrder": true,
    "inOrder": false
  },
  "someStuff": [{
    "zebra": false,
    "nested": true
  }]
}
`);

export const markdownSample = trimmer(`
# Hello!

Type something **here** to get *started*!

1. list
  1. nested
- more stuff
- even \`more\` ~~things~~ stuff


\`\`\`
sample code block
\`\`\`
`);
