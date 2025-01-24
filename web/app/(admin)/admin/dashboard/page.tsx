import type { Metadata } from "next";

import type { IPost, IUserRequest } from "@/actions/types";
import { fetchPosts, fetchRequests } from "@/actions/user";
import { DashboardTable } from "@/components/admin-dashboard-table";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboard() {
  const posts = (await fetchPosts()) as IPost[];
  const requests = (await fetchRequests()) as IUserRequest[];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Product Posts</h1>
        <DashboardTable type="post" posts={posts} />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold">Product Requests</h1>
        <DashboardTable type="request" requests={requests} />
      </div>
    </div>
  );
}
