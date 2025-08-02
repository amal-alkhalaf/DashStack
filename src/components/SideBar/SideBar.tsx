import { Link } from "react-router-dom"
import type { SideBarProps } from "../../interfaces"
import { IoMdLogOut } from "react-icons/io"
import { toast } from "react-toastify"
import ConfirmToast from "../ConfirmToast/ConfirmToast"
import { useContext } from "react"
import {  ModeContext } from "../../pages/Dashboard"

const SideBar = ({ logo, span, setLayer, items }: SideBarProps) => {
	const mode = useContext(ModeContext)

	let dl: string
	if (mode) {
		dl = "light"
	} else {
		dl = "dark"
	}
	
	const logout = () => {
		setLayer(true)
		toast(<ConfirmToast question="Do you want to logout?" setLayer={setLayer}/>, {
			autoClose: false,
			closeOnClick: false,
			draggable: false,
			closeButton:false,
			position: "top-center",
			className: "w-[300px] h-[150px] flex flex-col justify-center items-center -top-4 z-50",
			theme: dl,
		
		});
	}
	return (
		<div className="dark:bg-dark dark:text-white h-screen w-[220px] py-6 flex flex-col gap-8 items-center">
			<h1 className="text-2xl font-extrabold "><span className="text-blue-500">{span}</span>{logo}</h1>
			<div className="grow flex flex-col justify-between items-center">
				<ul>
					{items.map((item, index) => {
						return (
							<li key={index}><Link to={item.url} className="flex items-center py-3 px-4 gap-6 text-[15px] font-medium">{item.icon} {item.content}</Link></li>
						)
					})}
				</ul>
				<button onClick={logout} className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md w-[180px] h-[40px] font-medium cursor-pointer"><IoMdLogOut /> Logout</button>
			</div>
		</div>
	)
}

export default SideBar
