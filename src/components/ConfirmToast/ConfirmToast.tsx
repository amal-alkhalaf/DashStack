import { toast } from "react-toastify";
import type { ConfirmToastProps } from "../../interfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmToast = ({ question, error ,setLayer}: ConfirmToastProps) => {
	const navigate=useNavigate()
	const handleResponse = (response: boolean) => {
		if (response) {
			axios.post("https://vica.website/api/logout", {}, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
					"Accept ": "application/json"
				}
			})
				.then(res => {
					console.log(res)
					localStorage.removeItem("token")
					localStorage.removeItem("userInfo")
					localStorage.setItem("logout","yes")
					navigate("/")
				})
				.catch(err => console.log(err))
		} else if (error) {
			toast.error(error);
		}
		toast.dismiss();
		setLayer(false)
	};
	return (
			<div className="relative w-[70%] h-full flex flex-col justify-center items-center dark:bg-dark dark:text-white text-center font-medium">
				<p className=" mb-9">{question}</p>
				<div className="flex justify-between items-center w-full">
					<button className="rounded-md  text-black  bg-gray-300 w-[80px] h-[30px] text-[14px] cursor-pointer" onClick={() => handleResponse(false)}>No</button>
					<button className="rounded-md bg-red-700 text-white w-[80px] h-[30px] text-[14px] cursor-pointer" onClick={() => handleResponse(true)}>Yes</button>
				</div>
			</div>
	)
}

export default ConfirmToast
