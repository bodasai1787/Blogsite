import { Link } from "react-router-dom";

interface BlogCardProps {
	authorName: string;
	title: string;
	content: string;
	publishedDate: string;
	id: string;
}

const BlogCard = ({
	id,
	authorName,
	title,
	content,
	publishedDate,
}: BlogCardProps) => {
	return (
		<Link to={`/blog/${id}`}>
			<div className="border-b-[1px] border-slate-200 py-4 cursor-pointer">
				<div className="flex items-center gap-1 pb-2">
					<div className="flex flex-col justify-center">
						<Avatar name={authorName} size={8} />{" "}
					</div>
					<div className="font-light">{authorName}</div>
					<div>
						<Circle />
					</div>
					<div className="font-thin text-slate-600 text-md flex flex-col justify-center text-[14px]">
						{publishedDate}
					</div>
				</div>
				<div className="text-[20px] font-[700] ">{title}</div>
				<div className="text-[16px] font-thin pb-4">
					{content.substring(0, 250) +
						(content.length > 100 ? "..." : "")}
				</div>
				<div className="font-[400] text-[13px] text-[#6B6B6B]">
					{Math.ceil(content.length / 100) + " min read"}
				</div>
			</div>
		</Link>
	);
};

export default BlogCard;

export function Avatar({ name, size = 8 }: { name: string; size?: number }) {
	return (
		<div
			className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
		>
			<span className="text-[14px] text-gray-600 dark:text-gray-300">
				{`${name[0]}${
					name.split(" ").length > 1
						? name.split(" ")[1][0] ?? ""
						: ""
				}`}
			</span>
		</div>
	);
}

export function Circle() {
	return <div className="bg-slate-500 rounded-full h-[2px] w-[2px]"></div>;
}
