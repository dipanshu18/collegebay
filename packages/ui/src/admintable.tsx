import Link from "next/link";

import { SecondaryBtn } from "./secondaryBtn";
import { PrimaryBtn } from "./primaryBtn";

type tableType = "post" | "request";

export function AdminTable({ type }: { type: tableType }) {
  return (
    <div className="overflow-x-auto bg-primary-content rounded-lg">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Item</th>
            {type === "post" && <th>Price</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">User Full Name</div>
                  <div className="text-sm opacity-50">College Name</div>
                </div>
              </div>
            </td>
            <td>Item Name</td>
            {type === "post" && <td>$99.99</td>}
            <th>
              <Link
                href={
                  type === "post"
                    ? "/admin/dashboard/post/:id"
                    : "/admin/dashboard/request/:id"
                }
              >
                <PrimaryBtn text="details" />
              </Link>
            </th>
          </tr>

          <tr className="hover">
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">User Full Name</div>
                  <div className="text-sm opacity-50">College Name</div>
                </div>
              </div>
            </td>
            <td>Item Name</td>
            {type === "post" && <td>$99.99</td>}
            <th>
              <Link
                href={
                  type === "post"
                    ? "/admin/dashboard/post/:id"
                    : "/admin/dashboard/request/:id"
                }
              >
                <PrimaryBtn text="details" />
              </Link>
            </th>
          </tr>

          <tr className="hover">
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">User Full Name</div>
                  <div className="text-sm opacity-50">College Name</div>
                </div>
              </div>
            </td>
            <td>Item Name</td>
            {type === "post" && <td>$99.99</td>}
            <th>
              <Link
                href={
                  type === "post"
                    ? "/admin/dashboard/post/:id"
                    : "/admin/dashboard/request/:id"
                }
              >
                <PrimaryBtn text="details" />
              </Link>
            </th>
          </tr>

          <tr className="hover">
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">User Full Name</div>
                  <div className="text-sm opacity-50">College Name</div>
                </div>
              </div>
            </td>
            <td>Item Name</td>
            {type === "post" && <td>$99.99</td>}
            <th>
              <Link
                href={
                  type === "post"
                    ? "/admin/dashboard/post/:id"
                    : "/admin/dashboard/request/:id"
                }
              >
                <PrimaryBtn text="details" />
              </Link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
