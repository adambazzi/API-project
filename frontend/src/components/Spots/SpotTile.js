
import { Link } from 'react-router-dom'

const SpotTile = ({ spot }) => {
    return (
        <Link className='spot-tile' key={spot.id} to={`spots/${spot.id}`}>
            <img className='spot-tile-image' src={spot.previewImage} alt={spot.name}></img>
            <div className='spot-tile-city-state'>{spot.city}, ${spot.state}</div>
            <div className="spot-tile-price">${spot.price} night</div>
            <span className="spot-tile-stars"><i className="fa-regular fa-star"></i>{spot.stars}</span>
        </Link>
    )
}

export default SpotTile
