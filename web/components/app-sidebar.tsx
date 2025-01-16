"use client";

import { Layers, HandHelping, MessagesSquare, Bell } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Explore",
      url: "/home",
      icon: Layers,
    },
    {
      title: "Requests",
      url: "/requests",
      icon: HandHelping,
    },
    {
      title: "Messages",
      url: "#",
      icon: MessagesSquare,
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuItem className="list-none">
          <SidebarMenuButton size="lg" asChild>
            <Link href="/home">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                <Image
                  src={"/logo.svg"}
                  width={30}
                  height={30}
                  alt="Collegbay logo"
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">CollegeBay</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
