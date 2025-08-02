import { useContext, type Dispatch, type SetStateAction } from "react"
import { CiLight } from "react-icons/ci"
import { ModeContext } from "../../pages/Dashboard"
import { MdDarkMode } from "react-icons/md"

type setState<T> =Dispatch<SetStateAction<T>>

const NavBar = ({ setMode , setSearch}: { setMode: setState<boolean> , setSearch: setState<string> }) => {

	const mode = useContext(ModeContext)

	let userInfo = {
		first_name: "",
		last_name: "",
		user_name: ""
	}

	let data = JSON.parse(localStorage.getItem("userInfo"))
	userInfo.first_name = data?.first_name
	userInfo.last_name = data?.last_name
	userInfo.user_name = data?.user_name

	return (
		<nav className="flex justify-between items-center px-6 dark:bg-dark dark:text-white h-[58px]">
			<input type="search" placeholder="Search a Product ..." className="w-[380px] h-8 rounded-[20px] outline-0 ps-4 text-[14px] placeholder:text-[14px] placeholder:text-gray-400 bg-gray-100 border-1 border-gray-300 dark:bg-dark"
			onChange={(event)=> setSearch(event.target.value)}/>
			<div className="flex gap-4 items-center">
				<div className="relative w-[45px] h-[45px]">
					<img src={JSON.parse(localStorage.getItem("userInfo")).profile_image_url} alt="not found" className="w-[45px] h-[45px] rounded-full" />
					<div className="w-3 h-3 rounded-full bg-green-400 absolute top-0 left-0"></div>
				</div>
				<div>
					<p className="font-medium">{userInfo.first_name} {userInfo.last_name}</p>
					<p className="text-[13px] text-gray-500 dark:text-white">{userInfo.user_name}</p>
				</div>
				|
				<button className="cursor-pointer" onClick={() => setMode(prev => !prev)}>{mode ? <MdDarkMode className="text-3xl" /> : <CiLight className="text-3xl" />}</button>
			</div>
		</nav>
	)
}

export default NavBar
