import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { get } from '../api/api_helper'
import { GET_SHOW_LIST } from '../api/api_url'
import RatingStar from './rattings'
import { useSelector, useDispatch } from 'react-redux'
import { addShowsInStore } from '../redux/action'

export default function TvShowList() {
    const dispatch = useDispatch()
    // const [shows, setShows] = useState([])
    const [currentPageRows, setCurrentPageRows] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const rowsPerPage = 12
    const [noOfPages, setNoOfPages] = useState([])
    const shows = useSelector((state) => state.shows)

    const navigate = useNavigate()

    const getShowsList = useCallback(async () => {
        try {
            await get(GET_SHOW_LIST).then((res) => {
                if (res.length > 0) {
                    // setShows(res)
                    dispatch(addShowsInStore(res))
                    setCurrentPage(1)
                    let pagesArr = []
                    for (let i = 1; i <= res.length / rowsPerPage; i++) {
                        pagesArr.push(i)
                    }
                    setNoOfPages(pagesArr)
                }
            })
        } catch (error) {
            if (error.response) {
                console.log('Error Response', error.response)
            }
        }
    }, [dispatch])

    useEffect(() => {
        getShowsList()
    }, [getShowsList])

    const pageChange = (currentPage) => {
        setCurrentPage(currentPage)
    }
    const getCurrentPageRecords = useCallback(
        (currentPage) => {
            let currentPageRecords = shows.slice(
                (currentPage - 1) * rowsPerPage,
                (currentPage - 1) * rowsPerPage + rowsPerPage
            )
            setCurrentPageRows(currentPageRecords)
        },
        [shows]
    )
    useEffect(() => {
        if (currentPage > 0) getCurrentPageRecords(currentPage)
    }, [currentPage, getCurrentPageRecords])

    const goToShowDetails = (id, name) => {
        navigate(`/showdetails/${id}`)
    }

    return (
        <>
            <div className="container-fluid">
                <section
                    className="row side-padding"
                    style={{ background: 'lightyellow' }}
                >
                    <article className="mb-5 pb-5">
                        <div className="py-4 pt-5">
                            <h4>TV Bland</h4>
                        </div>
                        <p className="py-2 pb-5">
                            TV Show & web series database <br />
                            Create personalised schedules. Episode guide cast
                            crew and character information
                        </p>
                    </article>
                </section>

                {currentPageRows.length > 0 ? (
                    <section style={{ marginTop: '-90px' }}>
                        <div className="row mb-4 side-padding">
                            {currentPageRows.map((showItem, index) => {
                                const { name, airtime, show, rating } =
                                    showItem || {}
                                return (
                                    <div
                                        key={index}
                                        className="card col-md-2 col-6 pr-4"
                                        style={{
                                            borderRadius: '0px',
                                            border: '0px',
                                        }}
                                    >
                                        <LazyLoadImage
                                            alt={name}
                                            onClick={() =>
                                                goToShowDetails(show.id, name)
                                            }
                                            style={{ cursor: 'pointer' }}
                                            width={'100%'}
                                            src={show.image.medium} // use normal <img> attributes as props
                                        />
                                        <div className="name-title">
                                            <strong>{name}</strong>
                                        </div>
                                        <div className="airtime-lable">
                                            {airtime}
                                        </div>

                                        {rating ? (
                                            <RatingStar rating={rating.average}>
                                                {' '}
                                            </RatingStar>
                                        ) : null}

                                        {/* <div
                                            className="card-body px-0"
                                            style={{ fontSize: '14px' }}
                                            dangerouslySetInnerHTML={{
                                                __html: summary?summary: show.summary,
                                            }}
                                        ></div> */}
                                    </div>
                                )
                            })}

                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button
                                            type="button"
                                            className="page-link btn"
                                            aria-label="Previous"
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                pageChange(currentPage - 1)
                                            }
                                        >
                                            <span aria-hidden="true">
                                                &laquo;
                                            </span>
                                        </button>
                                    </li>
                                    {noOfPages.map((i, index) => {
                                        return (
                                            <li
                                                key={'page' + index}
                                                className={`page-item d-none d-md-block ${
                                                    index === currentPage - 1
                                                        ? 'active'
                                                        : null
                                                }`}
                                            >
                                                <button
                                                    type="button"
                                                    className="page-link btn"
                                                    onClick={() =>
                                                        pageChange(i)
                                                    }
                                                >
                                                    {i}
                                                </button>
                                            </li>
                                        )
                                    })}
                                    <li className="page-item">
                                        <button
                                            type="button"
                                            className="page-link btn"
                                            aria-label="Next"
                                            onClick={() =>
                                                pageChange(currentPage + 1)
                                            }
                                            disabled={
                                                currentPage >=
                                                Math.ceil(
                                                    shows.length / rowsPerPage
                                                ) -
                                                    1
                                            }
                                        >
                                            <span aria-hidden="true">
                                                &raquo;
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </section>
                ) : null}
            </div>
        </>
    )
}
