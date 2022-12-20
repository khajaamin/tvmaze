import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'

 const RatingStar = (props) => {

    let allstars = []
    const colorStart = []
    const star = []
    for(let i= 1; i<= 10; i++){
        if( i <= Math.round(props.rating)){
        colorStart.push( <i key={'start'+i} className="rating-color ms-1">
        <FontAwesomeIcon icon={faStar} />
    </i>)
        }else{
            star.push(<i  key={'start'+i}  className="ms-1">
            <FontAwesomeIcon icon={faStar} />
        </i>)
        }
    }
    allstars = [...colorStart, ...star]
    
    return props.rating ? (
        <div className="d-flex align-items-center">
            <div className="ratings">
             {allstars}
            </div>
            <div className="mt-2">
                <h5 className="review-count">{props.rating}</h5>
            </div>
        </div>
    ) : null
}

export default RatingStar