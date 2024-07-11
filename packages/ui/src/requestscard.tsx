import Link from "next/link";

import { PrimaryBtn } from "./primaryBtn";
import { SecondaryBtn } from "./secondaryBtn";

type requestType = "self" | "other";

export function RequestsCard({ type }: { type: requestType }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl transition-all hover:scale-105">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>

        {type === "self" ? (
          <></>
        ) : (
          <h3 className="font-extrabold">Requester Name</h3>
        )}

        <div className="card-actions justify-end">
          {type === "other" && (
            <Link href="/requests">
              <PrimaryBtn text="Message" />
            </Link>
          )}
          {type === "self" && (
            <Link href="/user-requests">
              <SecondaryBtn text="Delete" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
