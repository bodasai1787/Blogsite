import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const AppBar = () => {
	return (
		<div className="border-b-[1px] flex justify-between px-10 py-4 items-center">
			<Link
				to={"/blogs"}
				className="flex gap-6 items-center justify-center"
			>
				<IconSvg />
				<div className="text-xl">Medium</div>
			</Link>
			<div className="flex gap-4 items-center">
				<Link to={`/publish`}>
					<button
						className="select-none rounded-lg bg-green-500 py-[0.75rem] px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
					>
						New
					</button>
				</Link>
				<Avatar name="Gaurav" size={8} />
			</div>
		</div>
	);
};

export default AppBar;

const IconSvg = () => {
	return (
		<svg viewBox="0 0 1043.63 592.71" height={20}>
			<path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
		</svg>
	);
};
