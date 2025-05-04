import { createContext, ReactNode, useState } from "react";

interface context {
  genComp: React.ReactNode[];
  setgenComp: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  allTodos: React.ReactNode[];
  setallTodos: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  completedTodos: React.ReactNode[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  pendingTodos: React.ReactNode[];
  setPendingTodos: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  searchComp: React.ReactNode[];
  setsearchComp: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  status: boolean;
  setstatus: React.Dispatch<React.SetStateAction<boolean>>;
  showcomp: boolean;
  setshowcomp: React.Dispatch<React.SetStateAction<boolean>>;
  showsearchcomp: boolean;
  setshowsearchcomp: React.Dispatch<React.SetStateAction<boolean>>;
  pageNo: number;
  setpageNo: React.Dispatch<React.SetStateAction<number>>;
}
const defaultcontex: context = {
  genComp: [],
  setgenComp: () => {},
  allTodos: [],
  setallTodos: () => {},
  completedTodos: [],
  setCompletedTodos: () => {},
  pendingTodos: [],
  setPendingTodos: () => {},
  searchComp: [],
  setsearchComp: () => {},
  status: false,
  setstatus: () => {},
  showcomp: false,
  setshowcomp: () => {},
  showsearchcomp: false,
  setshowsearchcomp: () => {},
  pageNo: 0,
  setpageNo: () => {},
};
export const InputContext = createContext<context>(defaultcontex);

export const InputContextProvider = ({ children }: { children: ReactNode }) => {
  const [genComp, setgenComp] = useState<React.ReactNode[]>([]);
  const [searchComp, setsearchComp] = useState<React.ReactNode[]>([]);
  const [status, setstatus] = useState<boolean>(false);
  const [showcomp, setshowcomp] = useState<boolean>(false);
  const [completedTodos, setCompletedTodos] = useState<any[]>([]);
  const [pendingTodos, setPendingTodos] = useState<any[]>([]);
  const [allTodos, setallTodos] = useState<any[]>([]);
  const [pageNo, setpageNo]: any = useState<any>(0);
  const [showsearchcomp, setshowsearchcomp] = useState<boolean>(false);
  return (
    <InputContext.Provider
      value={{
        genComp,
        setgenComp,
        status,
        setstatus,
        showcomp,
        setshowcomp,
        showsearchcomp,
        setshowsearchcomp,
        searchComp,
        setsearchComp,
        allTodos,
        setallTodos,
        pendingTodos,
        setPendingTodos,
        completedTodos,
        setCompletedTodos,
        pageNo,
        setpageNo,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
