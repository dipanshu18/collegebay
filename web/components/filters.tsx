"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Filters() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search resources..."
          className="h-10 pl-4 pr-12 text-base bg-white border border-border/40 rounded-md placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-offset-0"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
      </div>
      <div className="md:max-w-sm w-full">
        <Select>
          <SelectTrigger className="py-4">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Equiment">Equiment</SelectItem>
            <SelectItem value="Notes">Notes</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
