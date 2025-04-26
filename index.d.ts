declare module 'strip-js-comments' {
  interface StripCommentsOptions {
    /**
     * Character to replace comments with, defaults to empty string (removes comments completely)
     */
    replaceWith?: string;
    /**
     * Whether to enable JSX support, defaults to false
     */
    enableJsx?: boolean;
    /**
     * Whether to enable TypeScript support, defaults to false
     */
    enableTypescript?: boolean;
  }

  /**
   * Removes or replaces comments from JavaScript code.
   * @param code JavaScript code to process
   * @param options Optional configuration
   * @returns Processed code
   */
  function stripComments(code: string, options?: StripCommentsOptions): string;

  export = stripComments;
} 