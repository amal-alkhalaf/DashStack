import { toast } from "react-toastify";
import axios from "axios";
import type { ConfirmDeleteProps } from "../../interfaces";
import { useNavigate } from "react-router-dom";

const ConfirmToast = ({ question, id ,setLayer,setItemDeleted}: ConfirmDeleteProps) => {
	const navigate=useNavigate()
	const handleResponse = (response: boolean) => {
		if (response) {
			axios.delete("https://vica.website/api/items/"+id ,{
				headers :{
					Authorization: "Bearer "+localStorage.getItem("token"),
					Accept:"application/json",
				}
			})
			.then(res=>{
				console.log(res)
				setItemDeleted(1)
				toast.success("Product Deleted Successfully")
				navigate("/dashboard")
			})
			.catch(err=>{console.log(err)})
		}
		toast.dismiss();
		setLayer(false)
	};
	return (
			<div className="relative w-[70%] h-full flex flex-col justify-center items-center text-center font-medium dark:bg-dark dark:text-white ">
				<p className=" mb-9">{question}</p>
				<div className="flex justify-between items-center w-full">
					<button className="rounded-md text-black  bg-gray-300 w-[80px] h-[30px] text-[14px] cursor-pointer" onClick={() => handleResponse(false)}>No</button>
					<button className="rounded-md bg-red-700 text-white w-[80px] h-[30px] text-[14px] cursor-pointer" onClick={() => handleResponse(true)}>Yes</button>
				</div>
			</div>
	)
}

export default ConfirmToast
