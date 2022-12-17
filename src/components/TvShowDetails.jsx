import { useEffect, useState,useCallback } from 'react'
// import showImage from '../assets/images/show_image.jpg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUserCircle } from '@fortawesome/fontawesome-free-solid'
import { useParams } from 'react-router-dom';
import {get} from '../api/api_helper';
import {GET_SHOW_DETAIL} from '../api/api_url'

library.add(faUserCircle);
export default function TvShowDetails() {
    const [showDetails, setShowDetails] = useState({}) 
    const {name,image,summary,rating,genres,status, schedule,webChannel, _embedded} = showDetails || {}

    const params = useParams()
    const {id} = params;
    const getShowDetailsById = useCallback(async() => {
        try {         
            await get(`${GET_SHOW_DETAIL}${id}?embed=cast`).then((res)=>{
                if(res){
                    setShowDetails(res);
                }
            })
            // const data = await axios.get(`https://api.tvmaze.com/shows/${id}?embed=cast`).then((apiResponse) => {
            //     return apiResponse.data;
            // });
            // if(data){
            //     console.log(data);
            //     setShowDetails(data);
            // }
        } catch (error) {
            if (error.response) {
                console.log('Error Response',error.response);
            }
        } 
    },[id])
    useEffect(()=>{
        getShowDetailsById();
    },[getShowDetailsById])

    
    

    return (
        <>
            <div className="container-fluid px-md-0">
                {showDetails ? (
                    <>
                        <section
                            className="side-padding"
                            style={{ background: 'lightyellow' }}
                        >
                            <article
                                className="row mb-md-5"
                                style={{ background: 'lightyellow' }}
                            >
                                <div className="py-3 py-md-5 col-12">
                                    <h4>TV Bland</h4>
                                </div>
                                <div className="col-12 col-md-5 col-lg-3 pt-md-3">
                                    <img
                                        className="margin-bottom-img hw-100"
                                        src={image ? image.medium : ''}
                                        alt="showimg"
                                        height="300px"
                                    />
                                </div>
                                <div className="col-12 col-md-7 col-lg-8">
                                    <div className="star-ratings-card py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="ratings">
                                                <i className="rating-color ms-1">
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                </i>
                                                <i className="rating-color ms-1">
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                </i>
                                                <i className="rating-color ms-1">
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                </i>
                                                <i className="rating-color ms-1">
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                </i>
                                                <i className="ms-1">
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                    />
                                                </i>
                                            </div>
                                            <div className="mt-2">
                                                <h5 className="review-count">
                                                    {rating
                                                        ? rating.average
                                                        : 0}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <h4>{name} </h4>
                                    <div
                                        style={{ fontSize: '16px' }}
                                        dangerouslySetInnerHTML={{
                                            __html: summary,
                                        }}
                                    ></div>
                                    <div className='grid'>
                                        {showDetails?.genres?.map((item) => {
                                            return (
                                                <div className='badge rounded-pill text-bg-secondary me-1'>
                                                    {item}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </article>
                        </section>
                        <section className="side-padding paddingTop5rem">
                            <div className="row">
                                <div className="col-12 col-md-5 col-lg-6 d-none d-md-block">
                                    <div className="col-12 py-5 pb-2">
                                        <h5>Show Info</h5>
                                    </div>
                                    <table className="table table-responsive">
                                        <tbody>
                                            <tr>
                                                <th
                                                    className="ps-0"
                                                    scope="row"
                                                >
                                                    Streamed On
                                                </th>
                                                <td className="userIconColor">
                                                    {webChannel !== ''
                                                        ? webChannel
                                                        : ''}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    className="ps-0"
                                                    scope="row"
                                                >
                                                    Schedule
                                                </th>
                                                <td className="userIconColor">
                                                    {schedule && schedule.days
                                                        ? schedule.days[0]
                                                        : ''}{' '}
                                                    {schedule && schedule.time
                                                        ? schedule.time
                                                        : ''}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    className="ps-0"
                                                    scope="row"
                                                >
                                                    Status
                                                </th>
                                                <td className="userIconColor">
                                                    {status}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    className="ps-0"
                                                    scope="row"
                                                >
                                                    Genres
                                                </th>
                                                <td className="userIconColor">
                                                    {genres
                                                        ? genres.join(', ')
                                                        : ''}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12 col-md-6 d-block d-md-none">
                                    <div className="col-12 py-5 pb-2">
                                        <h5>Show Info</h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label className="ps-0 col-12">
                                                Streamed On
                                            </label>
                                            <label className="userIconColor col-12">
                                                {webChannel !== ''
                                                    ? webChannel
                                                    : ''}
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <label className="ps-0">
                                                Schedule
                                            </label>
                                            <div className="userIconColor">
                                                {schedule && schedule.days
                                                    ? schedule.days[0]
                                                    : ''}{' '}
                                                {schedule && schedule.time
                                                    ? schedule.time
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label className="ps-0 col-12">
                                                Status
                                            </label>
                                            <label className="userIconColor col-12">
                                                {status}
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <label className="ps-0">
                                                Genres
                                            </label>
                                            <div className="userIconColor">
                                                {genres
                                                    ? genres.join(', ')
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-7 col-lg-6">
                                    <div className="col-12 py-5 pb-2">
                                        <h5>Starring</h5>
                                    </div>
                                    <table className="table table-responsive align-middle">
                                        <tbody>
                                            {_embedded?.cast?.map(
                                                (castObj, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="userIconColor ps-0 align-middle">
                                                                <img
                                                                    width={40}
                                                                    alt={'alt'}
                                                                    src={
                                                                        castObj
                                                                            ?.person
                                                                            ?.image
                                                                            ?.medium
                                                                    }
                                                                />
                                                            </td>
                                                            <td
                                                                className=""
                                                                noWrap
                                                            >
                                                                {
                                                                    castObj
                                                                        .person
                                                                        .name
                                                                }
                                                                <div className="userIconColor d-block d-md-none">
                                                                    {
                                                                        castObj
                                                                            .character
                                                                            .name
                                                                    }
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <img
                                                                    width={40}
                                                                    alt={'alt'}
                                                                    src={
                                                                        castObj
                                                                            ?.character
                                                                            ?.image
                                                                            ?.medium
                                                                    }
                                                                />
                                                            </td>

                                                            <td className="userIconColor">
                                                                {
                                                                    castObj
                                                                        .character
                                                                        .name
                                                                }
                                                            </td>
                                                            {/* <td className="userIconColor d-none d-md-block" >{castObj.character.name}</td> */}
                                                        </tr>
                                                    )
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </>
                ) : null}
            </div>
        </>
    )
}