import { useContext, useEffect, useState } from "react"
import { SearchContext } from "./Dashboard"
import axios from "axios"
import type { Product } from "../interfaces"
import Card from "../components/Card/Card"
import { IoMdAddCircleOutline } from "react-icons/io"
import { Link, useLoaderData } from "react-router-dom"
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6"

const ListItems = () => {
	const search = useContext(SearchContext)
	const [data, setData] = useState<Array<Product>>(useLoaderData<Array<Product>>())

	const [startIndex, setStartIndex] = useState<number>(0)
	const [endIndex, setEndIndex] = useState<number>(4)
	const [layer, setLayer] = useState<boolean>(false)
	const [itemDeleted, setItemDeleted] = useState<number>(0)

	const [showData, setShowData] = useState<Array<Product>>(data)
	let numProduct: number = showData.length

	const toLeft = () => {
		if ((startIndex - 4) >= 0) {
			setStartIndex(startIndex - 4)
			setEndIndex(endIndex - 4)
		}
	}

	const toRight = () => {
		if ((startIndex + 4) < numProduct) {
			setStartIndex(startIndex + 4)
			setEndIndex(endIndex + 4)
		}
	}

	useEffect(() => {
		setShowData(data.filter(element => {
			return (element.name.includes(search))
		}))
	}, [search, data])

	useEffect(() => {
		if (itemDeleted) {
			axios.get("https://vica.website/api/items", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
					"Accept": "application/json"
				}
			})
				.then(res => {
					console.log(res)
					setData(res.data)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}, [itemDeleted])
	return (
		<div className="relative">
			<div className={` ${layer ? "bg-gray-700/50 w-screen h-screen absolute z-50 -top-[82px] -left-[231px]" : ""}`}> </div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-medium dark:text-white">All Products</h1>
				<Link to="/dashboard/create" className="bg-blue-700 flex items-center justify-center gap-1 text-white w-[180px] h-10 rounded-md cursor-pointer"><IoMdAddCircleOutline className="text-[22px]" /> Create Product</Link>
			</div>
			<div className="flex flex-wrap gap-6 mt-5">
				{showData?.slice(startIndex, endIndex).map((product) => {
					return (
						<Card key={product.id} id={product.id} name={product.name} image_url={product.image_url} price={product.price} setLayer={setLayer} setItemDeleted={setItemDeleted} />
					)
				})}
			</div>
			<div className=" flex justify-between w-[25%] h-[100px] m-auto mt-20">
				<button title="toLeft" onClick={toLeft} className="cursor-pointer"> <FaCircleArrowLeft className="text-7xl text-gray-400" /></button>
				<button title="toRight" onClick={toRight} className="cursor-pointer"><FaCircleArrowRight className="text-7xl text-gray-400" /></button>
			</div>
		</div>
	)
}

export default ListItems

