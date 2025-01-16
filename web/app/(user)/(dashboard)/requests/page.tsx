import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { CreateRequestForm } from "@/components/create-request-form";
import { fetchRequests } from "@/actions/user";
import type { IUserRequest } from "@/actions/types";
import { RequestCard } from "@/components/request-card";

export default async function OthersRequest() {
  const requests = (await fetchRequests()) as IUserRequest[];

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-2">
          <h1 className="text-xl font-bold">Resource Requests</h1>
          <p className="text-lg">
            Browse and upvote requests from other students
          </p>
        </div>

        <Dialog>
          <DialogTrigger className="flex justify-center items-center py-4 px-6 text-white rounded-md bg-primary hover:bg-accent transition-all duration-300">
            <Plus className="mr-2" /> Create Request
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2">Request for resource</DialogTitle>

              <CreateRequestForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <h1 className="mt-10 text-xl col-span-3">
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
    </>
  );
}
