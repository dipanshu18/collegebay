import { AdminTable } from "@repo/ui/admintable";

export default function AdminDashboard() {
  return (
    <div className="max-w-xl md:max-w-2xl lg:max-w-5xl mx-auto my-10">
      <div className="mb-16">
        <h1 className="text-center text-2xl font-bold mb-5">
          Users Created Posts
        </h1>
        <AdminTable type="post" />
      </div>

      <div className="mb-16">
        <h1 className="text-center text-2xl font-bold mb-5">
          Users Created Requests
        </h1>
        <AdminTable type="request" />
      </div>
    </div>
  );
}
