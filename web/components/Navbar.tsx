import Image from "next/image";
import { cookies } from "next/headers";
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
import LogoutBtn from "./LogoutBtn";

function Logo() {
  const session = cookies().get("session")?.value;

  return (
    <div className="flex items-center">
      <Image
        src={"/Logo.png"}
        alt="Logo"
        width={100}
        height={100}
        className="object-cover w-full h-8"
      />
      <Link href={session ? "/home" : "/"} className="text-lg font-extrabold">
        CollegeBay
      </Link>
    </div>
  );
}

const authRoutes: { title: string; link: string }[] = [
  {
    title: "Login",
    link: "/login",
  },
  {
    title: "Signup",
    link: "/signup",
  },
];

const homeRoutes: { title: string; link: string }[] = [
  {
    title: "Others Request",
    link: "/others-request",
  },
  {
    title: "Post",
    link: "/post",
  },
  {
    title: "Request",
    link: "/request",
  },
  {
    title: "Profile",
    link: "/profile",
  },
];

function ActionButtons() {
  const session = cookies().get("session")?.value;

  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <VisuallyHidden>
                <SheetTitle>Nav Content</SheetTitle>
              </VisuallyHidden>
              <SheetDescription>
                <div className="flex flex-col space-y-4 items-start mt-10 w-full text-black dark:text-white text-lg">
                  {session ? (
                    <>
                      {homeRoutes.map((item, idx) => (
                        <SheetClose asChild key={idx}>
                          <Link href={item.link}>{item.title}</Link>
                        </SheetClose>
                      ))}

                      <SheetClose asChild>
                        <LogoutBtn />
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      {authRoutes.map((item, idx) => (
                        <SheetClose asChild key={idx}>
                          <Link href={item.link}>{item.title}</Link>
                        </SheetClose>
                      ))}
                    </>
                  )}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex md:items-center gap-5 md:space-x-5">
        {session ? (
          <>
            {homeRoutes.map((item, idx) => (
              <Link
                href={item.link}
                key={idx}
                className="w-full hover:text-neutral-600 dark:hover:text-neutral-300 transition-all duration-500 whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
            <LogoutBtn />
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href={"/signup"}>
              <Button>Signup</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur flex justify-between items-center border mt-5 shadow rounded-md px-5 py-3">
      <Logo />
      <ActionButtons />
    </nav>
  );
}
