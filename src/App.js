import React, { useState } from "react";
import "./App.css";

function App() {
  const [restaurant, setRestaurant] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch reviews from API
  const getReviews = async (presetName) => {
    const query = presetName || restaurant;
    if (!query) return alert("Enter a restaurant name");
    setLoading(true);

    try {
      const apiUrl = `https://your-api-gateway-url/restaurant?name=${encodeURIComponent(query)}`;
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

  // Assign class based on label
  const getClassName = (label) => {
    if (label === "Likely real") return "review real";
    if (label === "Suspicious") return "review suspicious";
    return "review fake";
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
          <p>
            Online reviews can be tricky — many are authentic, but some are written by bots or businesses trying to boost their ratings. Our tool uses AI and smart heuristics to flag reviews as <span className="highlight">Likely Real</span>, <span className="highlight">Suspicious</span>, or <span className="highlight">Fake</span>.
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
              <div className="step-icon">🔍</div>
              <h3>Search</h3>
              <p>Type in any restaurant’s name into the search bar above.</p>
            </div>
            <div className="step">
              <div className="step-icon">🤖</div>
              <h3>Analyze</h3>
              <p>Our system scans the reviews, looking for signs of duplicates, over-promotion, or unnatural patterns.</p>
            </div>
            <div className="step">
              <div className="step-icon">✅</div>
              <h3>Results</h3>
              <p>Reviews are flagged as <b>Likely Real</b>, <b>Suspicious</b>, or <b>Fake</b> so you can judge with confidence.</p>
            </div>
          </div>
        </section>

        {/* Example Review Section */}
        <section className="example-reviews">
          <h2>Example Review Results</h2>
          <div className="example-list">
            <div className="example-review real">
              <p className="review-text"><span className="avatar">👤</span><b>JohnD</b>: Loved the food and service!</p>
              <span className="badge">Likely Real</span>
              <div className="reason">
                <ul>
                  <li>Detailed and consistent review with verified photos.</li>
                  <li>Mentions specific dishes and experience.</li>
                </ul>
              </div>
              <div className="score-bar"><div className="score-fill" style={{width: "95%", backgroundColor: "#27ae60"}}></div></div>
            </div>

            <div className="example-review suspicious">
              <p className="review-text"><span className="avatar">👤</span><b>SaraM</b>: Great place!</p>
              <span className="badge">Suspicious</span>
              <div className="reason">
                <ul>
                  <li>Generic comment with repeated phrases seen in multiple reviews.</li>
                  <li>Posted within a short timeframe, raising suspicion.</li>
                </ul>
              </div>
              <div className="score-bar"><div className="score-fill" style={{width: "65%", backgroundColor: "#f39c12"}}></div></div>
            </div>

            <div className="example-review fake">
              <p className="review-text"><span className="avatar">👤</span><b>Bot123</b>: Amazing! Must try!</p>
              <span className="badge">Fake</span>
              <div className="reason">
                <ul>
                  <li>Likely generated, overly promotional content.</li>
                  <li>Posted multiple times across similar restaurants in short time.</li>
                </ul>
              </div>
              <div className="score-bar"><div className="score-fill" style={{width: "25%", backgroundColor: "#e74c3c"}}></div></div>
            </div>
          </div>
        </section>

        {/* Actual Review Results Section */}
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
