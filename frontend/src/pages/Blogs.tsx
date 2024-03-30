import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
	const { blogs, loading } = useBlogs();
	console.log(loading);
	if (loading) {
		return (
			<div>
				<AppBar />
				<div className="flex flex-col items-center mt-10">
					<div className="max-w-screen-md w-full">
						<BlogSkeleton />
						<BlogSkeleton />
						<BlogSkeleton />
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<AppBar />
			<div className="flex justify-center py-10">
				<div className="max-w-screen-md">
					{blogs?.map((blog) => (
						<BlogCard
							authorName={blog.author.name}
							title={blog.title}
							content={blog.content}
							id={blog.id}
							publishedDate="Mar 29,2024"
						/>
					))}
				</div>
			</div>
		</>
	);
};
