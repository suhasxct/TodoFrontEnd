import { useContext, useRef, useState } from "react";
import { InputContext } from "./context";
import { SearchComp } from "./searchcomp";
export function Search() {
  const ref: any = useRef("");
  const { setshowsearchcomp, setsearchComp } = useContext(InputContext);
  const [timer, settimer]: any = useState<any>(null);
  function makeinvisible() {
    setshowsearchcomp(false);
    ref.current.value = null;
    const temp: any = [];
    setsearchComp(temp);
  }
  function makevisible() {
    setshowsearchcomp(true);
  }
  function search() {
    async function call() {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          body: JSON.stringify({
            query: `
                    query SearchTodos($search:String) {
                      searchTodos(search: $search) {
                        id
                        title
                        description
                        status
                        createddate
                        updateddate
                      }
                    }
                  `,
            variables: {
              search: ref.current.value,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token") ?? "",
          },
        });
        const result = await response.json();
        const temp: any = [];
        result.data.searchTodos.forEach((obj: any) => {
          console.log(obj);
          temp.push(<SearchComp key={obj.id} obj={obj} />);
        });
        setsearchComp(temp);
      } catch (e) {
        console.log(e);
      }
    }
    call();
  }
  function debounce() {
    if (timer) {
      clearTimeout(timer);
    }
    const instance_timer = setTimeout(() => {
      search();
    }, 1000);
    settimer(instance_timer);
  }

  return (
    <div className="w-full  rounded-full flex bg-white p-2 gap-2 md:w-xl">
      <div
        onClick={() => {
          ref.current.focus();
        }}
        className="hidden md:block md:p-3 md:flex md:justify-center"
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <div className="flex gap-4 w-full">
        <input
          ref={ref}
          onClick={makevisible}
          onChange={debounce}
          className="w-5/6 outline-none pl-4 text-xl"
          type="text"
        />
        <div className="w-1/6">
          <button
            className=" rounded-full text-black p-2 md:flex md:flex-center md:pt-3 md:pl-10 cursor-pointer"
            onClick={makeinvisible}
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
