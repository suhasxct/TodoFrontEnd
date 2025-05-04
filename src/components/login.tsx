import { useRef } from "react";
import { Password } from "./password";
import { Link, useNavigate } from "react-router-dom";
export function Login() {
  const email: any = useRef("");
  const password: any = useRef("");
  const navigate = useNavigate();
  const login = async () => {
    const Email = email.current.value;
    const PasswordValue = password.current.value;
    try {
      const response = await fetch(
        "https://todobackend-pro.up.railway.app/user/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: Email,
            password: PasswordValue,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (data.Message == "Login") {
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen">
      <div className="w-full max-w-md flex flex-col items-center p-6">
        <div className="text-[#f5fafa] text-4xl mb-4">Login</div>

        <div className="w-full text-white mb-4">
          <p className="mb-1">Work Email</p>
          <input
            className="bg-[#202831] rounded-lg w-full p-2"
            type="text"
            ref={email}
            placeholder="name@work.com"
          />
        </div>

        <div className="text-white w-full mb-4">
          <p className="mb-1">Password</p>
          <Password reference={password} />
        </div>
        <button
          onClick={login}
          className="w-full text-black rounded-lg bg-white p-2 m-4 hover:bg-gray-400 cursor-pointer"
        >
          Login
        </button>
        <div className="text-sm text-gray-200">or</div>
        <div className="w-full p-3 m-4">
          <a href="https://todobackend-pro.up.railway.app/auth/google">
            <button className="w-full text-black rounded-lg bg-white hover:bg-gray-400 p-2 cursor-pointer">
              Login with Google
            </button>
          </a>
        </div>
        <div className="text-white text-sm flex  justify-center w-full">
          <div className="">
            Don't have an account?&nbsp;
            <Link className="text-[#69679c] underline" to="/">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
