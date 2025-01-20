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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePostForm } from "@/components/create-post-form";

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
            <SelectItem value="Books">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Dialog>
        <DialogTrigger className="rounded-md w-full py-2 md:max-w-xs text-white bg-primary hover:bg-accent transition-all duration-300">
          Create Post
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Create a post</DialogTitle>
            <CreatePostForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
