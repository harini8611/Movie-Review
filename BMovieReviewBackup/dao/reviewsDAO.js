//reviewsDAO.js
import mysql from "mysql2";

export default class ReviewsDAO {
  static async injectDB(conn) {
    this.conn = conn;
  }

  static async addReview(movieId, user, review) {
    try {
      const [result] = await this.conn.promise().execute(
        "INSERT INTO reviews (movieId, user, review) VALUES (?, ?, ?)",
        [movieId, user, review]
      );
      return result;
    } catch (e) {
      return { error: e };
    }
  }

  static async getReview(reviewId) {
    try {
      const [rows] = await this.conn.promise().execute(
        "SELECT * FROM reviews WHERE id = ?",
        [reviewId]
      );
      return rows[0];
    } catch (e) {
      return { error: e };
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const [result] = await this.conn.promise().execute(
        "UPDATE reviews SET user = ?, review = ? WHERE id = ?",
        [user, review, reviewId]
      );
      return result;
    } catch (e) {
      return { error: e };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const [result] = await this.conn.promise().execute(
        "DELETE FROM reviews WHERE id = ?",
        [reviewId]
      );
      return result;
    } catch (e) {
      return { error: e };
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      const [rows] = await this.conn.promise().execute(
        "SELECT * FROM reviews WHERE movieId = ?",
        [movieId]
      );
      return rows;
    } catch (e) {
      return { error: e };
    }
  }
}
