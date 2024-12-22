export const fetchPost = async (url, data) => {
    try {
        const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!response.ok) {
            const body = await response.json();
            throw { msg: body.msg || "Something went wrong", status: body.code || 400 };
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const fetchGet = async (url) => {
    try {
        const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
        const body = await response.json();

        if (!response.ok) {
            throw { msg: body.msg || "Something went wrong", status: body.code || 400 };
        }
        return body
    } catch (error) {
        throw error;
    }
};