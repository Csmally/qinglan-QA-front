import { Pagination } from "antd";
import { useCallback } from "react";

interface PageControllerPropsType {
    total: number,
    pageSize: number,
    currentPage: number,
    setCurrentPage: any
}

const PageController: React.FC<PageControllerPropsType> = (props) => {
    const { currentPage, total, pageSize, setCurrentPage } = props;
    const changePage = useCallback((page: number) => {
        setCurrentPage(page)
    }, [setCurrentPage])
    return (
        <Pagination align="center" defaultCurrent={0} current={currentPage} total={total} pageSize={pageSize} onChange={(page) => changePage(page)}/>
    )
}

export default PageController;