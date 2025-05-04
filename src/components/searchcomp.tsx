export function SearchComp(obj: any): any {
  return (
    <div className="p-3 bg-[#0d1b2a] rounded-lg md:w-xl">
      <div className="flex gap-18  w-full p-1">
        <p className="font-bold">Title:</p>

        <div>{obj.obj.title}</div>
      </div>
      <div className="flex gap-5  p-1">
        <p className="font-bold">Description:</p>

        <div>{obj.obj.description}</div>
      </div>
      <div className="flex gap-15 p-1">
        <p className="font-bold">Status:</p>
        <div>{obj.obj.status === true ? "Done" : "Not done"}</div>
      </div>
      <div className="flex gap-12">
        <p className="font-bold">Created:</p>
        <div>{obj.obj.createddate.split("T")[0]}</div>
      </div>
      <div className="flex gap-10">
        <p className="font-bold">Updated:</p>
        <div>{obj.obj.updateddate.split("T")[0]}</div>
      </div>
    </div>
  );
}
