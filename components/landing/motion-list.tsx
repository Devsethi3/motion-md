import { BorderCross } from "../ui/border-cross"
import { FullWidthDivider } from "../ui/full-width-divider"

const MotionList = () => {
  return (
    <div className="relative">
      <FullWidthDivider position="bottom" className="w-full" />
      <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
      <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
      <div className="mx-auto w-full max-w-7xl">
        
      </div>
    </div>
  )
}

export default MotionList
