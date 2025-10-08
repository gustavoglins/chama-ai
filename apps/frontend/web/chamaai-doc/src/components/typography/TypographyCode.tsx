'use client';

import clsx from 'clsx';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { customDarkTheme, customLightTheme } from '@/lib/code-themes';

export enum CodeLanguage {
  CURL = 'curl',
  PYTHON = 'python',
  JAVA = 'java',
  NODEJS = 'nodejs',
}

interface TypographyCodeProps {
  children?: string;
  code?: string;
  codeByLanguage?: Partial<Record<CodeLanguage | string, string>>;
  language?: CodeLanguage | string;
  showLineNumbers?: boolean;
  forceTheme?: 'light' | 'dark';
  title?: string;
  languages?: (CodeLanguage | string)[];
  onLanguageChange?: (lang: string) => void;
  showCopyButton?: boolean;
  showLanguageSelector?: boolean;
}

export function TypographyCode({
  children,
  code,
  codeByLanguage,
  language = 'javascript',
  showLineNumbers = true,
  forceTheme,
  title,
  languages = [],
  onLanguageChange,
  showCopyButton = true,
  showLanguageSelector = false,
}: TypographyCodeProps) {
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [selectedLang, setSelectedLang] = useState(language);
  const [copied, setCopied] = useState(false);

  const codeContent = codeByLanguage
    ? codeByLanguage[selectedLang] ?? Object.values(codeByLanguage)[0] ?? ''
    : code ?? children ?? '';

  useEffect(() => {
    if (forceTheme) {
      setIsDark(forceTheme === 'dark');
      return;
    }

    const apply = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    apply();

    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, [forceTheme]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    onLanguageChange?.(lang);
  };

  if (isDark === null) {
    return (
      <div className="rounded-md border border-border/40 bg-muted/30 h-24 animate-pulse" />
    );
  }

  const resolvedStyle = isDark ? customDarkTheme : customLightTheme;
  const containerClass = clsx(
    'rounded-lg border border-border overflow-hidden w-full flex flex-col'
  );

  const headerClass = clsx(
    'flex items-center justify-between px-4 py-2.5 border-b text-sm font-medium shrink-0 bg-muted/50'
  );

  const showHeader = title || showCopyButton || showLanguageSelector;

  const getSyntaxLanguage = (lang: string): string => {
    const languageMap: Record<string, string> = {
      [CodeLanguage.NODEJS]: 'javascript',
      [CodeLanguage.CURL]: 'bash',
    };
    return languageMap[lang] || lang;
  };

  return (
    <div className={containerClass}>
      {showHeader && (
        <div className={headerClass}>
          <div className="flex items-center gap-3">
            {title && <span className="text-sm font-medium">{title}</span>}
            {showLanguageSelector && languages.length > 0 ? (
              <div className="flex items-center gap-1 rounded-md bg-muted/50 p-0.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer',
                      selectedLang === lang
                        ? isDark
                          ? 'bg-[#2a2d2e] text-emerald-400 shadow-sm'
                          : 'bg-white text-foreground shadow-sm'
                        : isDark
                        ? 'text-foreground/60 hover:text-foreground/80'
                        : 'text-foreground/60 hover:text-foreground/80'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            ) : (
              !title && (
                <span className="text-sm font-medium">{selectedLang}</span>
              )
            )}
          </div>
          <div className="flex items-center gap-2">
            {showCopyButton && (
              <button
                onClick={handleCopy}
                className={clsx(
                  'p-1.5 rounded-md transition-colors cursor-pointer shrink-0',
                  isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-foreground/60 hover:text-foreground hover:bg-black/5'
                )}
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={getSyntaxLanguage(selectedLang)}
          style={resolvedStyle}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            borderRadius: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            margin: 0,
            background: 'transparent',
          }}
        >
          {codeContent.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
