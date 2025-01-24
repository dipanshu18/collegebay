import { ApproveBtn, RejectMessageForm } from "@/components/admin-action-btn";
import { ImageCarousel } from "@/components/image-carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { IUserRequest } from "@/actions/types";
import { fetchRequests } from "@/actions/user";

export default async function AdminRequestDetails() {
  const requests = (await fetchRequests()) as IUserRequest[];

  return (
    <>
      <div className="p-4 h-full">
        <div className="flex flex-col md:flex-row gap-10 p-5 items-center">
          <div className="w-full max-w-lg mx-auto p-5">
            <ImageCarousel images={[]} />
          </div>
          <div className="w-full space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {requests[0]?.title}
            </h1>
            <p className="text-neutral-700 dark:text-neutral-200 text-wrap">
              {requests[0]?.description}
            </p>

            <div className="flex items-center w-full gap-5">
              <ApproveBtn type="request" />
              <Dialog>
                <DialogTrigger className="w-full bg-red-500 text-neutral-50 hover:bg-red-700 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90 py-2 rounded-md">
                  Reject
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enter rejection reason</DialogTitle>
                  </DialogHeader>
                  <div>
                    <RejectMessageForm type="request" />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
