import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import Spinner from "../components/Spinner";

export const Blog = () => {
	const { id } = useParams();
	const { blog, loading } = useBlog({
		id: id ?? "1",
	});

	if (loading) {
		return <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>;
	}
	return (
		<>
			<AppBar />
			<FullBlog blog={blog} />
		</>
	);
};
