import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUserProfile } from "@/actions/user";
import type { IUserProfile } from "@/actions/types";
import { Mail, Phone, School, SquarePen } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { RequestCard } from "@/components/request-card";
import { toast } from "sonner";

async function profile() {
  const response = await fetchUserProfile();

  if (response?.error) return toast(response.error);

  if (response?.success) {
    return response.success;
  }
}

export default async function Profile() {
  const userProfile = (await profile()) as IUserProfile;

  return (
    <div className="p-4 mb-20 lg:mb-0">
      <div className="w-full mx-auto flex flex-col">
        <div className="relative">
          {/* Banner */}
          <div className="w-full h-32 bg-primary rounded-t-xl" />

          {/* Profile Picture Container */}
          <div className="absolute bottom-0 w-full sm:w-fit flex justify-center transform translate-y-1/2 sm:justify-start sm:left-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <Image
                  src={userProfile.image}
                  alt={`${userProfile.name} profile picture`}
                  width={300}
                  height={300}
                  quality={100}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-20 sm:mt-0 sm:items-end sm:pr-5 sm:pt-5">
          <Link href={"/profile/edit"}>
            <Button className="bg-primary text-white hover:bg-accent">
              <SquarePen className="mr-2" /> Edit profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="sm:pl-10">
        <h1 className="text-2xl font-bold text-primary">{userProfile.name}</h1>
        <ul className="my-2 space-y-3 text-gray-700/80">
          <li className="flex gap-2">
            <Mail /> {userProfile.email}
          </li>
          <li className="flex gap-2">
            <Phone /> {userProfile.phoneNo}
          </li>
          <li className="flex gap-2">
            <School /> {userProfile.college}
          </li>
        </ul>
      </div>

      <Tabs defaultValue="posts" className="w-full sm:px-10">
        <TabsList className="w-full sm:w-fit bg-light text-secondary">
          <TabsTrigger value="posts" className="w-full px-10">
            Posts
          </TabsTrigger>
          <TabsTrigger value="requests" className="w-full px-10">
            Requests
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="posts"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {userProfile.posts.map((item) => (
            <PostCard type="profile" key={item.id} post={item} />
          ))}
        </TabsContent>
        <TabsContent
          value="requests"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {userProfile.requests.map((item) => (
            <RequestCard type="profile" key={item.id} request={item} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
