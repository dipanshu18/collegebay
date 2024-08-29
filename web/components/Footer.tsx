import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { CardDescription } from "./ui/card";

export default function Footer() {
  const session = cookies().get("session")?.value;

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-5 my-10 w-full border shadow-md p-5 rounded-md">
      <div className="flex items-center">
        <Image
          src={"/Logo.png"}
          alt="Logo"
          width={100}
          height={100}
          className="object-cover w-full h-10 md:h-20"
        />
        <Link
          href={session ? "/home" : "/"}
          className="text-2xl font-extrabold"
        >
          CollegeBay
        </Link>
      </div>
      <div>
        <h1>©️ All copyrights reserved 2024.</h1>
        <CardDescription>
          Reach out to us at:{" "}
          <span className="text-slate-700 underline">
            dipanshu.torawane@vit.edu.in
          </span>
        </CardDescription>
      </div>
    </div>
  );
}
