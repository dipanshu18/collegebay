import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { IPost, IUserRequest } from "@/actions/types";

export function DashboardTable({
  type,
  posts,
  requests,
}: {
  type: "post" | "request";
  posts?: IPost[];
  requests?: IUserRequest[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Title</TableHead>
          {posts && <TableHead className="text-right">Amount</TableHead>}
          <TableHead> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(posts &&
          posts?.length > 0 &&
          posts.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.isApproved ? "Approved" : "Pending"}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={
                    type === "post"
                      ? `/admin/dashboard/posts/${item.id}`
                      : `/admin/dashboard/requests/${item.id}`
                  }
                >
                  <Button>View details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))) ||
          (requests &&
            requests?.length > 0 &&
            requests.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.isApproved ? "Approved" : "Pending"}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={
                      type === "post"
                        ? "/admin/dashboard/posts/:id"
                        : "/admin/dashboard/requests/:id"
                    }
                  >
                    <Button>View details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            )))}
      </TableBody>
    </Table>
  );
}
