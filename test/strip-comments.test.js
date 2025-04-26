const stripComments = require('../index');

describe('stripComments', () => {
  test('should remove basic comments', () => {
    const code = `
      // This is a single-line comment
      /* This is a multi-line comment */
      const x = 1; // inline comment
    `;
    const result = stripComments(code);
    const expected = `
      
      
      const x = 1; 
    `;
    expect(result).toBe(expected);
  });

  test('should replace comments with spaces', () => {
    const code = `
      // This is a single-line comment
      /* This is a multi-line comment */
      const x = 1; // inline comment
    `;
    const result = stripComments(code, { replaceWith: ' ' });
    const expected = `
                                      
                                        
      const x = 1;                  
    `;
    expect(result).toBe(expected);
  });

  test('should handle JSX comments', () => {
    const code = `
      // This is a regular comment
      <div>
        {/* This is a JSX comment */}
        <span>Hello</span>
      </div>
    `;
    const result = stripComments(code, { enableJsx: true });
    const expected = `
      
      <div>
        {}
        <span>Hello</span>
      </div>
    `;
    expect(result).toBe(expected);
  });

  test('should handle TypeScript comments', () => {
    const code = `
      // This is a regular comment
      interface User {
        name: string;
        age: number;
      }
    `;
    const result = stripComments(code, { enableTypescript: true });
    const expected = `
      
      interface User {
        name: string;
        age: number;
      }
    `;
    expect(result).toBe(expected);
  });

  test('should handle combined options', () => {
    const code = `
      // Regular comment
      interface Props {
        name: string;
      }
      const Component = (props: Props) => {
        return (
          <div>
            {/* JSX comment */}
            <span>{props.name}</span>
          </div>
        );
      };
    `;
    const result = stripComments(code, {
      enableJsx: true,
      enableTypescript: true,
      replaceWith: ' '
    });
    const expected = `
                        
      interface Props {
        name: string;
      }
      const Component = (props: Props) => {
        return (
          <div>
            {                 }
            <span>{props.name}</span>
          </div>
        );
      };
    `;
    expect(result).toBe(expected);
  });
}); 