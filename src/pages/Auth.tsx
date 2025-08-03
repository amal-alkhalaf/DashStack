import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const Auth = () => {
	return (
		<>
		<div className=" relative h-screen font-nunito">
			<img src="/DashStack/assets/img/auth-bg.png" alt="" className="h-screen w-screen absolute top-0 start-0 -z-10 "/>
			<div className="py-6 px-8 min-h-[547px] bg-white rounded-2xl w-max absolute top-1/2 start-1/2 -translate-1/2">
				<Outlet />
			</div>
		</div>
		<ToastContainer position="top-right" autoClose={3000} />
		</>
	)
}

export default Auth
