// import { Link, Outlet } from "react-router-dom";
// import React from "react";
// import { LOGIN_ROUTE } from "@/router";

// export default function DefaultLayout() {
//   return (
//     <>
//       <header>
//         <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
//           <div className="text-2xl text-white font-semibold inline-flex items-center">
//             Logo
//           </div>
//           <div>
//             <ul className="flex text-white">
//               <li className="ml-5 px-2 py-1">
//                 <Link className={"flex"} to={"/"}>
//                   {" "}
//                   Home page
//                 </Link>
//               </li>
//               <li className="ml-5 px-2 py-1">
//                 <Link className={"flex"} to={LOGIN_ROUTE}>
//                   {" "}
//                   Login
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </header>
//       <main className={'container'}>
//         <Outlet />
//       </main>
//     </>
//   );
// }
