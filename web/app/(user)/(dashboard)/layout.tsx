import Link from "next/link";

import { Logout } from "@/components/logout-btn";
import { Logo, Navbar } from "@/components/navbar";
import {
  ArchiveRestore,
  Bell,
  HandHelping,
  Home,
  MessageSquare,
  Upload,
  User,
} from "lucide-react";
import { fetchUserNotifications } from "@/actions/user";
import { toast } from "sonner";

const homeLinks: { icon: React.ReactNode; title: string; link: string }[] = [
  {
    icon: <Home />,
    title: "Home",
    link: "/home",
  },
  {
    icon: <Upload />,
    title: "Create Post",
    link: "/post",
  },
  {
    icon: <HandHelping />,
    title: "Requests",
    link: "/requests",
  },
  {
    icon: <MessageSquare />,
    title: "Messages",
    link: "/messages",
  },
  {
    icon: <Bell />,
    title: "Notifications",
    link: "/notifications",
  },
  {
    icon: <ArchiveRestore />,
    title: "Create Request",
    link: "/requests/create",
  },
  {
    icon: <User />,
    title: "Profile",
    link: "/profile",
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetchUserNotifications();

  if (response?.error) return toast.error(response.error);

  const notifications = response?.success?.filter(
    (item) => item.read === false
  );
  const count = notifications?.length as number;

  return (
    <div className="flex flex-col min-h-dvh lg:flex-row max-w-5xl mx-auto">
      <div className="sticky top-0 lg:hidden z-40">
        <Navbar />
      </div>
      <aside className="hidden sticky h-dvh top-0 w-[250px] border-r p-5 lg:flex flex-col justify-between">
        <div>
          <div className="w-fit">
            <Logo />
          </div>

          <ul className="grid grid-cols-1 my-5">
            {homeLinks.map((item, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Link key={idx} href={item.link}>
                <li className="flex items-center gap-2 text-secondary hover:bg-primary hover:text-white transition-all duration-100 p-2 rounded">
                  {item.icon} {item.title}{" "}
                  {item.title === "Notifications" && count > 0 && (
                    <span className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <Logout type="USER" />
        </div>
      </aside>
      <main className="flex-1 h-dvh w-full lg:overflow-y-auto scrollbar-thin">
        {children}
      </main>

      <div className="lg:hidden bg-gray-100 fixed bottom-0 py-3 w-full">
        <ul className="flex w-full justify-evenly">
          {homeLinks.map((item, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Link key={idx} href={item.link}>
              <li className="text-primary hover:bg-primary p-2 hover:text-white transition-all duration-300 rounded-full relative">
                {item.icon}
                {item.title === "Notifications" && count > 0 && (
                  <span className="absolute top-0 left-5 z-40 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
