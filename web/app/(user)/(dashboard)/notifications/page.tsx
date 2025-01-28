import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { cn } from "@/components/lib/utils";

import { fetchUserNotifications } from "@/actions/user";
import type { IUserNotification } from "@/actions/types";
import { MarkAsReadBtn } from "@/components/mark-as-read-btn";
import { toast } from "sonner";

export default async function Notifications() {
  const response = await fetchUserNotifications();
  let notifications: IUserNotification[] | [] = [];

  if (response?.error) return toast.error(response.error);

  if (response?.success) {
    notifications = response.success as IUserNotification[];
  }

  return (
    <div className="p-5">
      <div className="mb-2">
        <h1 className="text-xl font-bold text-primary">Your notifications</h1>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {notifications.length > 0 ? (
          notifications.map((item, idx) => (
            <div
              key={item.id}
              className={cn(
                "flex flex-col md:flex-row md:items-center gap-2 justify-between shadow bg-gray-50 p-5 rounded-md",
                idx + 1 === notifications.length && "mb-20 lg:mb-0"
              )}
            >
              <div className="flex items-center gap-5">
                <Image
                  src={
                    item.targetType === "ADMIN_APPROVE" ||
                    item.targetType === "ADMIN_REJECT"
                      ? "/logo.svg"
                      : item.action.image
                  }
                  alt="user profile pic"
                  width={100}
                  height={100}
                  quality={100}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <h1 className="text-secondary">{item.message}</h1>
                  <p className="text-xs text-wrap text-accent">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              {!item.read && (
                <div>
                  <MarkAsReadBtn id={item.id} />
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 className="text-lg font-bold">No notifications for you yet</h1>
        )}
      </div>
    </div>
  );
}
