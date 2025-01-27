import { ApproveBtn, RejectMessageForm } from "@/components/admin-action-btn";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { IUserRequest } from "@/actions/types";
import { requestDetails } from "@/actions/admin";
import Image from "next/image";

export default async function AdminRequestDetails({
  params,
}: {
  params: { id: string };
}) {
  const request = (await requestDetails(params.id)) as IUserRequest;
  console.log(request);

  return (
    <>
      <div className="p-4 h-full">
        <div className="flex flex-col md:flex-row gap-10 p-5 items-center">
          <div className="w-full max-w-lg mx-auto p-5">
            <Image
              src={request?.image}
              alt={`${request?.title} reference image`}
              width={1080}
              height={1920}
              quality={100}
              className="w-full h-full"
            />
          </div>
          <div className="w-full space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {request?.title}
            </h1>
            <p className="text-neutral-700 dark:text-neutral-200 text-wrap">
              {request?.description}
            </p>

            <div className="flex items-center w-full gap-5">
              <ApproveBtn type="request" id={params.id} />
              <Dialog>
                <DialogTrigger className="w-full bg-red-500 text-neutral-50 hover:bg-red-700 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90 py-2 rounded-md">
                  Reject
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enter rejection reason</DialogTitle>
                  </DialogHeader>
                  <div>
                    <RejectMessageForm type="request" id={params.id} />
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
