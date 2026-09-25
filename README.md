# gym-class-booker

A Node.js automation tool for managing and scheduling gym class reservations through a REST API.

The application retrieves the classes available for the following week, filters them according to a predefined personal schedule, prepares the required reservation data, and automatically submits the reservation requests when the booking period opens.

The process is designed to run automatically using **Windows Task Scheduler**, allowing the application to wake the computer from sleep and execute the reservation workflow at the scheduled time.

## Technologies

* **Node.js**
* **JavaScript (ES Modules)**
* **Axios** — HTTP client for REST API requests
* **dotenv** — environment variable management
* **Node.js File System (`fs`)** — file and log management
* **REST API**
* **JSON**
* **Windows Task Scheduler**

## Features

### Authentication

Implements a two-step authentication flow using credentials stored in environment variables. Authentication tokens are managed through a centralized Axios client.

### Weekly class retrieval

Retrieves the classes available for the following week through the REST API.

The application dynamically obtains the required center information during authentication rather than relying on a hardcoded center identifier.

### Class filtering

Filters the available classes according to a predefined weekly schedule, using criteria such as:

* Day of the week
* Start time
* Activity
* Area

### Reservation preparation

Retrieves additional information for the selected classes and prepares the data required to submit the reservation request.

The prepared reservation information is stored locally in a JSON file so that it can be processed later by the reservation task.

### Scheduled reservations

The reservation process waits until the booking window provided by the API opens before submitting the request.

This avoids relying on a fixed delay and instead uses the booking time returned by the service.

### Reservation state management

Reservations are tracked using a simple state:

* `pending`
* `reserved`

This allows the reservation process to identify which class still needs to be processed.

### Logging

Application activity is written both to the console and to local log files.

Separate logs are used for the weekly preparation process and the reservation process.

### Windows Task Scheduler integration

The application is designed to work together with Windows Task Scheduler.

Different tasks can be configured for the weekly preparation and reservation processes, allowing the system to run automatically without requiring a long-running Node.js process.

## Project structure

```text
gym-class-booker/
│
├── src/
│   ├── api.js
│   ├── auth.js
│   ├── book-my-class.js
│   ├── filter-my-weekly-classes.js
│   ├── get-class-details.js
│   ├── get-class-info-for-request.js
│   ├── get-next-week-dates.js
│   ├── get-weekly-classes-info.js
│   ├── index.js
│   ├── logger.js
│   ├── login.js
│   ├── manage-reservation.js
│   ├── paths.js
│   └── wait-until.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Module overview

| Module                          | Description                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `api.js`                        | Creates and configures the Axios API client and manages the authentication token. |
| `auth.js`                       | Handles the authentication requests.                                              |
| `login.js`                      | Coordinates authentication and returns the required user and center information.  |
| `get-next-week-dates.js`        | Calculates the date range for the following week.                                 |
| `get-weekly-classes-info.js`    | Retrieves the classes available within the selected date range.                   |
| `filter-my-weekly-classes.js`   | Selects the classes matching the configured weekly schedule.                      |
| `get-class-details.js`          | Retrieves detailed information about a specific class.                            |
| `get-class-info-for-request.js` | Builds the data required for future reservation requests.                         |
| `book-my-class.js`              | Sends the reservation request for a selected class.                               |
| `manage-reservation.js`         | Coordinates the reservation process and updates the reservation state.            |
| `wait-until.js`                 | Waits until the booking window opens.                                             |
| `logger.js`                     | Handles console and file logging.                                                 |
| `paths.js`                      | Centralizes project file and directory paths.                                     |
| `index.js`                      | Main entry point for the weekly preparation process.                              |

## Workflow

The application is divided into two main processes.

### 1. Weekly preparation

```text
Authenticate
     ↓
Calculate next week's dates
     ↓
Retrieve available classes
     ↓
Filter configured classes
     ↓
Retrieve class details
     ↓
Generate reservation data
```

### 2. Reservation execution

```text
Read pending reservations
     ↓
Find the next pending reservation
     ↓
Wait until the booking window opens
     ↓
Authenticate
     ↓
Submit reservation request
     ↓
Update reservation state
```

## Disclaimer

This project was developed as a personal automation project for interacting with a service through its existing REST API.

It is intended for personal use and educational purposes. No credentials, authentication tokens, or personal account data are included in this repository.
