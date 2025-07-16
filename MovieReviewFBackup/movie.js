const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");
const APILINK = "http://localhost:8000/api/v1/reviews/";

const main = document.getElementById("section");
const title = document.getElementById("title");
title.innerText = movieTitle;

// 🆕 New Review Form
const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="col">
      <div class="card">
        <h4>New Review</h4>
        <p><strong>Review:</strong>
          <input type="text" id="new_review" value="">
        </p>
        <p><strong>User:</strong>
          <input type="text" id="new_user" value="">
        </p>
        <p>
          <a href="#" onclick="saveReview('new_review','new_user')">
            💾
          </a>
        </p>
      </div>
    </div>
  </div>`;
main.appendChild(div_new);

// 🔁 Fetch and display reviews
function returnReviews(url) {
  fetch(url + "movie/" + movieId)
    .then(res => res.json())
    .then(function (data) {
      console.log(data);
      data.forEach(review => {
        const div_card = document.createElement('div');
        div_card.innerHTML = `
          <div class="row">
            <div class="col">
              <div class="card" id="${review.id}">
                <p><strong>Review:</strong> ${review.review}</p>
                <p><strong>User:</strong> ${review.user}</p>
                <p>
                  <a href="#" onclick="editReview('${review.id}', '${review.review}', '${review.user}')">✏️</a>
                  <a href="#" onclick="deleteReview('${review.id}')">🗑️</a>
                </p>
              </div>
            </div>
          </div>`;
        main.appendChild(div_card);
      });
    });
}

returnReviews(APILINK);

// ✏️ Edit Review

function editReview(id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = "review" + id;
  const userInputId = "user" + id;

  element.innerHTML = `
    <p><strong>Review:</strong>
      <input type="text" id="${reviewInputId}" value="${review}" />
    </p>
    <p><strong>User:</strong>
      <input type="text" id="${userInputId}" value="${user}" />
    </p>
    <p>
      <a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">
        💾 Save
      </a>
    </p>`;
}



// 💾 Save or Update Review
function saveReview(reviewInputId, userInputId, id = "") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  const method = id ? "PUT" : "POST";
  const endpoint = id ? APILINK + id : APILINK + "new";
  const payload = id
    ? { user, review }
    : { user, review, movieId };

  fetch(endpoint, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      location.reload();
    });
}

// 🗑️ Delete Review
function deleteReview(id) {
  fetch(APILINK + id, { method: 'DELETE' })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      location.reload();
    });
}
