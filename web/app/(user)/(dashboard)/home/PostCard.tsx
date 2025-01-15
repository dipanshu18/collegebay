import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/components/lib/utils";
import type { IPost } from "@/api/types";

export default function PostCard({ post }: { post: IPost }) {
  return (
    <Card
      className={cn(
        "space-y-5 w-full max-h-[600px] dark:bg-neutral-900 dark:border-neutral-100",
        !post.isAvailable && "bg-top bg-neutral-100 dark:bg-neutral-950"
      )}
    >
      <CardHeader>
        <Image
          src={`https://dzgbuobd25m4d.cloudfront.net/${post.images[0]}`}
          width={500}
          height={500}
          alt="Product image"
          className="w-full object-cover h-52"
        />
        <div className="absolute">
          {!post.isAvailable && (
            <div className="bg-green-600 relative -top-5 right-0 text-white px-4 py-2 rounded-md">
              Sold
            </div>
          )}
        </div>
      </CardHeader>
      <CardTitle className="px-6 text-3xl">{post.title}</CardTitle>
      <CardDescription className="px-6 text-lg space-y-5  dark:text-neutral-200">
        <p>{`${post.description.slice(0, 55)}...`}</p>
        <p>
          Created{" "}
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        </p>
      </CardDescription>
      <CardFooter>
        <Link href={`/home/${post.id}`}>
          <Button>More details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
