import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUserProfile } from "@/api/queries";
import type { IUserProfile } from "@/api/types";
import { Mail, Phone, School, SquarePen } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { RequestCard } from "@/components/request-card";

export default async function Profile() {
  const userProfile = (await fetchUserProfile()) as IUserProfile;

  return (
    <>
      <div className="w-full mx-auto flex flex-col">
        <div className="relative">
          {/* Banner */}
          <div className="w-full h-32 bg-light rounded-t-xl" />

          {/* Profile Picture Container */}
          <div className="absolute bottom-0 w-full sm:w-fit flex justify-center transform translate-y-1/2 sm:justify-start sm:left-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <Image
                  src={`https://dzgbuobd25m4d.cloudfront.net/${userProfile.image}`}
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
          <Button className="px-8 bg-primary text-white hover:bg-accent transition-all duration-300">
            <SquarePen className="mr-2" /> Edit profile
          </Button>
        </div>
      </div>

      <div className="sm:pl-10">
        <h1 className="text-2xl font-bold text-primary">{userProfile.name}</h1>
        <ul className="my-2 space-y-3 text-accent">
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
        <TabsList className="w-full sm:w-fit">
          <TabsTrigger value="posts" className="w-full px-10">
            Posts
          </TabsTrigger>
          <TabsTrigger value="requests" className="w-full px-10">
            Requests
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="posts"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="mt-6">
            {userProfile.posts.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent
          value="requests"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="mt-6">
            {userProfile.requests.map((item) => (
              <RequestCard key={item.id} request={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* <ProfilePage /> */}
    </>
  );
}
