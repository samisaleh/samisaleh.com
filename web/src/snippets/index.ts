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

export const javascriptSample = trimmer(`
// executes a function and returns your value - WIP

const numbers = [4,1,2,3,4,1,5,6,1];

return [...new Set(numbers)]
              .sort((a,b) => a - b )
              .map(num => 'Mapped number ' + num)
`);
