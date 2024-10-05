import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Authorize = () => {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    password: "",
  });
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  });
  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully");
      }
    });
  };

  return (
    <>
      <div>
        <form onSubmit={loginUser}>
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          ></input>
          <div>
            <input type="submit" value="Sign in" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Authorize;
