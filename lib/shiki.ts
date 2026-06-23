// lib/shiki.ts
import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "shiki";

// Languages you expect in MOTION.md files.
const LANGS: BundledLanguage[] = [
  "tsx",
  "ts",
  "jsx",
  "js",
  "json",
  "css",
  "scss",
  "html",
  "bash",
  "shell",
  "diff",
  "md",
];

// Dual themes -> CSS variables, so light/dark "just works".
const THEMES = {
  light: "github-light",
  dark: "github-dark",
} as const;

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: Object.values(THEMES),
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, lang: string) {
  const highlighter = await getHighlighter();
  const loaded = highlighter.getLoadedLanguages();
  const language = (loaded.includes(lang as BundledLanguage)
    ? lang
    : "text") as BundledLanguage;

  return highlighter.codeToHtml(code, {
    lang: language,
    themes: THEMES,
    defaultColor: false, // emit CSS vars for both themes
  });
}
