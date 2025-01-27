import Image from "next/image";
import Link from "next/link";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
import { Logout } from "./logout-btn";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={"/logo.svg"}
        alt="CollegeBay Logo"
        width={20}
        height={20}
        quality={100}
        className="object-cover w-full h-6"
      />
      <Link
        href={"/"}
        className="text-xl text-primary font-semibold  tracking-wide"
      >
        CollegeBay
      </Link>
    </div>
  );
}

const landingRoutes: { title: string; link: string }[] = [
  {
    title: "Features",
    link: "#features",
  },
  {
    title: "Working",
    link: "#working",
  },
  {
    title: "FAQ's",
    link: "#faqs",
  },
];

function ActionButtons() {
  const session = cookies().get("session")?.value;

  return (
    <>
      {session ? (
        <div>
          <Logout type="USER" />
        </div>
      ) : (
        <>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent className="bg-light text-primary">
                <SheetHeader>
                  <VisuallyHidden>
                    <SheetTitle>Nav Content</SheetTitle>
                  </VisuallyHidden>
                  <SheetDescription>
                    <div className="flex flex-col space-y-4 items-start mt-10 w-full text-primary text-lg">
                      <div className="flex flex-col w-full text-left space-y-5">
                        {landingRoutes.map((item, idx) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          <SheetClose asChild key={idx}>
                            <Link href={item.link}>{item.title}</Link>
                          </SheetClose>
                        ))}
                      </div>
                      <div className="flex flex-col w-full text-left space-y-5 mt-10">
                        <SheetClose asChild>
                          <Link
                            className="w-full rounded-md text-left font-bold text-xl"
                            href={"/login"}
                          >
                            Login
                          </Link>
                        </SheetClose>

                        <SheetClose asChild>
                          <Link
                            className="w-full text-left underline font-bold text-xl"
                            href={"/signup"}
                          >
                            Signup
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex md:items-center gap-5">
            {landingRoutes.map((item, idx) => (
              <Link
                className="text-primary tracking-wide font-medium"
                href={item.link}
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={idx}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center gap-5">
            <Link href={"/login"}>
              <Button
                variant="outline"
                className="bg-light text-primary text-lg border-none hover:text-primary py-4 px-6"
              >
                Login
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button className="bg-primary hover:bg-secondary text-lg text-white font-normal py-4 px-6">
                Signup
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur px-5 py-5 w-full bg-light">
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Logo />
        <ActionButtons />
      </div>
    </nav>
  );
}
