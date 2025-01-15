"use client";

import Spinner from "@/components/Spinner";
import RequestCard from "./RequestCard";
import { useQuery } from "@tanstack/react-query";
import { fetchRequests } from "@/api/queries";
import { IUserRequest } from "@/api/types";

export default function RequestsPage() {
  const {
    data: requests,
    isLoading,
    isError,
  } = useQuery<IUserRequest[]>({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isError && !isLoading) {
    return <h1>Error while fetching requests...</h1>;
  }

  return requests && requests.length > 0 ? (
    requests.map((request) => (
      <RequestCard key={request.id} request={request} />
    ))
  ) : (
    <h1 className="mt-10 text-xl col-span-3">
      No requests created by others yet 🙂
    </h1>
  );
}
