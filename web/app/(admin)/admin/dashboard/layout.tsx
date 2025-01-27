import { Logout } from "@/components/logout-btn";
import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="py-2 px-8 flex w-full sticky top-0 bg-white justify-between items-center">
        <h1 className="text-2xl font-extrabold">
          <Link href={"/admin/dashboard"}>Admin Dashboard</Link>
        </h1>

        <div>
          <Logout type="ADMIN" />
        </div>
      </div>
      <main className="p-5">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </>
  );
}
