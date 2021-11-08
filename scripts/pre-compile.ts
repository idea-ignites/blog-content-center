/**
 * 该脚本读取 src/data/markdowns 下每一个目录的 markdown 文件，解析成语法树，
 * 然后将语法树序列化(JSON), 存在旁边。
 */

import { resolve } from 'path';
import { readdir, readFile, writeFile } from 'fs/promises';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import matter from 'gray-matter';
import { Node } from 'unist';

const dataPath = resolve('src/data');
const markdownPathName = 'markdowns';
const markdownsPath = resolve(dataPath, markdownPathName);

async function main() {
  const entries = await readdir(markdownsPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const entryName = entry.name;
      const markdownFileName = entryName + '.md';
      const fullMarkdownPath = resolve(
        markdownsPath,
        entryName,
        markdownFileName,
      );

      const markdownContent = await readFile(fullMarkdownPath, {
        encoding: 'utf-8',
      });

      const grayMatter = matter(markdownContent);

      const frontMatterData = grayMatter.data;
      const frontMatterFullPath = resolve(
        markdownsPath,
        entryName,
        `${entryName}.frontmatter.json`,
      );

      // 存储 frontmatter
      await writeFile(frontMatterFullPath, JSON.stringify(frontMatterData));

      const purifiedMarkdownContent = grayMatter.content.trim();
      const markdownTree = unified()
        .use(remarkParse)
        .parse(purifiedMarkdownContent);

      // 将所有引用的本地资源替换
      await replaceUrl(entryName, markdownTree);

      const markdownTreeFullPath = resolve(
        markdownsPath,
        entryName,
        `${entryName}.syntaxtree.json`,
      );

      // 存储 AST
      await writeFile(markdownTreeFullPath, JSON.stringify(markdownTree));
    }
  }
}

async function replaceUrl(basePathName: string, root: Node) {
  const markdownResourcesIndexFullPath = resolve(
    dataPath,
    markdownPathName + '.index.json',
  );

  try {
    const resourceIndexJSON = await readFile(markdownResourcesIndexFullPath, {
      encoding: 'utf-8',
    });

    const resourceIndex = JSON.parse(resourceIndexJSON) as {
      _fileNameToId: Record<string, string>;
      _idToFileName: Record<string, string>;
    };

    const unTraversedNodes: Node[] = new Array<Node>();
    unTraversedNodes.push(root);

    while (unTraversedNodes.length) {
      const node = unTraversedNodes.pop() as Node;
      if (
        node.hasOwnProperty('children') &&
        (node as any).children instanceof Array
      ) {
        const children = ((node as any).children as Array<Node>).slice();
        while (children.length) {
          unTraversedNodes.push(children.pop() as Node);
        }
      }

      if (node.hasOwnProperty('url') && typeof (node as any).url === 'string') {
        const url = basePathName + '/' + (node as any).url;

        if (
          resourceIndex._fileNameToId &&
          typeof resourceIndex._fileNameToId[url] === 'string'
        ) {
          const resourceId = resourceIndex._fileNameToId[url];
          (node as any)['url'] = `/api/v1/resources?id=${resourceId}`;
          // console.log({ url, resourceId });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

main();
