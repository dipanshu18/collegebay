import Image from "next/image";

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IndianRupee, Star } from "lucide-react";
import type { IPost } from "@/actions/types";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import { FeedbackForm } from "./feedback-form";

export function PurchasedCard({ post }: { post: IPost }) {
  console.log("PURCHASED:", post);
  return (
    <Card
      className={cn(
        "space-y-2 w-full h-full flex flex-col sm:mx-0 border-0 hover:shadow-md bg-gray-50 transition-all duration-300",
        !post.isAvailable && "bg-top"
      )}
    >
      <Image
        src={post.images[0]}
        width={500}
        height={500}
        quality={100}
        alt="Product image"
        className="w-full object-contain rounded-t h-52 bg-white"
      />
      <div className="absolute">
        {!post.isAvailable && (
          <div className="bg-primary relative -top-5 right-0 text-white px-4 py-2 rounded-md">
            Sold
          </div>
        )}
      </div>
      <div className="flex-1">
        <CardTitle className="flex justify-between px-6">
          <div>
            <h1 className="text-xl text-secondary">{post.title}</h1>
          </div>
          <div>
            <h1 className="flex items-center text-base text-secondary">
              <IndianRupee size={18} /> {post.price}
            </h1>
          </div>
        </CardTitle>
        <CardDescription className="px-6 text-sm space-y-5 text-primary">
          {`${post.description.slice(0, 90)}...`}
        </CardDescription>
      </div>
      <CardFooter className="flex justify-between">
        {post.feeback ? (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-primary">
              Feedback:
            </h3>
            <p className="flex items-center text-yellow-400">
              {[...Array(post.feeback.rating)].map((_, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Star key={idx} />
              ))}
            </p>
            {post.feeback.text && (
              <p className="text-secondary">{post.feeback.text}</p>
            )}
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full dark:bg-neutral-600" variant="outline">
                Give feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-black">
              <DialogHeader>
                <DialogTitle className="tracking-normal text-lg font-semibold">
                  Give feedback for the product and user interaction for other
                  users to trust the seller{" "}
                  <span className="text-accent">
                    (you cannot edit this in the future)
                  </span>
                </DialogTitle>
                <DialogDescription className="space-y-2">
                  <FeedbackForm postId={post.id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
