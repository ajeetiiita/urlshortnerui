# Project Name

URL Shortener Application

## Description

In today’s digital world, where long URLs can be cumbersome and difficult to share, URL shorteners have become a popular solution. This project aims to build a URL shortener application using Spring Boot, React, and PostgreSQL.

URL shorteners are web applications that take long URLs as input and generate shorter, more compact URLs as output. These shortened URLs redirect users to the original long URLs when accessed. They are commonly used in various scenarios, such as social media sharing, email marketing campaigns, and tracking link clicks.

This project consists of a full-stack application with a frontend developed in React and a backend developed in Spring Boot. The frontend allows users to enter a long URL and create a corresponding short URL. The backend handles the URL creation and retrieval operations, storing the data in a PostgreSQL database.

## Installation

1. Clone the repository: `git clone https://github.com/bhanujoshi24/url-app.git`
2. Navigate to the project directory: `cd url-app`
3. Install frontend dependencies: `cd frontend && npm install`
4. Install backend dependencies: `cd ../backend && mvn install`

## Usage

1. Start the backend server: `cd backend && mvn spring-boot:run`
2. Start the frontend development server: `cd frontend && npm start`
3. Open your browser and navigate to: `http://localhost:3000`

## Technologies Used

- Frontend: React, Axios
- Backend: Spring Boot, Spring Data JPA, PostgreSQL

## Components

### UrlForm

The `UrlForm` component allows users to enter a long URL and create a short URL.

#### Usage

1. Enter the long URL in the input field.
2. Click on the "Create Short URL" button.
3. The new URL will be created and added to the list.

#### Props

None

#### State

- `inUrl` (string): Holds the value of the input field.
- `urls` (array): Stores the list of URLs fetched from the server.

#### Methods

- `handleInputChange`: Updates the `inUrl` state based on the input field value.
- `handleSubmit`: Handles the form submission, sends a POST request to create a new URL, and fetches the updated URL list.
- `fetchUrls`: Fetches the list of URLs from the server and updates the `urls` state.
- `useEffect`: Calls `fetchUrls` once when the component is mounted.
