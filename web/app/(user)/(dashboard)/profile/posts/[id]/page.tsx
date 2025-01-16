import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/image-carousel";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { EditProductListingForm } from "@/components/edit-listing-form";
import { deletePost, fetchPost, postSold } from "@/actions/user";
import { ConfirmButton } from "@/components/confirm-button";

export default async function UserPostDetails({
  params,
}: {
  params: { id: string };
}) {
  const userPost = await fetchPost(params.id);

  return (
    <div className="my-5 p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full my-5 col-span-2">
          <ImageCarousel images={userPost.images} />
        </div>
        <div className="space-y-3 w-full my-10">
          <h1 className="text-2xl font-bold">{userPost.title}</h1>
          <p className="text-sm text-neutral-700 dark:text-neutral-200 text-wrap">
            {userPost.description}
          </p>
          <p className="font-extrabold text-xl">Rs. {userPost.price}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-10 md:my-16">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-black">
            <DialogHeader>
              <DialogTitle>Edit product listing</DialogTitle>
              <DialogDescription>
                Make changes to your listing here. Click save when you{`'`}
                re done.
              </DialogDescription>
            </DialogHeader>
            <EditProductListingForm post={userPost} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="destructive">
              Delete Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-black">
            <DialogHeader>
              <DialogTitle>Delete your post</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your product listing?
                <form action={() => deletePost.bind(null, params.id)}>
                  <ConfirmButton />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full dark:bg-neutral-600" variant="outline">
              Sold
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-black">
            <DialogHeader>
              <DialogTitle>Set your post as Sold</DialogTitle>
              <DialogDescription>
                Are you sure you want to set your product listing as sold?
                <form action={() => postSold.bind(null, params.id)}>
                  <ConfirmButton />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <h1 className="text-lg font-extrabold">Messages for this product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-5">
          <Card className="p-6 w-full space-y-5 dark:bg-inherit dark:border-neutral-200">
            <CardHeader className="p-0">
              <Image
                src={"/Logo.png"}
                alt="User profile photo"
                width={50}
                height={50}
                className="object-cover border border-black dark:border-neutral-200 rounded-full w-28 h-28"
              />
            </CardHeader>
            <CardTitle className="font-normal">Messaged User Name</CardTitle>
            <CardFooter className="p-0">
              <Button>Message</Button>
            </CardFooter>
          </Card>

          <Card className="p-6 w-full space-y-5 dark:bg-inherit dark:border-neutral-200">
            <CardHeader className="p-0">
              <Image
                src={"/Logo.png"}
                alt="User profile photo"
                width={50}
                height={50}
                className="object-cover border border-black dark:border-neutral-200 rounded-full w-28 h-28"
              />
            </CardHeader>
            <CardTitle className="font-normal">Messaged User Name</CardTitle>
            <CardFooter className="p-0">
              <Button>Message</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
