import React, {useCallback} from 'react'
import {RootStateType} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {PaginationLink} from './PaginationLink';
import {PreloaderCircle} from "../../common/Preloader/PreloaderCircle";
import {setCurrentPageAC} from "../../../redux/task-reducer";


export const Paginator = () => {

    const tasksSelector = useCallback((state: RootStateType) => state.tasks, [])
    const {totalTasksQty, currentPage, isLoaded, tasksPerPage} = useSelector(tasksSelector)
    const dispatch = useDispatch()

    const maxPagesQty = Math.ceil(totalTasksQty / tasksPerPage)

    const setCurrentPage = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    }

    const paginationArr = []

    if (currentPage <= 3) {
        for (let i = 1; i <= currentPage + 2; i++) {
            paginationArr.push(i)
        }
    } else if (maxPagesQty - currentPage >= 3) {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            paginationArr.push(i)
        }
    } else {
        for (let i = currentPage - 2; i <= maxPagesQty; i++) {
            paginationArr.push(i)
        }
    }

    return (
        <div className="container my-10">
            <nav className="mx-auto h-28 bg-gb-dark-medium rounded-2xl flex items-center justify-center px-3">
                {!isLoaded &&
                <div className="hidden sm:block mr-3 w-6"/>} {/* для симметрии */}

                {
                    paginationArr.map(pageNumber => {
                            return (
                                <PaginationLink key={pageNumber}
                                                active={pageNumber === currentPage}
                                                onClick={() => {
                                                    setCurrentPage(pageNumber)
                                                }}

                                >
                                    {pageNumber}
                                </PaginationLink>
                            )
                        }
                    )
                }

                {!isLoaded &&
                <div className="hidden sm:block ml-3 w-6"><PreloaderCircle/></div>}
            </nav>
        </div>



        // <div className="container mt-10">
        //     <nav className="mx-auto h-20 bg-gb-dark-medium rounded-2xl flex items-center px-3">
        //         <ul className="text-gb-text flex items-center justify-center text-xl w-full">
        //
        //             <li className="px-5"><button className="px-3 py-1 border-2 rounded-md border-gb-text hover:text-gb-text hover:border-gb-light hover:text-gb-light">
        //                 1
        //             </button>
        //             </li>
        //             <li className="px-5"><button className="px-3 py-1 border-2 rounded-md border-gb-text hover:text-gb-text hover:border-gb-light hover:text-gb-light">
        //                 2
        //             </button>
        //             </li>
        //             <li className="px-5"><button className="px-3 py-1 border-2 rounded-md border-gb-text hover:text-gb-text hover:border-gb-light hover:text-gb-light">
        //                 3
        //             </button>
        //             </li>
        //             <li className="px-5"><button className="px-3 py-1 border-2 rounded-md border-gb-text hover:text-gb-text hover:border-gb-light hover:text-gb-light">
        //                 4
        //             </button>
        //             </li>
        //
        //
        //         </ul>
        //     </nav>
        // </div>
    )
}