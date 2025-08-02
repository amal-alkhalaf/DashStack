import { useEffect, useState } from "react"
import ItemForm from "../components/ItemForm/ItemForm"
import type { NewProduct } from "../interfaces"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const EditItems = () => {
	const params = useParams()
	const oldData = useLoaderData()
	const [data, setData] = useState<NewProduct>({
		name: "",
		price: "",
		image: null
	})
	// const [oldData, setOldData] = useState<CardProps>({
	// 	id: 0,
	// 	name: "",
	// 	price: "",
	// 	image_url: ""
	// })

	const [loading, setLoading]=useState<boolean>(false)
	const navigate = useNavigate()

	// useEffect(() => {
	// 	axios.get("https://vica.website/api/items/" + params.id, {
	// 		headers: {
	// 			Authorization: "Bearer " + localStorage.getItem("token"),
	// 			Accept: "application/json"
	// 		}
	// 	})
	// 		.then(res => {
	// 			console.log(res)
	// 			setOldData({
	// 				id: res.data.id,
	// 				name: res.data.name,
	// 				image_url: res.data.image_url,
	// 				price: res.data.price
	// 			})
	// 		})
	// 		.catch(err => { console.log(err) })
	// }, [])

	useEffect(() => {
		if (data.name != "" || data.price!="" || data.image!=null) {
			setLoading(true)
			axios.post("https://vica.website/api/items/" + params.id, {
				name: data.name? data.name :oldData.name,
				price:data.price? data.price :oldData.price,
				image:data.image,
				_method: "PUT" }, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
					Accept: "application/json",
					"Content-Type": "multipart/form-data"
				}
			})
				.then(res => {
					console.log(res)
					setLoading(false)
					toast.success("Product Updated Successfully")
					navigate("/dashboard")
				})
				.catch(err => {
					console.log(err)
				})
		}
	}, [data])

	return (
		<div>
			<h1 className="text-2xl font-medium dark:text-white">Edit Product</h1>
			<ItemForm setData={setData} oldData={oldData} loading={loading}/>
		</div>
	)
}

export default EditItems
