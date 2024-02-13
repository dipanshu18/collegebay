import Link from "next/link";

import { PrimaryBtn } from "@repo/ui/primaryBtn";
import { FAQ } from "@repo/ui/faq";

export default function Home() {
  return (
    <main>
      <header>
        <div className="hero py-24 lg:py-32">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">Box Office News!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <Link href="/signup">
                <PrimaryBtn text="Get Started" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="my-10 py-24">
        <h1 className="text-5xl font-bold my-10 text-center">What we do?</h1>
        <div className="max-w-full mx-10 sm:mx-auto flex justify-center items-center flex-wrap gap-10">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
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
