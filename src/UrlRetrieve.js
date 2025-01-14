import React, { useState, useEffect } from "react";
import axios from "axios";

const UrlRetrieve= () => {
  const [urls, setUrls] = useState([]);
  const [shortUrl, setShortUrl] = useState("");

  const handleInputChangeShortUrl = (e) => {
    setShortUrl(e.target.value);
  };

 
  const handleSubmitShortUrl = (e) => {
    e.preventDefault();

    const requestBody = {
      shortUrl: shortUrl,
    };
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const endpoint = "/originalUrl";  
    const fullOriginalUrl = baseUrl + endpoint;
    
    axios
      .post(fullOriginalUrl, requestBody)
      .then((response) => {
        console.log(response.data);
        fetchUrls(); // Fetch updated URL list after creating a new URL
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const endpointallurl = "/getAllUrl";
  const fullOriginalAllUrl = baseUrl + endpointallurl;
  const fetchUrls = () => {
    axios
      .get(fullOriginalAllUrl)
      .then((response) => {
        setUrls(response.data); 
        response.data.forEach((url) => {
          if (url.short_url === shortUrl) {
            window.location.href = url.long_url;
          }
        });
      })
      .catch((error) => {
        console.error(error);
      })
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmitShortUrl} className="mt-4">
        <div className="form-group">
          <label htmlFor="shortUrl">
            <h2>Convert to Original Url</h2>
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="shortUrl"
            value={shortUrl}
            placeholder="Enter Short Url"
            onChange={handleInputChangeShortUrl}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Get Original Url
        </button>
      </form>

      <table className="table table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th scope="col">Long URL</th>    
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => {
            if (url.short_url === shortUrl) { 
              return (
                <tr key={url.id}>
                  <td>{url.long_url}</td>
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
export default UrlRetrieve;
