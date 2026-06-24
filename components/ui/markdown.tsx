import { cn } from "@/lib/utils"
import { marked } from "marked"
import { memo, useId, useMemo } from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import { CodeBlock, CodeBlockCode } from "./code-block"

export type MarkdownProps = {
  children: string | null
  id?: string
  className?: string
  components?: Partial<Components>
}

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown)
  return tokens.map((token) => token.raw)
}

function extractLanguage(className?: string): string {
  if (!className) return "plaintext"
  const match = className.match(/language-(\w+)/)
  return match ? match[1] : "plaintext"
}

const INITIAL_COMPONENTS: Partial<Components> = {
  h1: function H1({ children, ...props }) {
    return (
      <h1
        className="mb-4 mt-0 scroll-mt-20 text-2xl font-bold tracking-tight text-foreground first:mt-0"
        {...props}
      >
        {children}
      </h1>
    )
  },
  h2: function H2({ children, ...props }) {
    return (
      <h2
        className="mb-3 mt-8 scroll-mt-20 text-xl font-semibold tracking-tight text-foreground first:mt-0"
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: function H3({ children, ...props }) {
    return (
      <h3
        className="mb-2 mt-6 scroll-mt-20 text-lg font-medium tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h3>
    )
  },
  h4: function H4({ children, ...props }) {
    return (
      <h4
        className="mb-2 mt-5 scroll-mt-20 text-base font-medium text-foreground"
        {...props}
      >
        {children}
      </h4>
    )
  },
  h5: function H5({ children, ...props }) {
    return (
      <h5
        className="mb-1 mt-4 scroll-mt-20 text-sm font-medium text-muted-foreground"
        {...props}
      >
        {children}
      </h5>
    )
  },
  h6: function H6({ children, ...props }) {
    return (
      <h6
        className="mb-1 mt-4 scroll-mt-20 text-xs font-medium text-muted-foreground"
        {...props}
      >
        {children}
      </h6>
    )
  },
  p: function Paragraph({ children, ...props }) {
    return (
      <p
        className="mb-4 leading-7 text-foreground/85 last:mb-0"
        {...props}
      >
        {children}
      </p>
    )
  },
  a: function Anchor({ href, children, ...props }) {
    return (
      <a
        href={href}
        className="font-medium text-primary underline underline-offset-2 decoration-primary/30 transition-colors hover:decoration-primary"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    )
  },
  strong: function Strong({ children, ...props }) {
    return (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    )
  },
  em: function Emphasis({ children, ...props }) {
    return (
      <em className="italic text-foreground/80" {...props}>
        {children}
      </em>
    )
  },
  blockquote: function Blockquote({ children, ...props }) {
    return (
      <blockquote
        className="my-5 border-l-4 border-primary/20 pl-5 pr-4 italic text-muted-foreground [&>p]:text-muted-foreground [&>p]:leading-7"
        {...props}
      >
        {children}
      </blockquote>
    )
  },
  ul: function UnorderedList({ children, ...props }) {
    return (
      <ul
        className="mb-4 ml-6 list-outside space-y-2 last:mb-0 [&>li]:pl-1"
        {...props}
      >
        {children}
      </ul>
    )
  },
  ol: function OrderedList({ children, ...props }) {
    return (
      <ol
        className="mb-4 ml-6 list-outside space-y-2 last:mb-0 [&>li]:pl-1"
        {...props}
      >
        {children}
      </ol>
    )
  },
  li: function ListItem({ children, ...props }) {
    return (
      <li
        className="text-foreground/85 leading-relaxed marker:text-muted-foreground/50 [&>ul]:mt-2 [&>ul]:mb-0 [&>ol]:mt-2 [&>ol]:mb-0"
        {...props}
      >
        {children}
      </li>
    )
  },
  hr: function HorizontalRule(props) {
    return (
      <hr className="my-8 border-border/60" {...props} />
    )
  },
  table: function Table({ children, ...props }) {
    return (
      <div className="not-prose my-6 w-full overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    )
  },
  thead: function TableHead({ children, ...props }) {
    return (
      <thead className="border-b border-border bg-muted/50" {...props}>
        {children}
      </thead>
    )
  },
  tbody: function TableBody({ children, ...props }) {
    return <tbody {...props}>{children}</tbody>
  },
  tr: function TableRow({ children, ...props }) {
    return (
      <tr className="border-b border-border last:border-b-0 even:bg-muted/20" {...props}>
        {children}
      </tr>
    )
  },
  th: function TableHeader({ children, ...props }) {
    return (
      <th
        className="h-10 px-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        {...props}
      >
        {children}
      </th>
    )
  },
  td: function TableData({ children, ...props }) {
    return (
      <td className="h-10 px-4 text-foreground/85" {...props}>
        {children}
      </td>
    )
  },
  code: function CodeComponent({ className, children, ...props }) {
    const isInline =
      !props.node?.position?.start.line ||
      props.node?.position?.start.line === props.node?.position?.end.line

    if (isInline) {
      return (
        <code
          className={cn(
            "rounded-md bg-muted/80 px-[5px] py-[2px] font-mono text-[0.875em] font-medium text-foreground ring-1 ring-border/40",
            className
          )}
          {...props}
        >
          {children}
        </code>
      )
    }

    const language = extractLanguage(className)

    return (
      <div className="not-prose my-5 last:mb-0">
        {language !== "plaintext" && (
          <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-border bg-muted/60 px-4 py-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
              {language}
            </span>
          </div>
        )}
        <CodeBlock
          className={cn(
            language !== "plaintext" ? "rounded-t-none" : "",
            className
          )}
        >
          <CodeBlockCode code={children as string} language={language} />
        </CodeBlock>
      </div>
    )
  },
  pre: function PreComponent({ children }) {
    return <>{children}</>
  },
}

const MemoizedMarkdownBlock = memo(
  function MarkdownBlock({
    content,
    components = INITIAL_COMPONENTS,
  }: {
    content: string
    components?: Partial<Components>
  }) {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    )
  },
  function propsAreEqual(prevProps, nextProps) {
    return prevProps.content === nextProps.content
  }
)

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock"

function MarkdownComponent({
  children,
  id,
  className,
  components = INITIAL_COMPONENTS,
}: MarkdownProps) {
  const generatedId = useId()
  const blockId = id ?? generatedId
  const blocks = useMemo(() => parseMarkdownIntoBlocks(children ?? ""), [children])

  if (!children) return null

  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <MemoizedMarkdownBlock
          key={`${blockId}-block-${index}`}
          content={block}
          components={components}
        />
      ))}
    </div>
  )
}

const Markdown = memo(MarkdownComponent)
Markdown.displayName = "Markdown"

export { Markdown }
