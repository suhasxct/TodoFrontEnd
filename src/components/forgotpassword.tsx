import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export function Forgot() {
  const email: any = useRef("");
  const navigate = useNavigate();
  const submit = async () => {
    navigate("/otp");
    const Email = email.current.value;
    try {
      const response = await fetch(
        "http://localhost:4000/user/forgotpassword",
        {
          method: "POST",
          body: JSON.stringify({
            email: Email,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.Message == "otp generated") {
        navigate("/otp");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen">
      <div className="w-full max-w-md flex flex-col items-center p-6">
        <div className="text-[#f5fafa] text-4xl mb-4">Reset Password</div>

        <div className="w-full text-white mb-4">
          <p className="mb-1">Work Email</p>
          <input
            className="bg-[#202831] rounded-lg w-full p-2"
            type="text"
            ref={email}
            placeholder="name@work.com"
          />
        </div>
        <button
          onClick={submit}
          className="w-full text-black rounded-lg bg-white p-3 m-4 hover:bg-gray-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
