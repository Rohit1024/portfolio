import { tv } from "tailwind-variants"

export const pagination = tv({
  base: "group/pagination mx-auto flex w-full justify-center",
})

export const paginationContent = tv({
  base: "flex flex-row items-center gap-1.5",
})

export const paginationLink = tv({
  base: [
    "size-10 min-w-10 p-0 text-sm font-medium inline-flex items-center justify-center rounded-lg transition-colors",
    "group-data-[size=sm]/pagination:size-9 group-data-[size=sm]/pagination:min-w-9 group-data-[size=sm]/pagination:text-xs",
    "group-data-[size=md]/pagination:size-10 group-data-[size=md]/pagination:min-w-10 group-data-[size=md]/pagination:text-sm",
    "group-data-[size=lg]/pagination:size-11 group-data-[size=lg]/pagination:min-w-11 group-data-[size=lg]/pagination:text-base",
  ],
})

export const paginationEllipsis = tv({
  base: [
    "flex size-10 items-center justify-center text-muted-foreground",
    "group-data-[size=sm]/pagination:size-9",
    "group-data-[size=md]/pagination:size-10",
    "group-data-[size=lg]/pagination:size-11",
  ],
})

export const paginationNext = tv({
  base: [
    "group inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors",
    "h-10 min-w-10 px-3.5 py-2",
    "group-data-[size=sm]/pagination:h-9 group-data-[size=sm]/pagination:min-w-9 group-data-[size=sm]/pagination:px-2.5",
    "group-data-[size=md]/pagination:h-10 group-data-[size=md]/pagination:min-w-10 group-data-[size=md]/pagination:px-3.5",
    "group-data-[size=lg]/pagination:h-11 group-data-[size=lg]/pagination:min-w-11 group-data-[size=lg]/pagination:px-4.5",
  ],
})

export const paginationPrevious = tv({
  base: [
    "group inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors",
    "h-10 min-w-10 px-3.5 py-2",
    "group-data-[size=sm]/pagination:h-9 group-data-[size=sm]/pagination:min-w-9 group-data-[size=sm]/pagination:px-2.5",
    "group-data-[size=md]/pagination:h-10 group-data-[size=md]/pagination:min-w-10 group-data-[size=md]/pagination:px-3.5",
    "group-data-[size=lg]/pagination:h-11 group-data-[size=lg]/pagination:min-w-11 group-data-[size=lg]/pagination:px-4.5",
  ],
})
