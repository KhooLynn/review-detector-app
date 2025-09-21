import React, { useState } from "react";
import "./App.css";

function App() {
  const [restaurant, setRestaurant] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch or generate random reviews
  const getReviews = async (presetName) => {
    const query = presetName || restaurant;
    if (!query) return alert("Enter a restaurant name");
    setLoading(true);

    try {
      // Simulate random reviews instead of fetching from API
      const randomReviews = Array.from({ length: 5 }).map((_, idx) => {
        const isFake = Math.random() < 0.5; // 50% chance
        return {
          username: `User${idx + 1}`,
          text: isFake ? "This is a fake review!" : "This is an actual review.",
          label: isFake ? "Fake Review" : "Actual Review",
          fake_score: Math.floor(Math.random() * 100) + 1,
        };
      });

      setReviews(randomReviews);
      setRestaurant(query);
    } catch (err) {
      alert("Error generating reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Assign class based on label
  const getClassName = (label) => {
    if (label === "Actual Review") return "review real";
    if (label === "Fake Review") return "review fake";
    return "review suspicious"; // fallback
  };

  return (
    <>
      <div className="container">

        {/* Hero Section */}
        <header className="hero">
          <h1>🍽️ Restaurant Review Checker</h1>
          <p className="tagline">
            Discover which reviews are <b>real</b> and which might be <b>fake or promotional</b>.
          </p>
        </header>

        {/* Search Section */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a restaurant name"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
          />
          <button onClick={() => getReviews()} disabled={loading}>
            {loading ? "Loading..." : "Check Reviews"}
          </button>
          <button className="demo-btn" onClick={() => getReviews("McDonald's")}>
            🍔 Try McDonald's
          </button>
        </div>

        {/* Review Results Section */}
        <section>
          <h2>Review Results</h2>
          <div className="review-grid">
            {reviews.map((review, idx) => (
              <div key={idx} className={getClassName(review.label)}>
                <p className="review-text"><b>{review.username}</b>: {review.text}</p>
                <p><span className="badge">{review.label}</span> | Score: {review.fake_score}</p>
              </div>
            ))}
          </div>
          {reviews.length === 0 && !loading && (
            <p style={{textAlign: "center", color: "#555", marginTop: "30px"}}>
              No reviews yet. Try searching or click on the demo button above.
            </p>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>
            🚀 Built for Hackathon 2025 | Restaurant Review MVP <br />
            Helping diners everywhere make smarter choices.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

