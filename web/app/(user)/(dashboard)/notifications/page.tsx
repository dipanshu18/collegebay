import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Notifications() {
  return (
    <div className="p-4">
      <div className="mb-2">
        <h1 className="text-xl font-bold">Your notifications</h1>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between shadow p-5 rounded-md">
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
              <h1>Notification message</h1>
            </div>
          </div>
          <div>
            <Button>Mark as read</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
