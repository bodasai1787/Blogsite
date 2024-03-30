import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface BlogType {
	title: string;
	content: string;
	author: {
		name: string;
	};
	id: string;
}

export const useBlog = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<BlogType>({
        title: "",
        content: "",
        author: {
            name: "Anonymous"
        },
        id: ""
    });

	function fetchBlogs() {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => setBlog(response.data.post))
			.then(() => setLoading(false));
	}

	useEffect(fetchBlogs, []);

	return { loading, blog };
};

export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<BlogType[]>();

	function fetchBlogs() {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => setBlogs(response.data.blogs))
			.then(() => setLoading(false));
	}

	useEffect(fetchBlogs, []);

	return { loading, blogs };
};
