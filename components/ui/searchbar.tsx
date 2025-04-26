import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center items-center">
      <Command className="w-3/4 max-w-lg rounded-lg border border-white/10 bg-gradient-to-b from-black/50 to-black/90 shadow-md">
        <CommandInput
          placeholder="Type a command or search..."
          className="rounded-lg px-4 py-2 bg-transparent text-white placeholder-gray-400" 
        />
        <CommandGroup heading="Philippines">
    </CommandGroup>
      </Command>
    </div>
  );
}