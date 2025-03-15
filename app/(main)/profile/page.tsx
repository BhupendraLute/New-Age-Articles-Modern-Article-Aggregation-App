"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { IoIosMail } from "react-icons/io";
import { CategoryCard } from "./components/CategoryCard";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { addFollowingCategories, addOtherCategories } from "@/store/features/ArticleCategories";

type Category = {
	id: string;
	name: string;
};

export default function ProfilePage() {
	const dispatch = useDispatch();

	const { user, isLoaded, isSignedIn } = useUser();
	const [processing, setProcessing] = useState(false);

	const followingCategories = useSelector(
		(state: any) => state.ArticleCategories.followingCategories
	);
	const otherCategories = useSelector(
		(state: any) => state.ArticleCategories.otherCategories
	);

	const fetchFollowingCategories = async () => {
		try {
			const response = await axios.get("/api/user/favorite-categories");
			// console.log(response.data);
			dispatch(addFollowingCategories(response.data));

			if (response.status !== 200) {
				throw new Error(
					"Failed to fetch articles from your favorite categories"
				);
			}
		} catch (error) {
			toast("Failed to fetch articles from your favorite categories.", {
				description: "Please try to refresh the page.",
			});
			console.error("Error fetching following categories:", error);
		}
	};

	const fetchOtherCategories = async () => {
		try {
			const response = await axios.get("/api/categories");
			if (followingCategories.length > 0) {
				const filteredCategories = response.data.filter(
					(category: Category) =>
						!followingCategories.find(
							(fc: Category) => fc.id === category.id
						)
				);

				dispatch(addOtherCategories(filteredCategories));
			} else {
				dispatch(addOtherCategories(response.data));
			}

			if (response.status !== 200) {
				throw new Error("Failed to fetch other categories");
			}
		} catch (error) {
			toast("Failed to fetch other categories.", {
				description: "Please try to refresh the page.",
			});
			console.error("Error fetching other categories:", error);
		} 
	};

	const handleFollowCategory = async (categoryId: string) => {
		try {
			setProcessing(true);
			const response = await axios.post("/api/categories/follow", {
				categoryId,
			});

			if (response.status === 200) {
				toast("Category followed successfully.");
			} else {
				throw new Error("Failed to follow category");
			}
			// console.log("follow : ", response.data);
			fetchFollowingCategories();
			fetchOtherCategories();
		} catch (error) {
			toast("Failed to follow category. Please try again.");
			console.error("Error following category:", error);
		} finally {
			setProcessing(false);
		}
	};

	const handleUnfollowCategory = async (categoryId: string) => {
		try {
			setProcessing(true);
			const response = await axios.post("/api/categories/unfollow", {
				categoryId,
			});

			if (response.status === 200) {
				toast("Category unfollowed successfully.");
			} else {
				throw new Error("Failed to unfollow category");
			}
			// console.log("follow : ", response.data);
			fetchFollowingCategories();
			fetchOtherCategories();
		} catch (error) {
			toast("Failed to unfollow category. Please try again.");
			console.error("Error unfollowing category:", error);
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		async function fetchCategories() {
			await fetchFollowingCategories();
			await fetchOtherCategories();
		}
		fetchCategories();
	}, [followingCategories.length]);

	if (!isLoaded) {
		return (
			<div className="flex justify-center items-center h-screen">
				{/* proper profile Loader animation */}
				<div className="loader"></div>
			</div>
		);
	}

	if (!user || !isSignedIn) {
		return (
			<div className="flex justify-center items-center h-screen">
				User not authenticated.
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 max-w-7xl">
			<div className="mb-8">
				<h1 className="text-2xl font-bold">
					Welcome,{" "}
					{user ? (
						<span>
							{user.firstName} {user.lastName}
						</span>
					) : (
						"User"
					)}
				</h1>
				<p className="text-gray-600 flex items-center gap-2 ms-2">
					<span>
						<IoIosMail />
					</span>{" "}
					{user ? (
						<span>{user.emailAddresses[0].emailAddress}</span>
					) : null}
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 ">
				<div className="">
					<h1 className="text-2xl font-bold">Following Categories</h1>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-1 p-4 max-h-[56vh] overflow-y-scroll">
							{followingCategories.length > 0 ? (
								followingCategories.map(
									(category: Category) => (
										<CategoryCard
											key={category.id}
											category={category}
											buttonText="Unfollow"
											onClick={() =>
												handleUnfollowCategory(
													category.id
												)
											}
											isLoading={processing}
										/>
									)
								)
							) : (
								<div className="ms-2 mt-4 text-gray-600">
									You are not following any categories
								</div>
							)}
						</div>
				</div>

				<div className="">
					<h1 className="text-2xl font-bold">Other Categories</h1>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-1 p-4 max-h-[56vh] overflow-y-scroll">
							{otherCategories && (
								otherCategories.map((category: Category) => (
									<CategoryCard
										key={category.id}
										category={category}
										buttonText="Follow"
										onClick={() =>
											handleFollowCategory(category.id)
										}
										isLoading={processing}
									/>
								))
							)}
						</div>
				</div>
			</div>
		</div>
	);
}
