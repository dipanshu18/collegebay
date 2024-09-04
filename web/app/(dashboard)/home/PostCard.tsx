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
import { Post } from "./PostPage";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card
      className={cn(
        "space-y-2 w-full dark:bg-inherit dark:border-slate-100",
        !post.isAvailable && "bg-top bg-slate-100 dark:bg-slate-950"
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
        <div className="relative">
          {!post.isAvailable && (
            <div className="bg-emerald-600 absolute right-0 text-white px-4 py-2 rounded-md">
              Sold
            </div>
          )}
        </div>
      </CardHeader>
      <CardTitle className="px-6">{post.title}</CardTitle>
      <CardDescription className="px-6 dark:text-slate-200">
        {post.description}
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
