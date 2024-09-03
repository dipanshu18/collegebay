"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import RequestCard from "./RequestCard";

export interface UserRequest {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  createdAt: Date;
  user: {
    image: string;
    name: string;
    email: string;
    college: string;
    phoneNo: string;
  };
  _count: {
    upVotes: number;
  };
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<UserRequest[]>([]);

  const [loading, setLoading] = useState(false);

  async function fetchRequests() {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/v1/requests",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    requests &&
    requests.map((request) => (
      <RequestCard key={request.id} request={request} refetch={fetchRequests} />
    ))
  );
}
