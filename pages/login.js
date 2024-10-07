import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const Login = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  });

  return (
    <div className={poppins.className}>
      <div>
        <div onClick={() => signIn("google")}>
          <div>Sign in with Google</div>
        </div>
        <br />
        <Link href="/register">
          <i>Create Account</i>
        </Link>
      </div>
    </div>
  );
};

export default Login;
