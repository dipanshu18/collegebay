import Link from "next/link";
import { SecondaryBtn } from "./secondaryBtn";
import { PrimaryBtn } from "./primaryBtn";

type LoginType = "user" | "admin";

export function LoginForm({ type }: { type: LoginType }) {
  return (
    <div className="hero py-24">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Hey, welcome back!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
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
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link
                  href={type === "admin" ? "/admin/signup" : "/signup"}
                  className="label-text-alt link link-hover"
                >
                  Not have an account? Create one
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <PrimaryBtn text="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}