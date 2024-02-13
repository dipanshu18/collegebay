import Link from "next/link";

import { PrimaryBtn } from "./primaryBtn";

type requestType = "self" | "other";

export function RequestsCard({ type }: { type: requestType }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
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
          <Link href={type === "self" ? "/user-requests" : "/requests"}>
            <PrimaryBtn text={type === "self" ? "Edit details" : "Message"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
