import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleSpot } from '../../store/Spots'
import { getSpotReviews } from '../../store/Reviews';
import { useParams } from 'react-router-dom';
import SpotImages from './SpotImages';
import './index.css'
import DisplayReviews from './DisplayReviews';
import CreateReviewModal from '../CreateReviewModal';
import OpenModalButton from '../OpenModalButton';


const SingleSpotShow = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector(state => state.spots.singleSpot);
  const reviews = useSelector(state => state.reviews.currentSpotReviews);

  useEffect(() => {dispatch(getSingleSpot(spotId))}, [dispatch]);
  useEffect(() => {dispatch(getSpotReviews(spotId))}, [dispatch]);

  if (!spot || !spot.Owner || !reviews ) return null;

  const avgRating = Number.parseFloat(spot.avgRating).toFixed(1)
  const price = Number.parseFloat(spot.price).toFixed(2)

  return (
    <section id='single-spot'>
      <div>{spot.name}</div>
      <div>{spot.city}, {spot.state}, {spot.country}</div>
      <SpotImages images={spot.SpotImages} />
      <div id='description-container'>
        <div id="name-description-container">
          <div id="hosted-by">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
          <div id="spot-description">{spot.description}</div>
        </div>
        <div id="reserve-container">
          <div id="reserve-container-child1">
            <div>
              <span id="reserve-container-price">${price}</span><span id="reserve-container-child1-night"> night</span>
            </div>
            <div>
              <i className="fa-regular fa-star"></i><span>{avgRating}</span>
            </div>
          </div>
          <div className='reserve-button-container'>
            <button className="reserve-button" type="button">
                Reserve
            </button>
          </div>

        </div>
      </div>
      <div>
        <div><i className="fa-regular fa-star"></i>{avgRating} --- {spot.numReviews} Review</div>
        <div className='review-button-container'>
        <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<CreateReviewModal />}
        />
        </div>
        <ul className='single-spot-display-reviews-list'>
          <DisplayReviews spotId={ spotId }/>
        </ul>
      </div>
    </section>
  )
};

export default SingleSpotShow;
