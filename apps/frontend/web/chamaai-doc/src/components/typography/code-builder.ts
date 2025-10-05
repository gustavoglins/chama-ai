/**
 * Helper para construir blocos de código de forma mais limpa
 */
export class CodeBuilder {
  private lines: string[] = [];

  /**
   * Adiciona uma ou mais linhas de código
   */
  line(...content: string[]): this {
    this.lines.push(...content);
    return this;
  }

  /**
   * Adiciona uma linha vazia
   */
  empty(): this {
    this.lines.push('');
    return this;
  }

  /**
   * Adiciona múltiplas linhas de uma vez (quebra por \n)
   */
  block(code: string): this {
    this.lines.push(...code.split('\n'));
    return this;
  }

  /**
   * Retorna o código completo
   */
  build(): string {
    return this.lines.join('\n');
  }

  /**
   * Alias para build()
   */
  toString(): string {
    return this.build();
  }
}

/**
 * Função helper para criar um CodeBuilder
 */
export function code(): CodeBuilder {
  return new CodeBuilder();
}

/**
 * Template tag para código inline com indentação automática
 */
export function dedent(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  const result = strings.reduce((acc, str, i) => {
    return acc + str + (values[i] ?? '');
  }, '');

  // Remove indentação comum
  const lines = result.split('\n');
  const nonEmptyLines = lines.filter((line) => line.trim());

  if (nonEmptyLines.length === 0) return '';

  const minIndent = Math.min(
    ...nonEmptyLines.map((line) => {
      const match = line.match(/^(\s*)/);
      return match ? match[1].length : 0;
    })
  );

  return lines
    .map((line) => line.slice(minIndent))
    .join('\n')
    .trim();
}
