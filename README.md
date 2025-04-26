# strip-js-comments

A lightweight library for removing or replacing comments from JavaScript code. Built with @babel/parser, it supports removing single-line comments, multi-line comments, and inline comments.

## Features

- Removes or replaces all types of JavaScript comments
- Supports JSX and TypeScript syntax
- Preserves code formatting (indentation, newlines, spaces)
- High performance

## Installation

```bash
npm install strip-js-comments
```


## Usage

```javascript
const stripComments = require('strip-js-comments');

// Basic usage - remove all comments
const code = `
  // This is a single-line comment
  /* This is a multi-line comment */
  const x = 1; // inline comment
`;
const result = stripComments(code);
```

Input:
```javascript
// This is a single-line comment
/* This is a multi-line comment */
const x = 1 /* value 1 */; // inline comment
```

Output:
```javascript


const x = 1 ; 
```

### Replace Comments with Spaces

```javascript
const result = stripComments(code, { replaceWith: ' ' });
```

Input:
```javascript
// This is a single-line comment
/* This is a multi-line comment */
const x = 1 /* value 1 */; // inline comment
```

Output:
```javascript
                                
                                  
const x = 1              ;                  
```

### Handle JSX Comments

```javascript
const jsxCode = `
  // This is a regular comment
  <div>
    {/* This is a JSX comment */}
    <span>Hello</span>
  </div>
`;
const result = stripComments(jsxCode, { enableJsx: true });
```

Input:
```javascript
// This is a regular comment
<div>
  {/* This is a JSX comment */}
  <span>Hello</span>
</div>
```

Output:
```javascript

<div>
  {}
  <span>Hello</span>
</div>
```

### Handle TypeScript Comments

```javascript
const tsCode = `
  // This is a regular comment
  interface User {
    name: string;
    age: number;
  }
`;
const result = stripComments(tsCode, { enableTypescript: true });
```

Input:
```javascript
// This is a regular comment
interface User {
  name: string;
  age: number;
}
```

Output:
```javascript

interface User {
  name: string;
  age: number;
}
```

## API

### stripComments(code, options)

Removes or replaces comments from JavaScript code.

#### Parameters

- `code` (string): JavaScript code to process
- `options` (object): Optional configuration
  - `replaceWith` (string): Character to replace comments with, defaults to empty string (removes comments completely)
  - `enableJsx` (boolean): Whether to enable JSX support, defaults to false
  - `enableTypescript` (boolean): Whether to enable TypeScript support, defaults to false

#### Returns

- (string): Processed code

## License

MIT 