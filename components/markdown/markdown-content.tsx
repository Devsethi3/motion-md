// components/markdown/markdown-content.tsx
import { MarkdownRenderer } from "./markdown-renderer";
import { CopyMarkdownButton } from "./copy-markdown-button";

export async function MarkdownContent({
  content,
  title,
}: {
  content: string;
  title?: string;
}) {
  return (
    <div className="relative">
     

      <div className="max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
