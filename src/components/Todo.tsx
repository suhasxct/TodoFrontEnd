import { useState, useContext } from "react";
import { InputContext } from "./context";
export function Todo({ prop }: { prop: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    setstatus,
    setgenComp,
    setallTodos,
    setPendingTodos,
    setCompletedTodos,
    setpageNo,
  } = useContext(InputContext);
  const [title, setTitle] = useState(prop.title);
  const [description, setDescription] = useState(prop.description);
  const [status, setStatus] = useState(prop.status ? "done" : "notDone");
  async function del() {
    try {
      await fetch("https://todobackend-pro.up.railway.app/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") ?? "",
        },
        body: JSON.stringify({
          query: `
                    mutation deleteTodo($id:Int) {
                      deleteTodo(id:$id)
                    }
                  `,
          variables: {
            id: parseInt(prop.id),
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
      console.log("Error in Updating");
    }
  }
  async function saveUpdates() {
    try {
      await fetch("https://todobackend-pro.up.railway.app/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") ?? "",
        },
        body: JSON.stringify({
          query: `
                  mutation updateTodo($id:Int,$title: String, $description: String, $status: Boolean) {
                    updateTodo(id:$id,title:$title, description: $description, status:$status)
                  }
                `,
          variables: {
            id: parseInt(prop.id),
            title: title,
            description: description,
            status: status === "done",
          },
        }),
      });
      setgenComp([]);
      setCompletedTodos([]);
      setPendingTodos([]);
      setallTodos([]);
      setpageNo(0);
      setstatus((prev) => !prev);
      setIsEditing(false);
    } catch (e) {
      console.log("Error in Deleting");
    }
  }
  return (
    <div className="flex flex-col text-white  rounded-lg bg-[#2f3133] p-5 md:col-span-1 transition transform hover:-translate-y-1 hover:shadow-lg">
      <div className="pl-3">
        <div className="flex gap-18  w-full p-1">
          <p
            className="font-bold font-mono
"
          >
            Title:
          </p>
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black text-white p-1 rounded-lg w-2/2"
            />
          ) : (
            <div>{title}</div>
          )}
        </div>
        <div className="flex gap-5  p-1">
          <p
            className="font-bold font-mono
"
          >
            Description:
          </p>
          {isEditing ? (
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-black text-white p-1 rounded-lg w-full"
            />
          ) : (
            <div>{description}</div>
          )}
        </div>
        <div className="flex gap-16 p-1">
          <p
            className="font-bold font-mono
"
          >
            Status:
          </p>
          {isEditing ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-black text-white p-1 rounded"
            >
              <option value="done">Done</option>
              <option value="notDone">Not Done</option>
            </select>
          ) : (
            <div>{status === "done" ? "Done" : "Not done"}</div>
          )}
        </div>
        <div className="flex gap-15">
          <p
            className="font-bold font-mono
"
          >
            Created:
          </p>
          <div>
            {prop.updateddate
              ? new Date(prop.updateddate).toLocaleDateString()
              : "Loading..."}
          </div>
        </div>
        <div className="flex gap-15">
          <p
            className="font-bold font-mono
"
          >
            Updated:
          </p>
          <div>
            {prop.updateddate
              ? new Date(prop.updateddate).toLocaleDateString()
              : "Loading..."}
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full p-2 gap-4">
        {isEditing ? (
          <button
            onClick={saveUpdates}
            className="bg-green-900 w-1/2 rounded-full p-2 hover:bg-green-700 cursor-pointer"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-900 w-1/2 rounded-full p-2 hover:bg-green-700 cursor-pointer"
          >
            Update
          </button>
        )}
        <button
          onClick={del}
          className="bg-red-900 w-1/2 rounded-full p-2 hover:bg-red-700 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
