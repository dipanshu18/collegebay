import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { fetchRequests } from "@/actions/request";
import type { IUserRequest } from "@/actions/types";
import { RequestCard } from "@/components/request-card";

export default async function OthersRequest() {
  const requests = (await fetchRequests()) as IUserRequest[];

  return (
    <div className="p-5 mb-20 lg:mb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-3">
          <h1 className="text-xl font-bold text-primary">Resource Requests</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard type="home" key={request.id} request={request} />
          ))
        ) : (
          <h1 className="text-xl col-span-3">
            No requests created by others yet
          </h1>
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
