import Link from "next/link";

import Image from "next/image";
import LandingPoster from "../../public/landing_poster.jpg";
import CreatePost from "../../public/post.jpg";
import Connect from "../../public/connect.png";
import Checking from "../../public/checking.jpg";

import { PrimaryBtn } from "@repo/ui/primaryBtn";
import { FAQ } from "@repo/ui/faq";
import { FaArrowDown } from "react-icons/fa6";

export default function Home() {
  return (
    <main>
      <header>
        <div className="hero py-24 lg:py-32">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <Image
              src={LandingPoster}
              alt="Student using Laptop"
              width={300}
              className="max-w-sm"
            />
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">CollegeBay</h1>
              <p className="p-6">
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
        <div className="animate-bounce text-blue-700 bg-slate-100 rounded-full max-w-10 h-10 mx-auto flex justify-center items-center">
          <FaArrowDown />
        </div>
      </header>

      <section className="my-10 py-24">
        <h1 className="text-5xl font-bold my-10 text-center">What we do?</h1>
        <div className="max-w-full mx-10 sm:mx-auto flex justify-center items-center flex-wrap gap-16">
          <div className="card w-96 bg-base-100 shadow-xl transition-all hover:scale-105">
            <figure>
              <Image
                src={CreatePost}
                height={250}
                alt="Creating Post about item"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Create Item Post/Request</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl transition-all hover:scale-105">
            <figure>
              <Image src={Connect} height={250} alt="Connect with seller" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Get in touch with seller</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl transition-all hover:scale-105">
            <figure>
              <Image
                src={Checking}
                height={250}
                alt="Checking user post before listing"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Strict checking</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      </section>

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
