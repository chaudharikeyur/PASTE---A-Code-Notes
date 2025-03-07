import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewPaste() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  const { id } = useParams(); 
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    console.log("URL ID:", id); // Check if you're getting id in console
    if (id) {
      const paste = allPastes.find((p) => p._id === id);
      if (paste) {
        setTitle(paste.title || "");
        setValue(paste.content || "");
      }
    }
  }, [id, allPastes]); 

  return (
    <div>
      <div className="flex flex-row gap-6 place-content-between">
        <input
          className="bg-slate-100 h-[45px] text-slate-600 p-3 rounded-2xl mt-5 w-[100%]"
          type="text"
          placeholder="Enter title here"
          value={title}
          disabled
        />
      </div>
      <div className="mt-4">
        <textarea
          className="rounded-2xl mt-4 text-slate-600 min-w-[500px] p-4 border-2 border-indigo-600"
          value={value}
          disabled
          placeholder="Enter content here"
          rows={20}
        />
      </div>
    </div>
  );
}

export default ViewPaste;
