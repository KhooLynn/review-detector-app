import React, { useState } from "react";
import "./App.css";

function App() {
  const [restaurant, setRestaurant] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getReviews = async (presetName) => {
    const query = presetName || restaurant;
    if (!query) return alert("Enter a movie name");
    setLoading(true);

    try {
      const apiUrl = `https://your-api-gateway-url/restaurant?name=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setReviews(data.reviews || []);
      setRestaurant(query);
    } catch (err) {
      alert("Error fetching reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getClassName = (label) => {
    if (label === "Likely real") return "review real";
    if (label === "Suspicious") return "review suspicious";
    return "review fake";
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <header className="hero">
        <h1>🍽️ Restaurant Review Checker</h1>
        <p className="tagline">
          Discover which reviews are <b>real</b> and which might be{" "}
          <b>fake or promotional</b>.
        </p>
        <p>
          Online reviews can be tricky — many are authentic, but some are
          written by bots or businesses trying to boost their ratings. Our tool
          uses AI and smart heuristics to flag reviews as{" "}
          <span className="highlight">Likely Real</span>,{" "}
          <span className="highlight">Suspicious</span>, or{" "}
          <span className="highlight">Fake</span>.
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

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How it Works</h2>
        <div className="steps">
          <div className="step">
            <h3>🔍 1. Search</h3>
            <p>Type in any restaurant’s name into the search bar above.</p>
          </div>
          <div className="step">
            <h3>🤖 2. Analyze</h3>
            <p>
              Our system scans the reviews, looking for signs of duplicates,
              over-promotion, or unnatural patterns.
            </p>
          </div>
          <div className="step">
            <h3>✅ 3. Results</h3>
            <p>
              Reviews are flagged as <b>Likely Real</b>, <b>Suspicious</b>, or{" "}
              <b>Fake</b> so you can judge with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <h2>Review Results</h2>
        {reviews.length === 0 && !loading && (
          <p style={{ textAlign: "center", color: "#555" }}>
            No reviews yet. Try searching or click on the demo button above.
          </p>
        )}
        {reviews.map((review, idx) => (
          <div key={idx} className={getClassName(review.label)}>
            <p className="review-text">
              <b>{review.username}</b>: {review.text}
            </p>
            <p>
              <span className="badge">{review.label}</span> | Score:{" "}
              {review.fake_score}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer>
        <p>
          🚀 Built for Hackathon 2025 | Restaurant Review MVP <br />
          Helping diners everywhere make smarter choices.
        </p>
      </footer>
    </div>
  );
}

export default App;
