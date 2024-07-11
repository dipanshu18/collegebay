import { PrimaryBtn } from "@repo/ui/primaryBtn";
import Link from "next/link";

export default function UserSignup() {
  return (
    <div className="hero mt-10">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-5">New here, join us!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
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
              <small className="font-medium text-rose-600">
                NOTE: You won't be able to update{" "}
                <strong className="text-rose-700">phone no </strong> and{" "}
                <strong className="text-rose-700">college </strong>
                after creating account
              </small>
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
              <PrimaryBtn text="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
