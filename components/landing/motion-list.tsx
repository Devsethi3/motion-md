import { HugeiconsIcon } from "@hugeicons/react"
import { BorderCross } from "../ui/border-cross"
import { FullWidthDivider } from "../ui/full-width-divider"
import { ClipboardIcon, SearchIcon } from "@hugeicons/core-free-icons"
import { Input } from "../ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

const MotionList = () => {
  return (
    <div>
      <div className="relative">
        <FullWidthDivider position="bottom" className="w-full" />
        <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
        <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="mx-auto my-20 h-screen w-full max-w-7xl">
        <div className="flex w-full items-start gap-12">
          <div className="flex w-[25%] flex-col gap-4 p-7">
            <h2 className="inline-flex flex-wrap items-center gap-x-1.5 text-lg">
              Find{" "}
              <HugeiconsIcon
                key="icon"
                icon={ClipboardIcon}
                className="inline-block size-5 shrink-0 translate-y-px fill-accent! align-middle dark:fill-accent-foreground/10!"
              />{" "}
              <span className="underline">Motion.md</span>
            </h2>

            <div className="mt-10 flex flex-col gap-2 font-mono">
              <div className="relative flex w-full cursor-pointer items-center justify-between rounded-md border border-secondary/50 bg-secondary px-3 py-1 text-sm font-medium whitespace-nowrap text-foreground before:absolute before:inset-0 before:border-t before:border-white/90 before:bg-linear-to-b before:from-white/20 before:to-transparent hover:bg-secondary disabled:pointer-events-none disabled:opacity-50 dark:text-white">
                <span>All</span> <span>75</span>{" "}
              </div>
              <div className="flex w-full items-center justify-between rounded-md border-b px-3 py-1 text-sm font-medium whitespace-nowrap dark:text-white">
                <span>AI & LLMs Platforms</span>
                <span>12</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border-b px-3 py-1 text-sm font-medium whitespace-nowrap dark:text-white">
                <span>Developer Tools & IDEs</span>
                <span>10</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border-b px-3 py-1 text-sm font-medium whitespace-nowrap dark:text-white">
                <span>Backend, Database & DevOps</span>
                <span>8</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border-b px-3 py-1 text-sm font-medium whitespace-nowrap dark:text-white">
                <span>Productivity & Saas</span>
                <span>7</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border-b px-3 py-1 text-sm font-medium whitespace-nowrap dark:text-white">
                <span>Developer Tools & IDEs</span>
                <span>10</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border-b px-3 py-1 text-sm font-medium whitespace-nowrap dark:text-white">
                <span>Backend Database</span>
                <span>8</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border-b px-3 py-1 text-sm font-medium whitespace-nowrap dark:text-white">
                <span>Productivity & Saas</span>
                <span>7</span>
              </div>
            </div>
          </div>
          <div className="flex w-[75%] flex-col gap-4 p-7 font-mono">
            <div className="flex items-center gap-2 w-full border-b pb-2">
              <HugeiconsIcon icon={SearchIcon} aria-hidden="true" className='size-3.5 text-foreground/70' />
              <input
                placeholder="Search All Motion.md"
                type="text"
                className="bg-background w-full text-foreground text-sm placeholder:text-muted-foreground/72 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MotionList
