import React, { useState, useEffect } from "react";
import axios from "axios";

const UrlStats = () => {
  const [urls, setUrls] = useState([]);
  const [shortUrlForStats, setshortUrlForStats] = useState("");

  const handleInputChangeShortUrlStats = (e) => {
    setshortUrlForStats(e.target.value);
  };

  const handleSubmitShortUrlStats = (e) => {
    e.preventDefault();

    const requestBody = {
      shortUrlForStats: shortUrlForStats,
    };

    axios
      .post("https://serene-reef-56605-09cfe434f5c0.herokuapp.com/stats", requestBody)
      .then((response) => {
        console.log(response.data);
        fetchUrls(); // Fetch updated URL list after creating a new URL
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUrls = () => {
    axios
      .get("https://serene-reef-56605-09cfe434f5c0.herokuapp.com/getAllUrl")
      .then((response) => {
        setUrls(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmitShortUrlStats} className="mt-4">
        <div className="form-group">
          <label htmlFor="shortUrlForStats">
            <h2>GetStats</h2>
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="shortUrlForStats"
            value={shortUrlForStats}
            placeholder="Enter Short Url for Stats"
            onChange={handleInputChangeShortUrlStats}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Get Stats
        </button>
      </form>

      <table className="table table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th scope="col">Short URL</th> 
            <th scope="col">Long URL</th> 
            <th scope="col">AccessCount</th>  
            <th scope="col">Last Accessed Time</th>                
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => {
            if (url.short_url === shortUrlForStats) { 
              return (
                <tr key={url.id}>
                  <td>{url.short_url}</td>
                  <td>{url.long_url}</td>
                  <td>{url.access_count}</td>
                  <td>{url.last_access_time}</td>
                </tr>
              );
            }
            return null; // Skip rendering if the URL doesn't match
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UrlStats;
