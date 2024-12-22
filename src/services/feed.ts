import { fetchGet, fetchPost } from "./serviceClient";

export const createFeed = async ({ category_name, url, keyword }) => {
    return await fetchPost(`${process.env.REACT_APP_API_URL}/v1/feed`, { category_name, url, keyword });
};


export const getFeeds = async (search, category_id) => {
    return await fetchGet(`${process.env.REACT_APP_API_URL}/v1/feed?search=${search}&category_id=${category_id}`);
};