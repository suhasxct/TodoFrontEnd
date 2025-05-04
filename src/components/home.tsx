import { useContext, useEffect, useRef, useState } from "react";
import { InputContext } from "./context";
import { Todo } from "./Todo";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Search } from "./search";
import { AddTodo } from "./addtodo";
import { Buffer } from "./buffer";
export function Home() {
  const {
    genComp,
    setgenComp,
    status,
    showcomp,
    setshowcomp,
    showsearchcomp,
    searchComp,
    allTodos,
    setallTodos,
    completedTodos,
    setCompletedTodos,
    pendingTodos,
    setPendingTodos,
    pageNo,
    setpageNo,
  } = useContext(InputContext);
  const [loading, setloading] = useState<boolean>(true);
  const [nomore, setnomore] = useState<boolean>(false);
  const navigate = useNavigate();
  const bottomref: any = useRef("");
  function addTodo() {
    setshowcomp(!showcomp);
  }
  useEffect(() => {
    document.body.style.overflow = showsearchcomp ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showsearchcomp]);
  useEffect(() => {
    setloading(true);
    async function call() {
      try {
        const response = await fetch(
          "https://todobackend-pro.up.railway.app/graphql",
          {
            method: "POST",
            body: JSON.stringify({
              query: `
              query GetTodos($pageNo: Int) {
                getTodos(pageNo: $pageNo) {
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
                pageNo: pageNo,
              },
            }),
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token") ?? "",
            },
          }
        );
        const result = await response.json();
        const temp: any = [];
        const done: any = [];
        const not_done: any = [];
        result.data.getTodos.forEach((obj: any) => {
          if (obj.status) {
            done.push(<Todo prop={obj} key={obj.id} />);
          } else {
            not_done.push(<Todo prop={obj} key={obj.id} />);
          }
          temp.push(<Todo prop={obj} key={obj.id} />);
        });
        if (result.data.getTodos.length === 0) {
          setnomore(true);
        }
        setloading(false);
        setgenComp((prev: any) => [...prev, ...temp]);
        setallTodos((prev: any) => [...prev, ...temp]);
        setCompletedTodos((prev: any) => [...prev, ...done]);
        setPendingTodos((prev: any) => [...prev, ...not_done]);
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    }
    call();
  }, [status, pageNo]);
  useEffect(() => {
    const observer = new IntersectionObserver((ele) => {
      if (ele[0].isIntersecting && !loading && !nomore) {
        setpageNo((prev: any) => prev + 1);
      }
    });
    if (bottomref.current) observer.observe(bottomref.current);
    return () => {
      if (bottomref.current) observer.unobserve(bottomref.current);
    };
  }, [loading]);

  return (
    <div className="w-full flex flex-col bg-black min-h-screen md:pl-15 md:pr-15">
      <div className="text-white border-d border-gray-100 sticky bg-black top-0 z-10">
        <Header />
      </div>
      <div className="flex pt-5 w-full justify-center text-white text-center text-4xl text-bold font-serif">
        <div>Todos</div>
      </div>
      <div className="p-6  md:flex md:justify-center">
        <Search />
      </div>
      <div className="justify-center bg-black text-white w-full p-6 flex gap-3 sticky top-16 md:w-full md:flex md:justify-center ">
        <button
          onClick={addTodo}
          className="h-14 w-4/6 bg-blue-700 rounded-full md:w-sm hover:bg-[#394eff] md:text-xl cursor-pointer"
        >
          Add Todo
        </button>
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "All") {
              setgenComp(allTodos);
            } else if (value === "done") {
              setgenComp(completedTodos);
            } else if (value === "notDone") {
              setgenComp(pendingTodos);
            }
          }}
          className=" outline-none bg-[#2f3133] text-white w-2/6 rounded-full p-1 md:w-24"
          name="status"
        >
          <option className="text-white" value="All">
            All
          </option>
          <option className="text-white" value="done">
            Done
          </option>
          <option className="text-white" value="notDone">
            Not Done
          </option>
        </select>
      </div>
      <div className="absolute top-20 left-5 right-5">
        {showcomp ? <AddTodo /> : null}
      </div>
      {showsearchcomp ? (
        <div className="absolute text-white  p-4 top-53 h-80 left-5 right-5 flex flex-col gap-2 overflow-y-scroll md:w-full md:top-60 md:flex md:flex-col md:items-center">
          {searchComp}
        </div>
      ) : null}
      <div className="flex-grow">
        <div>
          {genComp.length == 0 ? (
            <div className="text-white font-bold text-center">
              No More Content
            </div>
          ) : (
            <div className="w-full  bg-black p-6 flex flex-col gap-4 md:grid grid-cols-3 md:pl-20 md:pr-20 md:w-full">
              {genComp}
            </div>
          )}
        </div>
        {loading ? (
          <div className="w-full bg-black flex justify-center">
            <Buffer />
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
      <div ref={bottomref}></div>
    </div>
  );
}
