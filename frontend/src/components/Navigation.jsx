import {Link} from "react-router-dom";
const Navigation =()=>{
    return(
        <header>
        <div className="logo"><a href="/">Milestone Mapper</a></div>
        <nav>
          <ul>
          <li>
              <Link className="nav_link" to="/">
                Home Page
              </Link>
            </li>
          <li>
              <Link className="nav_link" to="/wallet">
                Wallet
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/view-all-tasks">
                View All
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/create-task">
                Create
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/view-task">
                View
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/update-task">
                Update
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/delete-task">
                Delete
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
}
export default Navigation;

/*************************************************************************************** */

// Another Idea 

// import { Link } from "react-router-dom";

// const Navigation = () => {
//   return (
//     <header>
//       <div className="logo">Personal Manager</div>
//       <nav>
//         <ul>
//           <li>
//             <Link className="nav_link" to="/">
//               Wallet
//             </Link>
//           </li>
//           <li>
//             <Link className="nav_link" to="/view-all-tasks">
//               View All Tasks
//             </Link>
//           </li>
//           <li>
//             <Link className="nav_link" to="/create-task">
//               Create Task
//             </Link>
//           </li>
//           <li>
//             <Link className="nav_link" to="/view-task">
//               View Task
//             </Link>
//           </li>
//           <li>
//             <Link className="nav_link" to="/update-task">
//               Update Task
//             </Link>
//           </li>
//           <li>
//             <Link className="nav_link" to="/delete-task">
//               Delete Task
//             </Link>
//           </li>
//           <li>
//             <Link className="nav_link" to="/settimer">
//               Set/Update Deadline
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };
// export default Navigation;