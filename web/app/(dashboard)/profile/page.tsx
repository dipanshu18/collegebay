import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="text-center my-5">
      <h1 className="text-3xl font-semibold">Your Profile 🤗</h1>

      <div className="space-y-10">
        <div className="max-w-lg mx-auto mt-5 border shadow rounded-md p-5">
          <div className="w-full flex justify-center items-center">
            <Image
              src={"/Logo.png"}
              alt="User profile photo"
              width={50}
              height={50}
              className="w-24 h-24 object-cover rounded-full border dark:border-slate-100"
            />
          </div>
          <div className="text-left col-span-2 py-5 w-full space-y-5">
            <p className="text-lg font-extrabold">
              <span className="font-extralight">Name:</span> Dipanshu Torawane
            </p>
            <p className="text-lg font-extrabold overflow-scroll md:overflow-auto">
              <span className="font-extralight">Email:</span>{" "}
              dipanshu.torawane@vit.edu.in
            </p>
            <p className="text-lg font-extrabold">
              <span className="font-extralight">College:</span> Vidyalankar
              Institute of Technology, Mumbai
            </p>
            <p className="text-lg font-extrabold">
              <span className="font-extralight">Phone no:</span> 7990582647
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="dark:bg-slate-600" variant="outline">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-black">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you{`'`}re
                  done.
                </DialogDescription>
              </DialogHeader>
              <UpdateProfileForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="text-left">
          <div className="my-10">
            <div>
              <h1 className="text-xl font-semibold">Your Posts</h1>
              <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                <Card className="space-y-2 w-full dark:bg-inherit dark:border-slate-200">
                  <CardHeader>
                    <Image
                      src={"/Logo.png"}
                      width={50}
                      height={50}
                      alt="Product image"
                      className="w-full object-cover h-52"
                    />
                  </CardHeader>
                  <CardTitle className="px-6">Product title</CardTitle>
                  <CardDescription className="px-6">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptatem magnam, quod sit sapiente similique quaerat ad
                    neque qui illo fugit eos veritatis distinctio deleniti
                    labore obcaecati voluptates. Sed, necessitatibus maxime.
                  </CardDescription>
                  <CardFooter>
                    <Link href={"/profile/your-posts/:id"}>
                      <Button>More details</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="space-y-2 dark:bg-inherit dark:border-slate-200">
                  <CardHeader>
                    <Image
                      src={"/Logo.png"}
                      width={50}
                      height={50}
                      alt="Product image"
                      className="w-full object-cover h-52"
                    />
                  </CardHeader>
                  <CardTitle className="px-6">Product title</CardTitle>
                  <CardDescription className="px-6">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptatem magnam, quod sit sapiente similique quaerat ad
                    neque qui illo fugit eos veritatis distinctio deleniti
                    labore obcaecati voluptates. Sed, necessitatibus maxime.
                  </CardDescription>
                  <CardFooter>
                    <Link href={"/profile/your-posts/:id"}>
                      <Button>More details</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="space-y-2 dark:bg-inherit dark:border-slate-200">
                  <CardHeader>
                    <Image
                      src={"/Logo.png"}
                      width={50}
                      height={50}
                      alt="Product image"
                      className="w-full object-cover h-52"
                    />
                  </CardHeader>
                  <CardTitle className="px-6">Product title</CardTitle>
                  <CardDescription className="px-6">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptatem magnam, quod sit sapiente similique quaerat ad
                    neque qui illo fugit eos veritatis distinctio deleniti
                    labore obcaecati voluptates. Sed, necessitatibus maxime.
                  </CardDescription>
                  <CardFooter>
                    <Link href={"/profile/your-posts/:id"}>
                      <Button>More details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
            <div className="my-10">
              <h1 className="text-xl font-semibold">Your Requests</h1>
              <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                <Card className="space-y-2 dark:bg-inherit dark:border-slate-200">
                  <CardHeader>
                    <Image
                      src={"/Logo.png"}
                      width={50}
                      height={50}
                      alt="Product image"
                      className="w-full object-cover h-52"
                    />
                  </CardHeader>
                  <CardTitle className="px-6">Product title</CardTitle>
                  <CardDescription className="px-6">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Voluptatem magnam, quod sit sapiente similique quaerat ad
                    neque qui illo fugit eos veritatis distinctio deleniti
                    labore obcaecati voluptates. Sed, necessitatibus maxime.
                  </CardDescription>
                  <CardFooter>
                    <Button variant="destructive">Delete Request</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
