import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/components/lib/utils";
import type { IPost } from "@/actions/types";
import { IndianRupee } from "lucide-react";

export function PostCard({ post }: { post: IPost }) {
  return (
    <Card
      className={cn(
        "space-y-2 w-full flex flex-col max-w-sm mx-auto sm:mx-0 border-0 hover:shadow-lg transition-all duration-300 bg-neutral-50",
        !post.isAvailable && "bg-top"
      )}
    >
      <Image
        src={`https://dzgbuobd25m4d.cloudfront.net/${post.images[0]}`}
        width={500}
        height={500}
        quality={100}
        alt="Product image"
        className="w-full object-contain h-52 bg-white"
      />
      <div className="absolute">
        {!post.isAvailable && (
          <div className="bg-light relative -top-5 right-0 text-white px-4 py-2 rounded-md">
            Sold
          </div>
        )}
      </div>
      <div className="flex-1">
        <CardTitle className="flex justify-between px-6">
          <div>
            <h1 className="text-xl">{post.title}</h1>
          </div>
          <div>
            <h1 className="flex items-center text-base">
              <IndianRupee size={18} /> {post.price}
            </h1>
          </div>
        </CardTitle>
        <CardDescription className="px-6 text-sm space-y-5">
          {`${post.description.slice(0, 90)}...`}
        </CardDescription>
      </div>
      <CardFooter className="flex justify-between">
        <Link href={`/home/${post.id}`}>
          <Button>More details</Button>
        </Link>
        <p className="text-xs text-wrap">
          Created{" "}
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        </p>
      </CardFooter>
    </Card>
  );
}
