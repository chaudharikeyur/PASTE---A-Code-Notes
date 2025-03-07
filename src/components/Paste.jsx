import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import ShareModal from './ShareModal'
import { Share } from 'lucide-react'
import { NavLink } from "react-router-dom";
function Paste(){
    const [isOpen, setIsOpen] = useState(false);
    const shareLink = "https://yourapp.com/invite?id=12345";
  
    const pastes = useSelector((state)=> state.paste.pastes);
   const dispatch = useDispatch();
const [search , setSerch] = useState("");
   const filterd = pastes.filter((paste)=>
paste.title.toLowerCase().includes(search.toLowerCase()));
   function handleDelete(pasteId){
   dispatch(removeFromPastes(pasteId))
   }

   
   return(
        <div>
          <input 
          className="p-2 rounded-2xl
          min-w-[600px] text-slate-900 mt-5 bg-slate-100"
  type="search"
  placeholder="search here"
  value={search}
  onChange={(e)=> setSerch(e.target.value)}
/>
<div className="flex flex-col gap-5 mt-5" >
{
    filterd.length > 0 && 
    filterd.map((paste)=>{
        return(
            <div className="border" key={paste._id}>
            <div> {paste.title}</div> 
            <div>{paste.content}</div> 
            <div className="flex flex-row h-[50px] text-center gap-4 place-content-evenly text-slate-900">
                <button>
                    <NavLink to={`/?pasteId = ${paste?._id}`}>Edit</NavLink>
                </button>
                <button>
                    <NavLink to={`/pastes/${paste?._id}`}>
                    View
                    </NavLink>
                </button>
                <button onClick={()=>handleDelete(paste?._id)}>Delete</button>
                <button onClick={()=>{navigator.clipboard.writeText(paste?.content)
          toast.success("Copies to clipboard")
                 } }>Copy</button>
                <button
                     onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                      <Share />
                      Share
                </button>
                <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        link={shareLink}
      />
                </div>  
                <div>
                    {paste.createdAt}
                </div>
            </div>    
        )
    })
}
</div>
        </div>
    )
}

export default Paste;