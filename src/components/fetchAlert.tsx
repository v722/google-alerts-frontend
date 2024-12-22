import Modal from "react-modal";

const CUSTOM_MODAL_STYLE = {
    content: {
        background: "none",
        border: "none",
        padding: "0px",
        overflowX: "auto",
        overflowY: "auto",
        left: "5%",
        top: "25%",
        maxHeight: "80vh",
        width: "500px",
    },
    overlay: {
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.75)",
    },
    overFlow: "auto",
};


const FetchAlert = (props) => {

    const { openForm, setOpenForm, addFeed, setFormData, formData } = props;

    const handleChange = (e) => {
        setFormData(Object.assign({}, formData, {
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={openForm}
            style={{
                content: {
                    ...CUSTOM_MODAL_STYLE.content,
                    maxWidth: "600px",
                    margin: "auto",
                    borderRadius: "8px",
                    padding: "20px",
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
            contentLabel="Create Alert Modal"
        >
            <div className="bg-white rounded">
                <div className="text-center py-3 border-bottom">
                    <h5 className="mb-0 text-primary text-uppercase">Fetch Google RSS Alert</h5>
                </div>
                <div className="px-4 py-3">
                    <form>
                        <div className="mb-3">
                            <label className="form-label text-dark" htmlFor="url">
                                Google Url
                            </label>
                            <input
                                type="text"
                                id="url"
                                name="url"
                                className="form-control"
                                value={formData.url}
                                placeholder="Enter url"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-dark" htmlFor="category_name">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category_name"
                                name="category_name"
                                className="form-control"
                                value={formData.category_name}
                                placeholder="Enter category"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </form>
                </div>
                <div className="d-flex justify-content-end border-top px-4 py-3">
                    <button
                        className="btn btn-secondary text-uppercase mx-2"
                        type="button"
                        onClick={() => setOpenForm(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary text-uppercase"
                        type="button"
                        onClick={() => addFeed()}
                    >
                        Fetch
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default FetchAlert;