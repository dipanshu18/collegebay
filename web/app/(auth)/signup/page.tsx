import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="my-5 p-10 grid place-items-center">
      <h1 className="text-3xl font-extrabold">Hey there, welcome👋</h1>
      <SignupForm />
      <p>
        Already have an account?{" "}
        <Link href={"/login"}>
          <span className="underline">Login</span>
        </Link>
      </p>
    </div>
  );
}
