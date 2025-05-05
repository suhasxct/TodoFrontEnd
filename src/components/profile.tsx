import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Buffer } from "./buffer";
export function Profile() {
  const ref = useRef<HTMLInputElement>(null);
  const [username, setusername] = useState<String>("");
  const [lastname, setlastname] = useState<String>("");
  const [firstname, setfirstname] = useState<String>("");
  const [loading, setloading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [image, setimage] = useState<string>(
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  );
  function press() {
    ref.current?.click();
  }
  function change() {
    if (!ref.current?.files?.[0]) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result as string;
      setimage(base64Image);
      try {
        await fetch("https://todobackend-pro.up.railway.app/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token") ?? "",
          },
          body: JSON.stringify({
            query: `
                  mutation setprofilepic($url: String!) {
                    setprofilepic(url: $url)
                  }
                `,
            variables: { url: base64Image },
          }),
        });
      } catch (error) {
        console.error("Mutation failed:", error);
      }
    };
    reader.readAsDataURL(ref.current.files[0]);
  }
  useEffect(() => {
    async function setprofile() {
      setloading(true);
      try {
        const response = await fetch(
          "https://todobackend-pro.up.railway.app/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token") ?? "",
            },
            body: JSON.stringify({
              query: `
                {getprofilepic{id,profile,username,firstName,lastName}}
            `,
            }),
          }
        );
        const result = await response.json();
        setusername(result.data.getprofilepic.username);
        setfirstname(result.data.getprofilepic.firstName);
        setlastname(result.data.getprofilepic.lastName);
        if (result.data.getprofilepic.profile != null) {
          setimage(result.data.getprofilepic.profile);
        }
        setloading(false);
      } catch (error) {
        console.error("Mutation failed:", error);
      }
    }

    setprofile();
  }, []);

  return (
    <div>
      <div className="hidden md:block md:bg-black md:text-white md:pl-15 md:pr-15">
        <Header />
      </div>
      <div
        onClick={() => {
          navigate("/home");
        }}
        className="text-white bg-black p-4 block w-full flex md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        &nbsp;Back
      </div>
      {loading ? (
        <div className="text-white bg-black pb-10 w-full flex h-screen items-center justify-center">
          <Buffer />
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center p-5 w-full min-h-screen bg-black md:flex md:flex-col md:justify-center">
          <div className="flex flex-col gap-5 items-center p-5 md:w-xl rounded-lg  bg-black md:flex md:flex-col md:justify-center md:bg-[#2f3133]">
            <div>
              <img
                className="w-24 h-24 rounded-full border-1 border-black object-fill"
                src={image}
                alt="Profile Pic"
              />
            </div>
            <input
              className="display hidden"
              onChange={change}
              type="file"
              ref={ref}
            />
            <div className="text-white flex w-full gap-6 pl-4 md:flex md:justify-center">
              <p className="font-bold font-serif">username:</p>
              <p className="text-[#5cd5fb]">{username}</p>
            </div>
            <div className="text-white flex w-full gap-6 pl-4 md:flex md:justify-center">
              <p className="font-bold font-serif">Firstname:</p>
              <p className="text-[#5cd5fb]">{firstname}</p>
            </div>
            <div className="text-white flex w-full gap-6 pl-4 md:flex md:justify-center">
              <p className="font-bold font-serif">Lastname:</p>
              <p className="text-[#5cd5fb]">{lastname}</p>
            </div>
            <button
              className="bg-green-900 text-white rounded-lg p-2 hover:bg-green-700 cursor-pointer"
              onClick={press}
            >
              Change Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="block text-white md:hidden bg-red-900 rounded-lg p-2"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
