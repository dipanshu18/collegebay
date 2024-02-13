import { SecondaryBtn } from "@repo/ui/secondaryBtn";
import Link from "next/link";

export default function UserSignup() {
  return (
    <div className="hero py-24">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">New here, join us!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="full name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone no.</span>
              </label>
              <input
                type="text"
                placeholder="phone no"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">College</span>
              </label>
              <input
                type="text"
                placeholder="college name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link href="/login" className="label-text-alt link link-hover">
                  Already have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <SecondaryBtn text="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
