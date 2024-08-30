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

export default function Home() {
  return (
    <div className="my-5">
      <div className="bg-slate-500 p-5 rounded-md">
        <h1 className="text-white">Do it later...</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-10">
        <Card className="space-y-2 w-full dark:bg-inherit dark:border-slate-100">
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
          <CardDescription className="px-6 dark:text-slate-200">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            magnam, quod sit sapiente similique quaerat ad neque qui illo fugit
            eos veritatis distinctio deleniti labore obcaecati voluptates. Sed,
            necessitatibus maxime.
          </CardDescription>
          <CardFooter>
            <Link href={"/home/:id"}>
              <Button>More details</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="space-y-2 w-full dark:bg-inherit dark:border-slate-100">
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
          <CardDescription className="px-6 dark:text-slate-200">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            magnam, quod sit sapiente similique quaerat ad neque qui illo fugit
            eos veritatis distinctio deleniti labore obcaecati voluptates. Sed,
            necessitatibus maxime.
          </CardDescription>
          <CardFooter>
            <Link href={"/home/:id"}>
              <Button>More details</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
