import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { CardDescription } from "./ui/card";

export default function Footer() {
  const session = cookies().get("session")?.value;

  return (
    <footer className="my-5 p-5">
      <div className="flex flex-col space-y-2 border-t py-5 max-w-5xl mx-auto w-full ">
        <h1 className="text-secondary">
          ©️ 2024 CollegeBay. All copyrights reserved.
        </h1>
      </div>
    </footer>
  );
}
