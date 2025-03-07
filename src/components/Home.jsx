import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

function Home() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
 
  useEffect(() => {
    const cleanedParams = new URLSearchParams(window.location.search.replace(/%20/g, ""));
    setSearchParams(cleanedParams);
  }, []);

  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(pasteId);
    if (pasteId) {
      
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title || "");
        setValue(paste.content || "");
      }
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-6 place-content-between">
        <input
          className="bg-slate-100 h-[59px] text-slate-900 p-3 rounded-2xl mt-4 w-[60%]"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste} className="text-slate-900 mt-4">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 border-2 border-indigo-600"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
}

export default Home;
