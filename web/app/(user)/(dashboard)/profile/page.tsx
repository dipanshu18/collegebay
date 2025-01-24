import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUserProfile } from "@/actions/user";
import type { IUserProfile } from "@/actions/types";
import { Mail, Phone, School, SquarePen } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { RequestCard } from "@/components/request-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateProfileForm } from "@/components/update-profile-form";
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
    <div className="p-4">
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
          <Dialog>
            <DialogTrigger className="flex py-2 rounded-md px-8 bg-primary text-white hover:bg-accent transition-all duration-300">
              <SquarePen className="mr-2" /> Edit profile
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update your profile</DialogTitle>

                <UpdateProfileForm user={userProfile} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {userProfile.posts.map((item) => (
            <PostCard type="profile" key={item.id} post={item} />
          ))}
        </TabsContent>
        <TabsContent
          value="requests"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {userProfile.requests.map((item) => (
            <RequestCard type="profile" key={item.id} request={item} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
