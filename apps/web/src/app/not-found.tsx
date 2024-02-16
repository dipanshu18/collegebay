import Link from "next/link";
import { GoAlertFill } from "react-icons/go";

export default function NotFound() {
  return (
    <div className="my-10 flex flex-col justify-center items-center">
      <GoAlertFill className="text-9xl" />
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-3xl">Not found</h2>
      <p className="text-xl">
        The resource you&apos;re looking for is not available...
      </p>
      <Link href="/" className="btn btn-warning mt-10">
        Go Home
      </Link>
    </div>
  );
}
