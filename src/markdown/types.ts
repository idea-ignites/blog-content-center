export type MarkdownData = {
  markdownId: string;
  frontmatter?: Record<string, any>;
  rawContent: string;
  syntaxTreeJson?: string;
};
