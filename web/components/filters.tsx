"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Filters() {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const router = useRouter();

  async function handleSearchFilters(e: FormEvent) {
    e.preventDefault();

    router.push(`/home?q=${searchInput}&category=${category}`);
  }

  return (
    <form
      onSubmit={handleSearchFilters}
      className="flex flex-col md:flex-row items-center justify-between gap-5"
    >
      <div className="relative w-full">
        <Input
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          placeholder="Search resources..."
          className="pl-4 pr-12 text-base bg-white border border-border/40 rounded-md placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-offset-0"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
      </div>
      <div className="md:max-w-sm w-full">
        <Select
          value={category}
          onValueChange={(value) => setCategory(value)}
          defaultValue="ALL"
        >
          <SelectTrigger className="py-4">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="EQUIPMENT">Equipment</SelectItem>
            <SelectItem value="NOTES">Notes</SelectItem>
            <SelectItem value="ELECTRONICS">Electronics</SelectItem>
            <SelectItem value="FURNITURE">Furniture</SelectItem>
            <SelectItem value="BOOKS">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full lg:w-fit">
        <Button
          type="submit"
          className="bg-primary w-full flex items-center gap-2"
        >
          Search <Search size={18} />
        </Button>
      </div>
    </form>
  );
}
