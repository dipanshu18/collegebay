import LoginForm from "./LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="my-5 p-10 grid place-items-center">
      <h1 className="text-3xl font-extrabold">Welcome back 😊</h1>
      <LoginForm />
      <p>
        Not have an account?{" "}
        <Link href={"/signup"}>
          <span className="underline">Create one</span>
        </Link>
      </p>
    </div>
  );
}
