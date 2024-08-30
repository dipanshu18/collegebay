import EditProductListingForm from "@/components/EditProductListingForm";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function YourPostDetails() {
  return (
    <div className="my-5 p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full my-5">
          <ImageCarousel />
        </div>
        <div className="col-span-2 space-y-3 w-full my-10">
          <h1 className="text-2xl font-bold">Product Title</h1>
          <p className="text-sm text-slate-700 dark:text-slate-200 text-wrap">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            aliquam ipsa inventore itaque nihil nam a eligendi, iste, explicabo
            ex officia veniam aliquid illo pariatur culpa ut molestiae
            repellendus vel harum vero quisquam. Pariatur dolore eveniet
            quisquam repudiandae, corrupti cumque ipsa iste. Quae quos repellat
            corporis omnis fugit, quia quas.
          </p>
          <p className="font-extrabold text-xl">$300</p>
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
                Make changes to your listing here. Click save when you{`'`}re
                done.
              </DialogDescription>
            </DialogHeader>
            <EditProductListingForm />
          </DialogContent>
        </Dialog>
        <Button className="w-full" variant="destructive">
          Delete Post
        </Button>
        <Button className="w-full dark:bg-slate-600" variant="outline">
          Sold
        </Button>
      </div>

      <div>
        <h1 className="text-lg font-extrabold">Messages for this product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-5">
          <Card className="p-6 w-full space-y-5 dark:bg-inherit dark:border-slate-200">
            <CardHeader className="p-0">
              <Image
                src={"/Logo.png"}
                alt="User profile photo"
                width={50}
                height={50}
                className="object-cover border border-black dark:border-slate-200 rounded-full w-28 h-28"
              />
            </CardHeader>
            <CardTitle className="font-normal">Messaged User Name</CardTitle>
            <CardFooter className="p-0">
              <Button>Message</Button>
            </CardFooter>
          </Card>

          <Card className="p-6 w-full space-y-5 dark:bg-inherit dark:border-slate-200">
            <CardHeader className="p-0">
              <Image
                src={"/Logo.png"}
                alt="User profile photo"
                width={50}
                height={50}
                className="object-cover border border-black dark:border-slate-200 rounded-full w-28 h-28"
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
