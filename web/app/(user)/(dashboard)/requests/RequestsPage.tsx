"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchRequests } from "@/api/queries";
import type { IUserRequest } from "@/api/types";
import { RequestCard } from "@/components/request-card";
import Spinner from "@/components/Spinner";

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
