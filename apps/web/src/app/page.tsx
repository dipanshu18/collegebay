import Link from "next/link";

import Image from "next/image";
import LandingPoster from "../../public/landing_poster.jpg";

import { PrimaryBtn } from "@repo/ui/primaryBtn";
import { FAQ } from "@repo/ui/faq";

export default function Home() {
  return (
    <main>
      <div className="px-4 py-12 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-10">
          <Image
            src={LandingPoster}
            alt="Student using Laptop"
            className="max-w-sm w-full"
          />
          <div className="col-span-2">
            <h1 className="text-3xl lg:text-5xl font-bold">CollegeBay</h1>
            <p className="py-6">
              This is a web app whose main focus is to provide an online
              marketplace for college students to buy and sell college-related
              materials. The platform is designed to make it easy for students
              to find what they need, sell what they don't, and connect with
              other students in the same college or university.
            </p>
            <Link href="/signup">
              <PrimaryBtn text="Get Started" />
            </Link>
          </div>
        </div>
      </div>

      <section className="my-10 pb-24">
        <h1 className="text-5xl font-bold my-10 text-center">FAQ's</h1>
        <div>
          <FAQ />
        </div>
      </section>

      <footer className="footer footer-center p-4 bg-base-100 text-base-content">
        <aside>
          <p>Copyright © 2024 - All right reserved by CollegeBay</p>
        </aside>
      </footer>
    </main>
  );
}
