import { BlogType } from "../hooks";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: BlogType }) => {
	return (
		<div className="grid grid-cols-12 px-[7rem] pt-16">
			<div className="col-span-8">
				<div className="font-black text-4xl pb-2">{blog.title}</div>
				<div className="pb-6 text-slate-500">Posted on Mar 29,2024</div>
				<div className="text-xl font-serif font-light pt-8">
					<p>{blog.content}</p>
				</div>
			</div>
			<div className="col-span-4 pl-20">
				Author
				<div className="flex gap-4 items-center pt-8">
					<Avatar name={blog.author.name} size={10} />
					<div className="font-bold">{blog.author.name}</div>
				</div>
			</div>
		</div>
	);
};

export default FullBlog;
