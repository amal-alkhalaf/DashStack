import { createContext, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar"
import SideBar from "../components/SideBar/SideBar"
import { AiOutlineProduct } from "react-icons/ai"
import { CiHeart } from "react-icons/ci"
import { FaListCheck } from "react-icons/fa6"
import { toast, ToastContainer } from "react-toastify"

export const ModeContext = createContext<boolean>(false)
export const SearchContext = createContext<string>("")

const Dashboard = () => {
	const navigate = useNavigate()
	const [mode, setMode] = useState<boolean>(false)
	const [search, setSearch] = useState<string>("")
	const [layer, setLayer] = useState<boolean>(false)

	useEffect(() => {
		if (localStorage.getItem("token") && localStorage.getItem("user") == "newUser") {
			toast.success("Created your account successfully", { onClose: () => { setTimeout(() => { toast("Hi, " + JSON.parse(localStorage.getItem("userInfo")).user_name + " 👋🏻😁") }, 3000) } })
		} else if (localStorage.getItem("token") && localStorage.getItem("user") == "oldUser") {
			toast.success("you have been logged in successfully")
		} else {
			navigate('/')
		}
	}, [])
	return (
		<div className="relative">
			<div className={` ${layer ? "bg-gray-700/50 w-screen h-screen absolute z-50" : ""}`}> </div>
			<div className={`${mode ? "" : "dark"} h-screen flex `}>
				<ModeContext.Provider value={mode}>
					<SearchContext.Provider value={search}>
						<SideBar span="Dash" logo="Stack" setLayer={setLayer} items={[{ content: "Products", url: "/dashboard", icon: <AiOutlineProduct className="text-[18px]" /> },
						{ content: "Favorites", url: "/dashboard/favorites", icon: <CiHeart className="text-[22px]" /> },
						{ content: "Order Lists", url: "/dashboard/orders", icon: <FaListCheck className="text-[17px]" /> }]} />
						<div className="w-[90%] h-[91%]">
							<NavBar setMode={setMode} setSearch={setSearch} />
							<div className=" p-6 bg-gray-100 dark:bg-gray-800 h-full ">
								<Outlet />
							</div>
						</div>
					</SearchContext.Provider>
				</ModeContext.Provider>
			</div>
			<ToastContainer position="top-right" autoClose={3000} />
		</div>
	)
}

export default Dashboard
