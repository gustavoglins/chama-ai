/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import clsx from 'clsx';
import { Check, ChevronsUpDown, Copy } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
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
  code?: string; // alternativa a children para passar código via prop
  codeByLanguage?: Partial<Record<CodeLanguage, string>>; // objeto com código para cada linguagem
  language?: CodeLanguage | string; // permite CodeLanguage enum ou string genérica
  showLineNumbers?: boolean;
  forceTheme?: 'light' | 'dark';
  title?: string; // título do bloco (ex: "Response", "Example request")
  languages?: (CodeLanguage | string)[]; // lista de linguagens disponíveis para troca
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determina o código a exibir baseado na linguagem selecionada
  const codeContent = codeByLanguage
    ? codeByLanguage[selectedLang as CodeLanguage] ??
      Object.values(codeByLanguage)[0] ??
      ''
    : code ?? children ?? '';

  // Sincroniza com a classe 'dark' no <html> ou usa forceTheme
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

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    setIsDropdownOpen(false);
    onLanguageChange?.(lang);
  };

  // Evita flicker/hydration mismatch: só renderiza quando sabemos o tema
  if (isDark === null) {
    return (
      <div className="rounded-md border border-border/40 bg-muted/30 h-24 animate-pulse" />
    );
  }

  const resolvedStyle = isDark ? customDarkTheme : customLightTheme;
  const containerClass = clsx(
    'rounded-lg border overflow-hidden',
    isDark ? 'bg-[#1c1e1f] border-border/40' : 'bg-[#f5f7fa] border-border/50'
  );

  const headerClass = clsx(
    'flex items-center justify-between px-4 py-2 border-b text-sm font-medium',
    isDark
      ? 'bg-[#16181a] border-border/40 text-foreground'
      : 'bg-[#ebeef2] border-border/50 text-foreground'
  );

  const showHeader = title || showCopyButton || showLanguageSelector;

  // Mapeia linguagens customizadas para linguagens reconhecidas pelo syntax highlighter
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
          <span className="text-sm font-medium">{title || selectedLang}</span>
          <div className="flex items-center gap-2">
            {showLanguageSelector && languages.length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={clsx(
                    'flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors bg-transparent cursor-pointer',
                    isDark
                      ? 'hover:bg-white/5 border-border/40'
                      : 'hover:bg-black/5 border-border/50'
                  )}
                >
                  {selectedLang}
                  <ChevronsUpDown className="h-3 w-3 opacity-60" />
                </button>

                {isDropdownOpen && (
                  <div
                    className={clsx(
                      'absolute right-0 top-full mt-1 py-1.5 rounded-lg border shadow-lg z-50 min-w-[120px] animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200',
                      isDark
                        ? 'bg-[#1c1e1f] border-border/40'
                        : 'bg-white border-border/50'
                    )}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={clsx(
                          'w-full px-3 py-2 text-left text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer',
                          selectedLang === lang
                            ? 'text-emerald-500 font-medium'
                            : isDark
                            ? 'text-foreground/80 hover:bg-white/5'
                            : 'text-foreground/80 hover:bg-black/5'
                        )}
                      >
                        <span>{lang}</span>
                        {selectedLang === lang && (
                          <Check className="h-3 w-3 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {showCopyButton && (
              <button
                onClick={handleCopy}
                className={clsx(
                  'p-1.5 rounded-md transition-colors cursor-pointer',
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
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
