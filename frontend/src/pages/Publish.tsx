import { useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface newBlog {
	title: string;
	desc: string;
}

const Publish = () => {
    const navigate = useNavigate();
	const [blog, setBlog] = useState<newBlog>({ title: "", desc: "" });
	const setDesc = (e: { target: { value: any } }) => {
		setBlog({ ...blog, desc: e.target.value });
	};
	return (
		<div>
			<AppBar />
			<div className="flex flex-col items-center gap-10">
				<div className="relative h-11 w-full max-w-screen-lg mt-10 flex items-center ">
					<input
						onChange={(e) =>
							setBlog({ ...blog, title: e.target.value })
						}
						placeholder="Standard"
						className=" text-wrap pl-8 peer h-full w-full border-l border-blue-gray-200 bg-transparent py-8 font-sans text-4xl font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-100"
					/>
				</div>
				<TextArea setDesc={setDesc} />
				<div className="w-full max-w-screen-lg pb-10">
					<button
						onClick={async () =>{
							const res = await axios.post(
								`${BACKEND_URL}/api/v1/blog`,
								{ title: blog.title, content: blog.desc },
								{
									headers: {
										Authorization:
											localStorage.getItem("token"),
									},
								}
							)
                            const id = res.data.id;
                            navigate(`/blog/${id}`)}
						}
						className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
					>
						Publish
					</button>
				</div>
			</div>
		</div>
	);
};

const TextArea = ({
	setDesc,
}: {
	setDesc: (e: {
		target: {
			value: any;
		};
	}) => void;
}) => {
	return (
		<div className="relative min-w-[200px] w-full max-w-screen-lg">
			<textarea
				onChange={setDesc}
				rows={16}
				className="resize-none text-wrap pl-8 peer h-full w-full border-l border-blue-gray-200 bg-transparent py-4 font-serif text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-100"
				placeholder="Tell your story..."
			></textarea>
		</div>
	);
};

export default Publish;
