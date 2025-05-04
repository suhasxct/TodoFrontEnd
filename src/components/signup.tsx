import { useRef } from "react";
import { Password } from "./password";
import { Link, useNavigate } from "react-router-dom";
export function Signup() {
  const email: any = useRef("");
  const password: any = useRef("");
  const firstname: any = useRef("");
  const lastname: any = useRef("");
  const navigate = useNavigate();
  const signup = async () => {
    const Email = email.current.value;
    const PasswordValue = password.current.value;
    const Firstname = firstname.current.value;
    const Lastname = lastname.current.value;
    try {
      localStorage.setItem("name", Firstname);
      const response = await fetch(
        "https://todobackend-pro.up.railway.app/user/signup",
        {
          method: "POST",
          body: JSON.stringify({
            email: Email,
            password: PasswordValue,
            firstname: Firstname,
            lastname: Lastname,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.message == "User Created Successfully") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-black min-h-screen">
      <div className="w-full max-w-md flex flex-col items-center p-6">
        <div className="text-[#f5fafa] text-4xl mb-4">Signup</div>

        <div className="w-full text-white mb-4">
          <p className="mb-1">Work Email</p>
          <input
            className="bg-[#202831] rounded-lg w-full p-2"
            type="text"
            ref={email}
            placeholder="name@work.com"
          />
        </div>

        <div className="w-full gap-4 flex flex-col md:flex-row mb-4">
          <div className="text-white w-full">
            <p className="mb-1">First Name</p>
            <input
              className="bg-[#202831] rounded-lg w-full p-2"
              type="text"
              ref={firstname}
              placeholder="First Name"
            />
          </div>
          <div className="text-white w-full">
            <p className="mb-1">Last Name</p>
            <input
              className="bg-[#202831] rounded-lg w-full p-2"
              type="text"
              ref={lastname}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="text-white w-full mb-4">
          <p className="mb-1">Password</p>
          <Password reference={password} />
        </div>

        <button
          onClick={signup}
          className="w-full text-black rounded-lg bg-white p-3 m-4 hover:bg-gray-200 cursor-pointer"
        >
          Signup
        </button>

        <div className="text-white text-sm">
          <p>
            Already have an account?&nbsp;
            <Link className="text-[#69679c] underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
