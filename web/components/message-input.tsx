"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export function MessageInput() {
  return (
    <div className="w-full mb-20 lg:mb-0 border-t bg-gray-100 border-gray-100 sticky bottom-0 flex gap-2 items-center p-2">
      <div className="relative w-full">
        <Textarea rows={5} placeholder="your message" className="flex-1" />
        <Button className="absolute bottom-0 right-0 m-2 bg-primary hover:bg-accent text-white">
          <Send />
        </Button>
      </div>
    </div>
  );
}
