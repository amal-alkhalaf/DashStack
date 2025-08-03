import type { Dispatch, JSX, SetStateAction } from "react"

export interface Input{
	label:string
	type: string
	placeholder?:string
	name: string
}

export interface LinkTo{
	content:string
	url:string
}

export interface Footer{
	description:string
	link: LinkTo
}

export interface FormAuthProps<T>{
	title:string
	subTitle: string
	inputs : Array<Input>
	btn: string
	footer: Footer
	setData: Dispatch<SetStateAction<T>>
}

export interface LoginData{
	email: string
	password : string
}

export interface SignUpData{
	first_name:string
	last_name:string
	user_name:string
	email: string
	password : string
	password_confirmation:string
	profile_image:Blob | null
}

interface SideBarLink extends LinkTo{
	icon: JSX.Element
}

export interface SideBarProps{
	logo : string
	span : string
	items : Array<SideBarLink>
	setLayer:Dispatch<SetStateAction<boolean>>
}

export interface ConfirmToastProps{
	question: string
	success?:string
	error?:string
	setLayer:Dispatch<SetStateAction<boolean>>
}

export interface ConfirmDeleteProps extends ConfirmToastProps{
	id:number
	setItemDeleted:Dispatch<SetStateAction<number>>
}

export interface CardProps{
	id: number
	image_url: string
	price: string
	name: string
}

export interface CardProps2 extends CardProps{
	setLayer:Dispatch<SetStateAction<boolean>>
	setItemDeleted:Dispatch<SetStateAction<number>>
}

export interface Product extends CardProps{
	created_at: string
	updated_at: string
}

export interface NewProduct{
	image: Blob | null
	price: string
	name: string
}

export interface UserInfo{
	first_name: "",
    last_name: "",
    user_name: "",
    profile_image_url: "/assets/img/profile.jpg"
}