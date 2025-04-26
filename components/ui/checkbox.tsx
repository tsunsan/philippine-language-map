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
  akeanon: "bg-[#3F51B5] border-[#3F51B5] data-[state=checked]:bg-[#3F51B5] data-[state=checked]:border-[#3F51B5] focus-visible:ring-indigo-400",
  capizeno: "bg-[#2196F3] border-[#2196F3] data-[state=checked]:bg-[#2196F3] data-[state=checked]:border-[#2196F3] focus-visible:ring-blue-400",
  ivatan: "bg-[#009688] border-[#009688] data-[state=checked]:bg-[#009688] data-[state=checked]:border-[#009688] focus-visible:ring-teal-400",
  kalinga: "bg-[#607D8B] border-[#607D8B] data-[state=checked]:bg-[#607D8B] data-[state=checked]:border-[#607D8B] focus-visible:ring-gray-400",
  kankanaey: "bg-[#D4AF37] border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37] focus-visible:ring-gold-400",
  kapampangan: "bg-[#4CAF50] border-[#4CAF50] data-[state=checked]:bg-[#4CAF50] data-[state=checked]:border-[#4CAF50] focus-visible:ring-green-400",
  karay_a: "bg-[#9C27B0] border-[#9C27B0] data-[state=checked]:bg-[#9C27B0] data-[state=checked]:border-[#9C27B0] focus-visible:ring-purple-400",
  maguindanao: "bg-[#A0522D] border-[#A0522D] data-[state=checked]:bg-[#A0522D] data-[state=checked]:border-[#A0522D] focus-visible:ring-brown-400",
  maranao: "bg-[#4682B4] border-[#4682B4] data-[state=checked]:bg-[#4682B4] data-[state=checked]:border-[#4682B4] focus-visible:ring-steelblue-400",
  masbateno: "bg-[#FF6F61] border-[#FF6F61] data-[state=checked]:bg-[#FF6F61] data-[state=checked]:border-[#FF6F61] focus-visible:ring-coral-400",
  pangasinan: "bg-[#66CC99] border-[#66CC99] data-[state=checked]:bg-[#66CC99] data-[state=checked]:border-[#66CC99] focus-visible:ring-mint-400",
  surigaonon: "bg-[#00CED1] border-[#00CED1] data-[state=checked]:bg-[#00CED1] data-[state=checked]:border-[#00CED1] focus-visible:ring-cyan-400",
  tuwali: "bg-[#8BC34A] border-[#8BC34A] data-[state=checked]:bg-[#8BC34A] data-[state=checked]:border-[#8BC34A] focus-visible:ring-lightgreen-400",
  unspecified_sama: "bg-[#DAA520] border-[#DAA520] data-[state=checked]:bg-[#DAA520] data-[state=checked]:border-[#DAA520] focus-visible:ring-goldenrod-400",
  yakan: "bg-[#C71585] border-[#C71585] data-[state=checked]:bg-[#C71585] data-[state=checked]:border-[#C71585] focus-visible:ring-mediumvioletred-400",
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