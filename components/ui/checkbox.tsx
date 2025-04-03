"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  defaultChecked = true, 
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      defaultChecked={defaultChecked} 
      className={cn(
        "",
        className
      )}
      {...props}
    />
  );
}

export { Checkbox };
