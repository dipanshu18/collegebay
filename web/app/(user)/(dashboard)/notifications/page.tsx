import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Notifications() {
  return (
    <div className="p-5">
      <div className="mb-2">
        <h1 className="text-xl font-bold text-primary">Your notifications</h1>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              className={cn(
                "flex flex-col md:flex-row md:items-center gap-2 justify-between shadow p-5 rounded-md",
                idx + 1 === 10 && "mb-20 lg:mb-0"
              )}
            >
              <div className="flex items-center gap-5">
                <Image
                  src={"/logo.svg"}
                  alt="user profile pic"
                  width={100}
                  height={100}
                  quality={100}
                  className="w-12 h-12 object-cover rounded-full border border-black"
                />
                <div>
                  <h1 className="text-secondary">Notification message</h1>
                </div>
              </div>
              <div>
                <Button className="bg-primary hover:bg-accent text-white">
                  Mark as read
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
