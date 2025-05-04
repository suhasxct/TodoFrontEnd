import { useRef, useContext } from "react";
import { InputContext } from "./context";
export function AddTodo() {
  const {
    setstatus,
    showcomp,
    setshowcomp,
    setgenComp,
    setallTodos,
    setCompletedTodos,
    setPendingTodos,
    setpageNo,
  } = useContext(InputContext);
  const titleref: any = useRef("");
  const desref: any = useRef("");
  const statusref: any = useRef("");
  async function add() {
    setshowcomp(!showcomp);
    try {
      await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") ?? "",
        },
        body: JSON.stringify({
          query: `
                          mutation addTodo($title: String!, $description: String!, $status: Boolean) {
                            addTodo(title:$title, description: $description, status:$status)
                          }
                        `,
          variables: {
            title: titleref.current.value,
            description: desref.current.value,
            status: statusref.current.value === "done" ? true : false,
          },
        }),
      });
      setgenComp([]);
      setCompletedTodos([]);
      setPendingTodos([]);
      setallTodos([]);
      setpageNo(0);
      setstatus((prev) => !prev);
    } catch (e) {
      console.log("Error in Adding");
    }
  }
  return (
    <div className="flex flex-col text-white  rounded-lg bg-black p-5 md:flex pb-1 md:bg-black md:w-full md:flex md:items-center">
      <div className="pl-3 md:w-xl">
        <div className="flex gap-18  w-full p-1">
          <p
            className="font-bold font-mono
"
          >
            Title:
          </p>
          <div>
            <input
              className="outline-none"
              ref={titleref}
              type="text"
              placeholder="Enter Todo Title"
            />
          </div>
        </div>
        <div className="flex gap-5  p-1">
          <p
            className="font-bold font-mono
"
          >
            Description:
          </p>
          <div>
            <input
              className="outline-none"
              ref={desref}
              type="text"
              placeholder="Enter Todo Description"
            />
          </div>
        </div>
        <div className="flex gap-15 p-1">
          <p
            className="font-bold font-mono
"
          >
            Status:
          </p>
          <select className="outline-none" ref={statusref}>
            <option className="text-black" value="done">
              Done
            </option>
            <option className="text-black" value="notDone">
              Not Done
            </option>
          </select>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={add}
            className="bg-white text-black w-1/2 rounded-full p-2 hover:bg-gray-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
