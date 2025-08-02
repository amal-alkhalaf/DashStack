import { useEffect, useState } from "react"
import FormAuth from "../components/FormAuth/FormAuth"
import type { Footer, Input, LoginData } from "../interfaces"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const Login = () => {
	const [data, setData] = useState<LoginData>({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	useEffect(() => {
		if (data.email != "" && data.password != "") {
			axios.post("https://vica.website/api/login", data, {
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				}
			})
				.then(res => {
					console.log(res)
					localStorage.setItem("token", res.data.token)
					localStorage.setItem("userInfo", JSON.stringify(res.data.user))
					localStorage.setItem("user", "oldUser")
					localStorage.removeItem("logout")
					toast.success("you have been logged in successfully")
					navigate("/dashboard")
				})
				.catch(err => {
					console.log(err)
					toast.error("your email or password is uncorrect")
				})
		}
		if (!localStorage.getItem("token") && data.email == "" && data.password == "" && localStorage.getItem("logout")) {
		toast.success("you have been logout successfully");
	}
	}, [data])
	const inputs: Array<Input> = [
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
		}
	]

	const footer: Footer = {
		description: "Don't have an account?",
		link: {
			content: "Create Account",
			url: "/signup"
		}
	}

	return (
		<FormAuth<LoginData> title="Login to Account" subTitle="Please enter your email and password to continue" inputs={inputs} btn="Sign In" footer={footer} setData={setData} />
	)
}

export default Login
