import React, { useState, useEffect } from "react";
import axios from "axios";

const UrlForm = () => {
  const [inUrl, setInUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [invalidUrl, setInvalidUrl] = useState('');
  const [alreadyPresent, setAlreadyPresent] = useState('');
  const handleInputChange = (e) => {
    setInUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      inUrl: inUrl,
    };

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const endpoint = "/createUrl";
    const fullOriginalUrl = baseUrl + endpoint;
    axios
      .post(fullOriginalUrl, requestBody)
      .then((response) => {
        console.log(response.data);
        if (response.data.includes("invalid")) {
          setInvalidUrl(response.data);
        }
        else if (response.data.includes("already")) {
          setAlreadyPresent(response.data);
        }
        else {
          fetchUrls();
        }// Fetch updated URL list after creating a new URL
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
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="inUrl">
            <h2>Enter Long Url</h2>
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="inUrl"
            value={inUrl}
            placeholder="Enter Long Url"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Short URL
        </button>
      </form>
      {/* Conditional rendering based on 'invalidUrl' */}
      {invalidUrl && <p>{invalidUrl}</p>}

      {/* Conditional rendering based on 'alreadyPresent' */}
      {alreadyPresent && <p>{alreadyPresent}</p>}

      {/* Render table only if neither 'invalidUrl' nor 'alreadyPresent' */}
      {!invalidUrl && !alreadyPresent && (
        <table className="table table-striped table-bordered mt-4">
          <thead>
            <tr>
              <th scope="col">Short URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => {
              if (url.long_url === inUrl) {
                return (
                  <tr key={url.id}>
                    <td>{url.short_url}</td>
                  </tr>
                );
              }
              return null; // Skip rendering if the URL doesn't match
            })}
          </tbody>
        </table>
      )}
    </div>)
}

export default UrlForm;
