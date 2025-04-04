"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

const colorClasses = {
  tagalog: "bg-[#007bff] border-[#007bff] data-[state=checked]:bg-[#007bff] data-[state=checked]:border-[#007bff] focus-visible:ring-blue-400",
  hiligaynon: "bg-[#FF5733] border-[#FF5733] data-[state=checked]:bg-[#FF5733] data-[state=checked]:border-[#FF5733] focus-visible:ring-orange-400",
  bikol: "bg-[#FF33A1] border-[#FF33A1] data-[state=checked]:bg-[#FF33A1] data-[state=checked]:border-[#FF33A1] focus-visible:ring-pink-400",
  ilocano: "bg-[#33FF57] border-[#33FF57] data-[state=checked]:bg-[#33FF57] data-[state=checked]:border-[#33FF57] focus-visible:ring-green-400",
  cebuano: "bg-[#FFC300] border-[#FFC300] data-[state=checked]:bg-[#FFC300] data-[state=checked]:border-[#FFC300] focus-visible:ring-yellow-400",
  bisaya: "bg-[#8E44AD] border-[#8E44AD] data-[state=checked]:bg-[#8E44AD] data-[state=checked]:border-[#8E44AD] focus-visible:ring-purple-400",
  waray: "bg-[#FF8C00] border-[#FF8C00] data-[state=checked]:bg-[#FF8C00] data-[state=checked]:border-[#FF8C00] focus-visible:ring-orange-400",
  tausug: "bg-[#20B2AA] border-[#20B2AA] data-[state=checked]:bg-[#20B2AA] data-[state=checked]:border-[#20B2AA] focus-visible:ring-teal-400",
  default: "bg-[#CCCCCC] border-[#CCCCCC] data-[state=checked]:bg-[#CCCCCC] data-[state=checked]:border-[#CCCCCC] focus-visible:ring-grey-400",
};

function Checkbox({
  color = "default",
  className,
  defaultChecked = true,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { color?: keyof typeof colorClasses }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      defaultChecked={defaultChecked}
      className={cn(
        colorClasses[color],
        "peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Checkbox };