import ReviewsDAO from "../dao/reviewsDAO.js";


export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const { movieId, user, review } = req.body;

      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      const id = req.params.id;
      const review = await ReviewsDAO.getReview(id);

      if (!review) {
        res.status(404).json({ error: "Not Found" });
        return;
      }
      res.json(review);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const { user, review } = req.body;

      const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);
      const { affectedRows } = reviewResponse;

      if (affectedRows === 0) {
        throw new Error("Unable to update review");
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      const movieId = req.params.id;
      const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);

      if (!reviews || reviews.length === 0) {
        res.status(404).json({ error: "Not Found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
