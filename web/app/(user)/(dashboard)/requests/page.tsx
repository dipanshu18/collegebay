import { Button } from "@/components/ui/button";
import RequestsPage from "./RequestsPage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import CreateRequestForm from "./CreateRequestForm";

export default async function OthersRequest() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-xl font-bold">Resource Requests</h1>
          <p className="text-lg">
            Browse and upvote requests from other students
          </p>
        </div>

        <Dialog>
          <DialogTrigger className="h-full">
            <Button className="h-full px-8 text-white rounded-md bg-primary hover:bg-accent transition-all duration-300">
              <Plus className="mr-2" /> Create Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request for resource</DialogTitle>
              <DialogDescription>
                <CreateRequestForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5">
        <RequestsPage />
      </div>
    </>
  );
}
