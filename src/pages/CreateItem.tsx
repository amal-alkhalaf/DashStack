import { useEffect, useState } from "react"
import ItemForm from "../components/ItemForm/ItemForm"
import type { NewProduct } from "../interfaces"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreateItem = () => {
	const navigate = useNavigate()
	const [data, setData] = useState<NewProduct>({
		name: "",
		price: "",
		image: null
	})

	const [loading, setLoading] = useState<boolean>(false)
	useEffect(() => {
		if (data.image != null && data.price != "" && data.name != "") {
			setLoading(true)
			axios.post("https://vica.website/api/items", data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
					"Accept": "application/json",
					"Content-Type": "multipart/form-data"
				}
			})
				.then(res => {
					console.log(res)
					setLoading(false)
					toast.success("Product Added Successfully")
					navigate("/dashboard")
				})
				.catch(err => console.log(err))
		}
	}, [data])
	return (
		<div className="h-full">
			<h1 className="text-2xl font-medium dark:text-white">Create Product</h1>
			<ItemForm setData={setData} loading={loading}/>
		</div>
	)
}

export default CreateItem
