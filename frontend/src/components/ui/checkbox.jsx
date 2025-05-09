import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border-2 border-red-600 bg-white",
        "data-[state=checked]:bg-white data-[state=checked]:border-red-600 data-[state=checked]:border-3",
        "focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200",
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-red-600">
        <CheckIcon className="size-4 stroke-[3]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox }
