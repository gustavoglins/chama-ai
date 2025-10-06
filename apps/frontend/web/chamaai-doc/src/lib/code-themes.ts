// Temas customizados para o syntax highlighter
/* eslint-disable @typescript-eslint/no-explicit-any */

export const customLightTheme: Record<string, any> = {
  'code[class*="language-"]': {
    color: '#24292e',
    background: 'none',
    fontFamily:
      'JetBrains Mono, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '1em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '2',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#24292e',
    background: '#f6f8fa',
    fontFamily:
      'JetBrains Mono, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '1em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '2',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
  },
  comment: {
    color: '#6a737d',
    fontStyle: 'italic',
  },
  prolog: {
    color: '#6a737d',
  },
  doctype: {
    color: '#6a737d',
  },
  cdata: {
    color: '#6a737d',
  },
  punctuation: {
    color: '#24292e',
  },
  property: {
    color: '#005cc5',
  },
  tag: {
    color: '#22863a',
  },
  boolean: {
    color: '#005cc5',
  },
  number: {
    color: '#005cc5',
  },
  constant: {
    color: '#005cc5',
  },
  symbol: {
    color: '#005cc5',
  },
  deleted: {
    color: '#b31d28',
  },
  selector: {
    color: '#6f42c1',
  },
  'attr-name': {
    color: '#6f42c1',
  },
  string: {
    color: '#032f62',
  },
  char: {
    color: '#032f62',
  },
  builtin: {
    color: '#005cc5',
  },
  inserted: {
    color: '#22863a',
  },
  operator: {
    color: '#d73a49',
  },
  entity: {
    color: '#6f42c1',
    cursor: 'help',
  },
  url: {
    color: '#032f62',
  },
  '.language-css .token.string': {
    color: '#032f62',
  },
  '.style .token.string': {
    color: '#032f62',
  },
  variable: {
    color: '#e36209',
  },
  atrule: {
    color: '#d73a49',
  },
  'attr-value': {
    color: '#032f62',
  },
  function: {
    color: '#6f42c1',
  },
  keyword: {
    color: '#d73a49',
  },
  regex: {
    color: '#032f62',
  },
  important: {
    color: '#d73a49',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
};

export const customDarkTheme: Record<string, any> = {
  'code[class*="language-"]': {
    color: '#e1e4e8',
    background: 'none',
    fontFamily:
      'JetBrains Mono, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '1em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.65',
    tabSize: '4',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#e1e4e8',
    background: '#1e1e1e',
    fontFamily:
      'JetBrains Mono, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '1em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.65',
    tabSize: '4',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
  },
  comment: {
    color: '#8b949e',
    fontStyle: 'italic',
  },
  prolog: {
    color: '#8b949e',
  },
  doctype: {
    color: '#8b949e',
  },
  cdata: {
    color: '#8b949e',
  },
  punctuation: {
    color: '#c9d1d9',
  },
  property: {
    color: '#79c0ff',
  },
  tag: {
    color: '#7ee787',
  },
  boolean: {
    color: '#79c0ff',
  },
  number: {
    color: '#79c0ff',
  },
  constant: {
    color: '#79c0ff',
  },
  symbol: {
    color: '#79c0ff',
  },
  deleted: {
    color: '#ffa198',
  },
  selector: {
    color: '#d2a8ff',
  },
  'attr-name': {
    color: '#d2a8ff',
  },
  string: {
    color: '#a5d6ff',
  },
  char: {
    color: '#a5d6ff',
  },
  builtin: {
    color: '#79c0ff',
  },
  inserted: {
    color: '#7ee787',
  },
  operator: {
    color: '#ff7b72',
  },
  entity: {
    color: '#d2a8ff',
    cursor: 'help',
  },
  url: {
    color: '#a5d6ff',
  },
  '.language-css .token.string': {
    color: '#a5d6ff',
  },
  '.style .token.string': {
    color: '#a5d6ff',
  },
  variable: {
    color: '#ffa657',
  },
  atrule: {
    color: '#ff7b72',
  },
  'attr-value': {
    color: '#a5d6ff',
  },
  function: {
    color: '#d2a8ff',
  },
  keyword: {
    color: '#ff7b72',
  },
  regex: {
    color: '#a5d6ff',
  },
  important: {
    color: '#ff7b72',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
};
