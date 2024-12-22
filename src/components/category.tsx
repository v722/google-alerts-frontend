import { useEffect, useState } from "react";
import { getCategories } from "services/category";
import { Form } from 'react-bootstrap';

const Category = (props) => {

    const { setSelectedCategoryId } = props;

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data?.items);
            return response;
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleChange = (e) => {
        console.log("e.target.value", e.target.value);
        if (e.target.selectedIndex) {
            const selectedIndex = e.target.selectedIndex - 1;
            const id = categories[selectedIndex]._id;
            setSelectedCategoryId(id);
        } else {
            setSelectedCategoryId(null);
        }
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="d-flex justify-content-end mx-3 p-3">
            <Form.Select
                value={selectedCategory}
                onChange={(e) => handleChange(e)}
                style={{ width: '200px' }}
            >
                <option value="all">All Categories</option>
                {categories?.length && categories.map(item => (
                    <option key={item._id} value={item.name}>{item.name}</option>
                ))}
            </Form.Select>
        </div>
    );
}

export default Category;