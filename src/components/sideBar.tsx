import { Button } from 'react-bootstrap';
import Loader from './loader';

const Sidebar = (props) => {
    const { setOpenForm, feedData, selectedFeed, loader, searchTerm, setSearchTerm, handleSelectAlert } = props;

    return (
        <div className="border-end p-3 bg-light" style={{ width: '400px', height: "100%" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Alerts</h5>
                <Button variant="outline-primary" size="sm" onClick={() => setOpenForm(true)}>
                    +
                </Button>
            </div>
            <h4 className="mb-3">Feed Search</h4>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search feed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                {loader ? <Loader /> : feedData?.map(data => (
                    <div
                        key={data._id}
                        className={`p-2 mb-2 rounded ${selectedFeed === data?._id ? "bg-info" : "bg-light"}  cursor-pointer`}
                        onClick={() => handleSelectAlert(data?._id)}
                    >
                        <div className={`${selectedFeed === data?._id ? "bold-text" : ""}`}>{data.title?.toUpperCase()}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;