import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronUp } from "lucide-react";
import Image from "next/image";

export default function OthersRequest() {
  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold my-5 text-center">
        Products that aren{`'`}t available on posted listings but users need 🥺
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-5">
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            magnam, quod sit sapiente similique quaerat ad neque qui illo fugit
            eos veritatis distinctio deleniti labore obcaecati voluptates. Sed,
            necessitatibus maxime.
          </CardDescription>
          <CardFooter className="gap-5">
            <Button className="flex items-center gap-2">
              <ChevronUp /> 0
            </Button>
            <Button variant="outline" className="w-full dark:bg-slate-600">
              Contact
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
