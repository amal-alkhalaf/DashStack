import { useEffect, useState } from "react"
import FormAuth from "../components/FormAuth/FormAuth"
import type { Footer, Input, SignUpData } from "../interfaces"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const SignUp = () => {
	const [data, setData] = useState<SignUpData>({
		first_name: "",
		last_name: "",
		user_name: "",
		email: "",
		password: "",
		password_confirmation: "",
		profile_image: null
	})

	const navigate = useNavigate()
	useEffect(() => {
		localStorage.removeItem("logout")
		if (data.first_name != "" && data.last_name != "" && data.user_name != "" && data.email != "" && data.password != "" && data.password_confirmation != "" ) {
			if (data.password != data.password_confirmation) {
				toast.error("Password do not match")
			} else {
				axios.post("https://vica.website/api/register", data, {
					headers: {
						"Content-Type": "multipart/form-data",
						"Accept": "application/json"
					}
				})
					.then(res => {
						console.log(res.data)
						localStorage.setItem("token", res.data.data.token)
						localStorage.setItem("userInfo", JSON.stringify(res.data.data.user))
						localStorage.setItem("user", "newUser")
						navigate("/dashboard")
					})
					.catch(err => {
						console.log(err)
						toast.error("Password do not match")
					})
			}
		}
	}, [data])

	const inputs: Array<Input> = [
		{
			label: "First Name:",
			type: "text",
			placeholder: "First Name",
			name: "first_name"
		},
		{
			label: "Last Name:",
			type: "text",
			placeholder: "Last Name",
			name: "last_name"
		},
		{
			label: "User Name:",
			type: "text",
			placeholder: "User Name",
			name: "user_name"
		},
		{
			label: "Email address:",
			type: "email",
			placeholder: "example@gmail.com",
			name: "email"
		},
		{
			label: "Password:",
			type: "password",
			placeholder: "**********",
			name: "password"
		},
		{
			label: "Confirmation Password:",
			type: "password",
			placeholder: "**********",
			name: "password_confirmation"
		},
		{
			label: "Profile Image:",
			type: "file",
			name: "profile_image"
		}
	]

	const footer: Footer = {
		description: "Already have an account?",
		link: {
			content: "Login",
			url: "/"
		}
	}

	return (
		<FormAuth<SignUpData> title="Create an Account" subTitle="Create an Account to continue" inputs={inputs} btn="Sign Up" footer={footer} setData={setData} />
	)
}

export default SignUp
