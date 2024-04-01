import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
	const navigate = useNavigate();
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-12 laptop:col-span-7 p-10 flex flex-col justify-center h-screen font-extrabold text-6xl">
				<div className=" bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-w-fit">
					Medium
				</div>
				<div className="italic text-gray-600 mt-[3rem] font-semibold text-4xl">
					Discover, Engage, Blog: Your Online Odyssey Begins Here!
				</div>
				<div>
					<button
						onClick={() => {
							navigate("/signup");
						}}
						type="button"
						className="mt-[6rem] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						Join Medium
					</button>
				</div>
			</div>
			<div className=" hidden col-span-5 banner rounded-l-2xl laptop:block"></div>
		</div>
	);
};

export default Home;
