export const fetchPost = async (url, data) => {
    try {
        const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!response.ok) {
            const body = await response.json();
            throw new Error(body ? body.message : "Something went wrong");
        }
        return await response.json();
    } catch (error) {
        return error;
    }
};


export const fetchGet = async (url) => {
    try {
        const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
        const body = await response.json();

        if (!response.ok) {
            throw new Error(body ? body.message : "Something went wrong");
        }
        return body
    } catch (error) {
        return error;
    }
};