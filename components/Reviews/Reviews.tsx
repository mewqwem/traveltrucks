"use client";
import { Review } from "@/types/campers";
import css from "./Reviews.module.css";
import Avatar from "react-avatar";
import { FaStar } from "react-icons/fa";

interface ReviewsProps {
  reviews: Review[];
  totalReviews: number;
}

function Reviews({ reviews, totalReviews }: ReviewsProps) {
  if (totalReviews === 0) {
    return <div>Not Reviews</div>;
  }
  return (
    <div>
      <ul className={css.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={css.reviewItem}>
            <div className={css.reviewWrapper}>
              <Avatar
                name={review.reviewer_name}
                size="60"
                round={true}
                color="#FFFFFF"
                fgColor="#829b91"
                className={css.userAvatar}
              />
              <div>
                <h3 className={css.userName}>{review.reviewer_name}</h3>
                <div className={css.ratingStars}>
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < review.reviewer_rating
                          ? css.starFilled
                          : css.starEmpty
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className={css.reviewText}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
