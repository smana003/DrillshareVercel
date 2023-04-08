import Review from '../model/Review';

export const getReviewsById = async (req, res, next) => {
  try {
    const reviews = await Review.find({listing : req.query.listing});
    res.send(reviews);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createReview = async (req, res, next) => {
  try {
    const review = new Review({
      listing: req.body.listing,
      user: req.body.user,
      rating: req.body.rating,
      comment: req.body.comment,
      month: req.body.month,
      day: req.body.day,
      year: req.body.year,
    });

    console.log(review);
    await review.save();
    res.send(review);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const deleteReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.query);
    res.send(review);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};