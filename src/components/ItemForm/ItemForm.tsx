
import { useRef, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { LuUpload } from "react-icons/lu"
import type { CardProps, NewProduct } from "../../interfaces"

const ItemForm = ({ setData ,oldData,loading }: { setData: Dispatch<SetStateAction<NewProduct>> , oldData?:CardProps , loading:boolean}) => {
	const data = useRef<NewProduct>({
		name: "",
		price: "",
		image: null
	})
	const sendData = (event: FormEvent) => {
		event.preventDefault()
		setData(data.current)
	}
	
	const [imgUrl , setImageUrl]=useState<string>("")
		let image: string
	
		const handelData = ( event : ChangeEvent<HTMLInputElement>)=>{
			if(event.target.files?.[0]){
				data.current = { ...data.current, image: event.target.files?.[0] }
				image=URL.createObjectURL(event.target.files?.[0])
				setImageUrl(image)
			}
		}

	return (
		<form onSubmit={sendData}>
			<div className="flex justify-between ">
				<div className="w-[47%] ">
					<div className="mb-8 mt-8">
						<label className="text-black dark:text-white " htmlFor="name">Product Name:</label>
						<input type="text" placeholder="Enter Product Name" id="name" className="w-full h-11 rounded-lg bg-gray-200 border border-gray-300 px-4 text-[15px] outline-0 mt-2"
							onChange={(event) => data.current = { ...data.current, name: event.target.value }} defaultValue={oldData?.name} required />
					</div>
					<div>
						<label htmlFor="price" className="text-black dark:text-white">Product Price:</label>
						<input type="number" placeholder="Enter Product Price" id="price" className="w-full h-11 rounded-lg bg-gray-200 border border-gray-300 px-4 text-[15px] outline-0 mt-2"
							onChange={(event) => data.current = { ...data.current, price: event.target.value }} defaultValue={oldData?.price} required={oldData? false : true}/>
					</div>
					<button type="submit" className="mt-8 bg-gray-300 flex items-center justify-center gap-1 text-black font-medium w-[140px] h-9 rounded-md cursor-pointer">{loading? <h1 className="text-blue-500"> loading ... </h1> : oldData? "Update" : "Create"}</button>
				</div>
				<div className="w-[50%]">
					<label className="w-full h-full border-2 border-dashed border-blue-500 rounded-2xl flex flex-col justify-center items-center text-black dark:text-white text-[18px] cursor-pointer" htmlFor="image">{imgUrl !="" ? <img src={imgUrl} alt="" className="h-[240px]"/> : oldData?.image_url ? <img src={oldData.image_url} className="h-[240px]" alt="" /> : <div className="flex flex-col justify-center items-center"> <LuUpload className="text-blue-500 text-6xl font-light" /> <br /> Upload Product Image</div>}</label>
					<input type="file" id="image" className="hidden" 
						onChange={handelData} required={oldData? false : true}/>
					{/* <img src={imgUrl} alt="" className="absolute top-7 right-1/3"/> */}
				</div>
			</div>
		</form>
	)
}

export default ItemForm
