import { fetchGet, fetchPost } from "./serviceClient";

export const createFeed = async ({ category_name, url }) => {
    return await fetchPost(`${process.env.REACT_APP_API_URL}/v1/feed`, { category_name, url });
};

export const refetchFeedData = async (feed_id) => {
    return await fetchPost(`${process.env.REACT_APP_API_URL}/v1/feed/refetch`, { feed_id });
};

export const getFeeds = async (search, category_id) => {
    return await fetchGet(`${process.env.REACT_APP_API_URL}/v1/feed?search=${search}&category_id=${category_id}`);
};