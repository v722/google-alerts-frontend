import Category from "components/category";
import FeedList from "components/feedList";
import { useState } from "react";
import { getCategories } from "services/category";

const Feed = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data?.items);
            return response;
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className="d-flex" style={{ height: "100%"}}>
            <div className="row col-12">
                <div className="col-10">
                    <FeedList 
                        selectedCategoryId={selectedCategoryId}
                        fetchCategories={fetchCategories}
                    />
                </div>
                <div className="col-2">
                    <Category
                        setSelectedCategoryId={setSelectedCategoryId}
                        categories={categories}
                        fetchCategories={fetchCategories}
                    />
                </div>
            </div>
        </div>
    )
}

export default Feed;