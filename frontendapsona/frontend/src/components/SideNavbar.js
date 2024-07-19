
import { Link } from "react-router-dom"

import "./Sidebar.css"

const SideBar = () =>(
    <div className="SideNavContainer">
        <ul >
            <Link className="linkele" to="/"><li className="navitem">Notes</li></Link> 
            <Link className="linkele" to="/archieve"> <li className="navitem">Archieved</li></Link>
            <Link className="linkele" to="/trash"><li className="navitem">Trashes</li></Link>
        </ul>
    </div>
)
export default SideBar