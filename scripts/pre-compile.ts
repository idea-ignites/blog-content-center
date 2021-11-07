/**
 * 该脚本读取 src/markdowns 下每一个目录的 markdown 文件，解析成语法树，
 * 然后将语法树序列化(JSON), 存在旁边。
 */

import { resolve } from 'path';
import { readdir, readFile, writeFile } from 'fs/promises';
import { Dirent } from 'fs';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import matter from 'gray-matter';

const markdownsPath = resolve('src/data/markdowns');

readdir(markdownsPath, { withFileTypes: true }).then((entries) => {
  for (const entry of entries) {
    if (entry instanceof Dirent && entry.isDirectory()) {
      const entryName = entry.name;
      const markdownFileName = entryName + '.md';
      const fullMarkdownPath = resolve(
        markdownsPath,
        entryName,
        markdownFileName,
      );

      readFile(fullMarkdownPath, { encoding: 'utf-8' }).then(
        (markdownContent) => {
          const grayMatter = matter(markdownContent);

          const frontMatterData = grayMatter.data;
          const frontMatterFullPath = resolve(
            markdownsPath,
            entryName,
            `${entryName}.frontmatter.json`,
          );

          writeFile(frontMatterFullPath, JSON.stringify(frontMatterData));

          const purifiedMarkdownContent = grayMatter.content.trim();
          const markdownTree = unified()
            .use(remarkParse)
            .parse(purifiedMarkdownContent);
          const markdownTreeFullPath = resolve(
            markdownsPath,
            entryName,
            `${entryName}.syntaxtree.json`,
          );

          writeFile(markdownTreeFullPath, JSON.stringify(markdownTree));
        },
      );
    }
  }
});
