import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";

export const Blog = () => {
	const { id } = useParams();
	const { blog, loading } = useBlog({
		id: id ?? "1",
	});

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<AppBar />
			<FullBlog blog={blog} />
		</>
	);
};
