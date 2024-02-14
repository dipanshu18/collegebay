import { PrimaryBtn } from "@repo/ui/primaryBtn";
import { SecondaryBtn } from "@repo/ui/secondaryBtn";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="py-12  flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-10">Your Profile</h1>

      <div className="card w-full max-w-lg shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <label className="label">
              <span className="font-bold">Your name</span>
            </label>
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <label className="label">
              <span className="font-bold">Your email</span>
            </label>
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Phone no</span>
            </label>
            <label className="label">
              <span className="font-bold">Your phone no</span>
            </label>
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">College</span>
            </label>
            <label className="label">
              <span className="font-bold">Your college name</span>
            </label>
          </div>
          <div className="flex mt-6 gap-5">
            <Link href="/profile/:id">
              <PrimaryBtn text="Update" />
            </Link>
            <Link href="/">
              <SecondaryBtn text="Delete account" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
