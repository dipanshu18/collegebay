import type { Metadata } from "next";

import type { IPost, IUserRequest } from "@/actions/types";
import { DashboardTable } from "@/components/admin-dashboard-table";
import { adminHome } from "@/actions/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboard() {
  const { posts, requests } = (await adminHome()) as {
    posts: IPost[];
    requests: IUserRequest[];
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-xl font-bold">(Pending Approval) Product Posts</h1>
        <DashboardTable type="post" posts={posts} />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold">
          (Pending Approval) Product Requests
        </h1>
        <DashboardTable type="request" requests={requests} />
      </div>
    </div>
  );
}
