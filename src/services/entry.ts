import { fetchGet } from "./serviceClient";

export const getEntry = async (feed_id, page) => {
    return await fetchGet(`${process.env.REACT_APP_API_URL}/v1/entry?feed_id=${feed_id}&page=${page}`);
};