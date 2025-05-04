import { useNavigate } from "react-router-dom";

export function Header() {
  const name = localStorage.getItem("username")?.toUpperCase();
  const navigate = useNavigate();
  function profile() {
    navigate("/profile");
  }
  return (
    <div className="flex justify-between p-4  border-b-1 border-grey-100">
      <div className="">
        <svg
          className="w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#185abd"
            d="M24.48,29.316l-9.505,9.505L1.588,25.434c-0.784-0.784-0.784-2.054,0-2.838l6.667-6.667	c0.784-0.784,2.054-0.784,2.838,0L24.48,29.316z"
          ></path>
          <linearGradient
            id="5qKAcydctVb3hkGT27jhwa_HpPqCqynotVp_gr1"
            x1="14.572"
            x2="43.188"
            y1="38.199"
            y2="9.583"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#4191fd"></stop>
            <stop offset="1" stopColor="#55acfd"></stop>
          </linearGradient>
          <path
            fill="url(#5qKAcydctVb3hkGT27jhwa_HpPqCqynotVp_gr1)"
            d="M17.797,41.642l-6.667-6.667c-0.784-0.784-0.784-2.054,0-2.838L36.907,6.358	c0.784-0.784,2.054-0.784,2.838,0l6.667,6.667c0.784,0.784,0.784,2.054,0,2.838L20.634,41.642	C19.851,42.425,18.58,42.425,17.797,41.642z"
          ></path>
        </svg>
      </div>
      <div className="p-2 md:text-2xl">
        <div className="flex">
          Welcome Back &nbsp;&nbsp;<p className="text-blue-700">{name}</p>
        </div>
      </div>
      <div className="font-bold flex gap-3 p-2  md:flex md:justify-between md:w-64">
        <button
          onClick={() => {
            navigate("/home");
          }}
          className="hover:bg-gray-100 hover:text-black rounded-full md:w-24 md:text-center md:pt-1 cursor-pointer"
        >
          Home
        </button>
        <button className="rounded-full" onClick={profile}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 hover:bg-gray-100 hover:text-black rounded-full cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="hidden md:block md:bg-red-900 md:rounded-lg md:p-1 md:hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
