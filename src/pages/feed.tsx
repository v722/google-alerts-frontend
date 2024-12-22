import Category from "components/category";
import FeedList from "components/feedList";
import { useState } from "react";

const Feed = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    return (
        <div className="d-flex" style={{ height: "100%"}}>
            <div className="row col-12">
                <div className="col-10">
                    <FeedList 
                        selectedCategoryId={selectedCategoryId}
                    />
                </div>
                <div className="col-2">
                    <Category
                        setSelectedCategoryId={setSelectedCategoryId}
                    />
                </div>
            </div>
        </div>
    )
}

export default Feed;