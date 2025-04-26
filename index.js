const parser = require('@babel/parser');

/**
 * Options for comment processing
 * @typedef {Object} Options
 * @property {string} [replaceWith=''] - Character to replace comments with. If empty string, comments will be removed.
 * @property {boolean} [enableJsx=false] - Whether to enable JSX support
 * @property {boolean} [enableTypescript=false] - Whether to enable TypeScript support
 */

/**
 * Remove or replace comments from JavaScript code
 * @param {string} code - JavaScript code to process
 * @param {Options} [options={}] - Processing options
 * @returns {string} - Processed code
 */
function stripComments(code, options = {}) {
    const { replaceWith = '', enableJsx = false, enableTypescript = false } = options;

    const plugins = [];
    if (enableJsx) {
        plugins.push('jsx');
    }
    if (enableTypescript) {
        plugins.push('typescript');
    }

    // Parse code to AST
    const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: plugins,
        createParenthesizedExpressions: true,
        attachComment: true
    });

    // Get all comment positions
    const comments = ast.comments || [];

    // Sort comments by position (from end to start)
    comments.sort((a, b) => b.start - a.start);

    // Process comments
    let result = code;
    for (const comment of comments) {
        const commentLength = comment.end - comment.start;
        const replacement = replaceWith.repeat(commentLength);
        result = result.slice(0, comment.start) + replacement + result.slice(comment.end);
    }

    return result;
}

module.exports = stripComments; 