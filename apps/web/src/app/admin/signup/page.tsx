import { PrimaryBtn } from "@repo/ui/primaryBtn";
import Link from "next/link";

export default function AdminSignup() {
  return (
    <div className="hero py-24">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-5">New here, join us!</h1>
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
                  href="/admin/login"
                  className="label-text-alt link link-hover"
                >
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
