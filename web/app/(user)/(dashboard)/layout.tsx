import { Logout } from "@/components/logout-btn";
import { Logo, Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  ArchiveRestore,
  Bell,
  HandHelping,
  Home,
  MessageSquare,
  Upload,
  User,
} from "lucide-react";
import Link from "next/link";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh lg:flex-row">
      <div className="sticky top-0 lg:hidden z-40">
        <Navbar />
      </div>
      <aside className="hidden sticky h-dvh bg-light border-r border-info top-0 w-[300px] p-5 lg:flex flex-col justify-between">
        <div>
          <div className="w-fit">
            <Logo />
          </div>

          <ul className="grid grid-cols-1 my-5">
            {homeLinks.map((item, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Link key={idx} href={item.link}>
                <li className="flex gap-2 text-secondary hover:bg-primary hover:text-white transition-all duration-100 p-2 rounded">
                  {item.icon} {item.title}
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

      <div className="lg:hidden bg-light fixed bottom-0 p-5 w-full">
        <ul className="flex w-full justify-evenly gap-5">
          {homeLinks.map((item, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Link key={idx} href={item.link}>
              <li className="text-primary hover:bg-primary hover:text-white transition-all duration-300 p-1 rounded-full">
                {item.icon}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
