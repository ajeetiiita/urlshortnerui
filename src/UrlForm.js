import React, { useState, useEffect } from "react";
import axios from "axios";

const UrlForm = () => {
  const [inUrl, setInUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const handleInputChange = (e) => {
    setInUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      inUrl: inUrl,
    };

    axios
      .post("http://localhost:8080/createUrl", requestBody)
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
      .get("http://localhost:8080/getAllUrl")
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

      <table className="table table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th scope="col">Long URL</th>
            <th scope="col">Short URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.inputurl}</td>
              <td>{url.outputurl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlForm;
