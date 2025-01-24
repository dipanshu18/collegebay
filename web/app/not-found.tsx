import { cookies } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Logo } from "@/components/navbar";

export default function NotFound() {
  const session = cookies().get("session")?.value;

  return (
    <>
      <div className="px-8 flex py-5">
        <Logo />
      </div>
      <div className="mx-auto max-w-xl text-center p-5">
        <Image
          src={"/404.svg"}
          alt="404 Not Found image"
          width={1080}
          height={1920}
          className="w-full h-96"
        />
        <div className="space-y-3">
          <h1 className="text-5xl font-extrabold text-primary">404</h1>
          <p className="text-xl font-semibold text-accent">
            Oppps! The page you are looking for was not found :(
          </p>
          <Link href={session ? "/home" : "/"} className="w-full h-full block">
            <Button className="w-full flex items-center gap-2 mt-5 bg-accent hover:bg-primary">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
