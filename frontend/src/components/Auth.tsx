import { signupInput } from "@star_dust1/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type = "signup" }: { type: "signup" | "signin" }) => {
	const navigate = useNavigate();
	const [postInputs, setPostInputs] = useState<signupInput>({
		name: "",
		email: "",
		password: "",
	});

	const sendRequest = async () => {
		try{
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${
                    type === "signup" ? "signup" : "signin"
                }`,
                postInputs
            );
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
        catch(err){
            console.log("Oops! Something went wrong");
        }
	};
	return (
		<div className=" w-full h-screen flex justify-center flex-col items-center px-[25%]">
			<div className="w-full">
				<div className="flex flex-col items-center">
					<div className="text-3xl font-extrabold ">
						{type === "signup"
							? "Create an account"
							: "Login to your account"}
					</div>
					<div className="text-slate-400">
						{type === "signup"
							? "Already have an account?"
							: "Don't have an account?"}{" "}
						<Link
							to={type === "signup" ? "/signin" : "/signup"}
							className="underline"
						>
							{type === "signin" ? "Sign up" : "Sign in"}
						</Link>
					</div>
				</div>
				<div className="flex flex-col gap-4 mt-8">
					{type === "signup" && (
						<LablledInput
							label="Name"
							placeholder="Gaurav Dhankhar"
							onChange={(e) => {
								setPostInputs((c) => ({
									...c,
									name: e.target.value,
								}));
							}}
						/>
					)}
					<LablledInput
						label="Email"
						placeholder="gaurav@gmail.com"
						onChange={(e) => {
							setPostInputs((c) => ({
								...c,
								email: e.target.value,
							}));
						}}
					/>
					<LablledInput
						label="Password"
						type="password"
						placeholder=""
						onChange={(e) => {
							setPostInputs((c) => ({
								...c,
								password: e.target.value,
							}));
						}}
					/>
				</div>
				<div>
					<button
                        onClick={sendRequest}
						type="button"
						className=" mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>
						{type === "signin" ? "Sign in" : "Sign up"}
					</button>
				</div>
			</div>
		</div>
	);
};

interface LabelledInputProps {
	label: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
}

const LablledInput = ({
	label,
	placeholder,
	onChange,
	type,
}: LabelledInputProps) => {
	return (
		<div>
			<label className="block mb-2 text-sm text-gray-900 font-bold">
				{label}
			</label>
			<input
				onChange={onChange}
				id="first_name"
				type={type}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
				placeholder={placeholder}
				required
			/>
		</div>
	);
};
