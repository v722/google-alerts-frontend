import { useEffect, useState } from 'react';
import { createFeed, getFeeds } from 'services/feed';
import Sidebar from './sideBar';
import CreateAlert from './createAlert';
import EntryCard from './entry';
import { getEntry } from 'services/entry';
import { AlertTriangle } from 'lucide-react';
import Loader from './loader';
import { Pagination } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess } from './toaster';

const DEFAULT_ITEMS_PER_PAGE = 5, DEFAULT_PAGE_NUMBER = 1;

const FeedList = (props) => {

    const { selectedCategoryId } = props;

    const [loader, setLoader] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFeed, setSelectedFeed] = useState();
    const [feedData, setFeedData] = useState([]);
    const [entryData, setEntryData] = useState([]);
    const [formData, setFormData] = useState<{ url: string, keyword: string, category_name: string } | null>({ url: "", keyword: "", category_name: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchEntry(selectedFeed, currentPage);
    }, [selectedFeed]);

    useEffect(() => {
        fetchFeed(searchTerm, selectedCategoryId);
    }, [searchTerm, selectedCategoryId]);

    const fetchFeed = async (search?, category_id?) => {
        try {
            setLoader(true);
            const response = await getFeeds(search, category_id);
            setFeedData(response.data?.items);
            setLoader(false);
            return response;
        } catch (error) {
            console.log("error");
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchEntry(selectedFeed, pageNumber);
    }

    const fetchEntry = async (selectedFeed, pageNumber) => {
        try {
            setLoader(true);
            const response = await getEntry(selectedFeed, pageNumber);
            setEntryData(response.data?.items);
            setTotalPages(Math.ceil(response.data?.totalCount / DEFAULT_ITEMS_PER_PAGE));
        } catch (error) {
            console.log("error");
        } finally {
            setLoader(false);
        }
    }

    const isValid = () => {
        const errorList: any = {};

        if (!formData.keyword.trim()) {
            errorList.keyword = "Keyword is required";
        }

        if (!formData.url.trim()) {
            errorList.url = "URL is required";
        }

        if (!formData.category_name.trim()) {
            errorList.category_name = "Category name is required";
        }

        return errorList;
    };

    const addFeed = async () => {
        try {
            setLoader(true);
            const validationErrors = isValid();
            if (Object.keys(validationErrors).length > 0) {
                notifyError(Object.values(validationErrors)?.join(", "));
                setLoader(false);
                return;
            }
            const response = await createFeed({ category_name: formData?.category_name, keyword: formData?.keyword, url: formData?.url });
            if (response?.success) {
                notifySuccess("Feed added successfully");
            } else {
                notifyError(response.data?.msg);
            }
            setFormData({ url: "", keyword: "", category_name: "" });
            setOpenForm(false)
        } catch (error) {
            console.log("error", error);
            notifyError(error?.msg);
        } finally {
            fetchFeed();
            setLoader(false);
        }
    }

    const handleSelectAlert = (selectedId) => {
        setSelectedFeed(selectedId);
        setCurrentPage(DEFAULT_PAGE_NUMBER);
    }

    const renderPagination = () => {
        if (totalPages <= DEFAULT_PAGE_NUMBER) return null;

        let items = [];
        let startPage = Math.max(DEFAULT_PAGE_NUMBER, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + DEFAULT_ITEMS_PER_PAGE - DEFAULT_PAGE_NUMBER);
        if (endPage - startPage < DEFAULT_ITEMS_PER_PAGE - DEFAULT_PAGE_NUMBER) {
            startPage = Math.max(DEFAULT_PAGE_NUMBER, endPage - DEFAULT_ITEMS_PER_PAGE + DEFAULT_PAGE_NUMBER);
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        return (
            <Pagination className="justify-content-center mt-4">
                <Pagination.First
                    onClick={() => handlePageChange(DEFAULT_PAGE_NUMBER)}
                    disabled={currentPage === DEFAULT_PAGE_NUMBER}
                />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - DEFAULT_PAGE_NUMBER)}
                    disabled={currentPage === DEFAULT_PAGE_NUMBER}
                />
                {startPage > 1 && (
                    <>
                        <Pagination.Item onClick={() => handlePageChange(DEFAULT_PAGE_NUMBER)}>{DEFAULT_PAGE_NUMBER}</Pagination.Item>
                        {startPage > 2 && <Pagination.Ellipsis />}
                    </>
                )}
                {items}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - DEFAULT_PAGE_NUMBER && <Pagination.Ellipsis />}
                        <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                            {totalPages}
                        </Pagination.Item>
                    </>
                )}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + DEFAULT_PAGE_NUMBER)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        );
    };

    return (
        <>
            <div className='d-flex' style={{ height: "100%" }}>
                <ToastContainer />
                <div className='row col-12'>
                    <div className='col-4'>
                        <Sidebar
                            setOpenForm={setOpenForm}
                            feedData={feedData}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedFeed={selectedFeed}
                            handleSelectAlert={handleSelectAlert}
                            loader={loader}
                        />
                        <CreateAlert
                            openForm={openForm}
                            setOpenForm={setOpenForm}
                            addFeed={addFeed}
                            setFormData={setFormData}
                            formData={formData}
                        />
                    </div>
                    <div className="col-8">
                        {loader ? <Loader /> : (
                            entryData?.length > 0 ? entryData.map(el => {
                                return <EntryCard
                                    author={el?.author}
                                    published_at={el?.pubDate}
                                    title={el?.title}
                                    content={el?.content}
                                    link={el?.link}
                                />
                            }) : (
                                <div className="no-entries">
                                    <AlertTriangle size={50} color="gray" />
                                    <p>No entries found.</p>
                                </div>
                            )
                        )}
                        {renderPagination()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeedList;
