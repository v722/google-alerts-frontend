import { fetchGet } from "./serviceClient";

export const getCategories = async () => {
    return await fetchGet(`${process.env.REACT_APP_API_URL}/v1/category`);
};