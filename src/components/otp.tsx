import { useRef, useState } from "react";

export function Otp(): any {
  const ref: any = useRef(Array(6).fill(""));
  const buttonRef: any = useRef("");
  const [val, setval]: any = useState(Array(6).fill(""));
  const arr = Array(6).fill(0);
  const comp = arr.map((_, idx) => {
    return (
      <Comp
        key={idx}
        idx={idx}
        ref={ref}
        val={val}
        setval={setval}
        buttonRef={buttonRef}
      />
    );
  });
  function send() {
    console.log(val);
  }
  return (
    <div className="flex flex-col p-2 gap-5 items-center justify-center w-full h-screen bg-[#202831]">
      <div className="text-5xl text-white">OTP</div>
      <div className="flex gap-2">{comp}</div>
      <button
        ref={buttonRef}
        onClick={send}
        className="bg-black text-white w-48 h-12 rounded-xl m-2"
      >
        Submit
      </button>
    </div>
  );
}
export function Comp({ idx, ref, val, setval, buttonRef }: any) {
  return (
    <div>
      <input
        key={idx}
        value={val[idx]}
        className="bg-black text-white w-16 h-16 rounded-xl text-center text-xl active:border-2 border-green-300"
        type="text"
        onChange={(e): any => {
          const new_arr = [...val];
          if (e.target.value == "") {
            new_arr[idx] = "";
            if (idx - 1 > -1) {
              ref.current[idx - 1].focus();
            }
          } else if (parseInt(e.target.value)) {
            new_arr[idx] = e.target.value;
            if (idx + 1 < 6) {
              ref.current[idx + 1].focus();
            } else {
              buttonRef.current.focus();
            }
          }
          setval(new_arr);
        }}
        ref={(ele) => {
          ref.current[idx] = ele;
        }}
      />
    </div>
  );
}
