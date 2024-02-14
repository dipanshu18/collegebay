import Link from "next/link";

import { PrimaryBtn } from "./primaryBtn";
import { SecondaryBtn } from "./secondaryBtn";

type postType = "self" | "other";

export function PostsCard({ type }: { type: postType }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl transition-all hover:scale-105">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">Available</div>
        </h2>
        <div>
          <h1 className="font-medium">Price: $99.99</h1>
          <p>
            {type === "self"
              ? "Last updated: 11/11/11"
              : "Posted date: 12/12/12"}
          </p>
        </div>
        <div className="card-actions justify-end">
          <Link
            href={type === "self" ? "/user-posts/:id" : "dashboard/post/:id"}
          >
            <PrimaryBtn
              text={type === "self" ? "Edit details" : "See details"}
            />
          </Link>
          {type === "self" && (
            <Link href="/user-posts">
              <SecondaryBtn text="Sold" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
