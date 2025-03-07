import { NavLink } from "react-router-dom";

function Navbar(){
    return(
        <div className="flex flex-row justify-around gap-4">
       <NavLink to="/" className="bg-slate-700 p-2 rounded-2xl">
        Home
       </NavLink>
       <NavLink to="/pastes" className="bg-slate-700 p-2 rounded-2xl">
        All Paste
       </NavLink>
        </div>
    )
}

export default Navbar;