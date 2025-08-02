import { GoTrash } from "react-icons/go"
import { Link } from "react-router-dom"
import type { CardProps2 } from "../../interfaces"
import { useContext } from "react"
import { toast } from "react-toastify"
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete"
import { ModeContext } from "../../pages/Dashboard"

const Card = ({ id, image_url, name, price, setLayer,setItemDeleted }: CardProps2) => {
	const mode = useContext(ModeContext)

	let dl: string
	if (mode) {
		dl = "light"
	} else {
		dl = "dark"
	}


	const deleteProduct = () => {
		setLayer(true)
		toast(<ConfirmDelete question="Are you sure to delete this product?" setLayer={setLayer} id={id} setItemDeleted={setItemDeleted}/>, {
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
		<div className="w-[250px] h-[290px] rounded-md shadow-md dark:bg-dark bg-white p-4 dark:text-white flex flex-col justify-between" key={id}>
			<img className=" max-h-[60%] mx-auto mb-4" src={image_url} alt="" />
			<div>
				<h2 className="text-[18px] font-medium">{name}</h2>
				<p className="text-blue-500 font-medium text-[14px] mt-1">${price}</p>
				<div className="flex justify-between mt-3">
					<Link to={"/dashboard/edit/" + id} className="cursor-pointer text-[12px] font-medium py-1 rounded-4xl bg-blue-100 w-[60%] text-black dark:bg-gray-500 dark:text-white text-center">Edit Product</Link>
					<button title="delete" onClick={deleteProduct} className="cursor-pointer"> <GoTrash className="text-[18px]" /></button>
				</div>
			</div>
		</div>
	)
}

export default Card
