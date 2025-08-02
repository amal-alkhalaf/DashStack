import { Link } from "react-router-dom"
import type { FormAuthProps } from "../../interfaces"
import { useRef, useState, type ChangeEvent, type FormEvent } from "react"

const FormAuth = <T extends object> ({ title, subTitle, inputs, btn, footer, setData }: FormAuthProps<T>) => {
	// let data : LoginData ={
	// 	email: "",
	// 	password : ""
	// }

	let data = useRef<T | null>(null)

	const sendData=(event : FormEvent)=>{
		event.preventDefault()
		if (data.current) {
			setData(data.current)
		}
	}

	const [imgUrl , setImageUrl]=useState<string>("/assets/img/profile.jpg")
	let image: string

	const handelData = ( event : ChangeEvent<HTMLInputElement>,name : string,type:string)=>{
		data.current={...data.current , [name] : type != "file" ? event.target.value : event.target.files?.[0]}
		if(event.target.files?.[0]){
			image=URL.createObjectURL(event.target.files?.[0])
			setImageUrl(image)
		}
	}

	return (
		<form className="flex flex-col min-h-[547px] items-center" onSubmit={sendData}>
			<h1 className="font-extrabold text-2xl mb-[8px]">{title}</h1>
			<p className="font-semibold text-[14px] mb-8">{subTitle}</p>
			<div className={`w-full grow flex flex-col gap-8 ${(inputs.length>3) && "grid grid-cols-6 gap-x-4 gap-y-2"}`}>
				{inputs.map((input, index) => {
					return (
						<div key={index} className={`min-w-[304px] flex flex-col items-start col-span-2 ${(input.type)=='email' && "col-span-6 col-start-1 col-end-7"} ${(input.type)=='password' && " col-span-3 "} `}>
							<label htmlFor={"input" + index} className="mb-1 text-[15px]">{input.label}</label>
							{input.type=="file" && <label htmlFor={"input" + index} ><img src={imgUrl} alt="" className="w-32 h-32 rounded-full cursor-pointer" /></label>}
							<input type={input.type} placeholder={input.placeholder} id={"input" + index} className={`w-full h-11 rounded-lg bg-gray-200 border border-gray-300 px-4 text-[15px] outline-0 ${input.type=="file" && "hidden"}`} 
							onChange={(event)=>handelData(event,input.name,input.type)}
							/>
						</div>
					)
				})}
			</div>
			<input type="submit" value={btn} className="h-12 w-[300px] rounded-lg bg-blue-600 text-white font-bold cursor-pointer mt-2"/>
			<div className="mt-2"> 
				<p className="text-gray-500 text-[14px]">{footer.description} <Link to={footer.link.url} className="text-blue-600 underline font-bold">{footer.link.content}</Link></p>
			</div>
		</form>
	)
}

export default FormAuth
