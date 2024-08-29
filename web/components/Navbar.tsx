import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
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

function ActionButtons() {
  const session = cookies().get("session")?.value;

  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col space-y-4 items-start mt-10 w-full text-black text-lg">
                  {session ? (
                    <>
                      <Link href={"/"}>Post</Link>
                      <Link href={"/"}>Request</Link>
                      <Link href={"/"}>Profile</Link>
                      <LogoutBtn />
                    </>
                  ) : (
                    <>
                      <Link href={"/login"}>Login</Link>
                      <Link href={"/signup"}>Signup</Link>
                    </>
                  )}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex md:items-center md:space-x-5">
        {session ? (
          <>
            <Link href={"/"}>Post</Link>
            <Link href={"/"}>Request</Link>
            <Link href={"/"}>Profile</Link>
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
    <nav className="sticky top-0 backdrop-blur flex justify-between items-center border mt-5 shadow rounded-md px-10 py-4">
      <Logo />
      <ActionButtons />
    </nav>
  );
}
