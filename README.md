# Buy-Sell Website

## Project Overview
The **Buy-Sell Website** is a full-stack web application designed to simulate an online marketplace. It enables users to view listings, filter by categories or subcategories, and search for products based on various parameters. The project employs **Node.js** for the backend, **EJS** for templating, **SQLite3** for the database, and is deployed on **Render** for cloud hosting.

## Deployment
This project is live and accessible at [Buy-Sell Website](#).

---

## Features

- **Dynamic Listings:** Users can browse listings dynamically loaded from the database.
- **Categorization:** Products are grouped into categories and subcategories such as "Real Estate" and "Vehicles."
- **Search Functionality:** Users can search by keywords, categories, or specific parameters such as product ID.
- **Detailed View:** Each product has a detailed page displaying all relevant information.

---

## Data Model

The project uses a SQLite3 database with a single `products` table structured as follows:

| Column Name         | Data Type | Description                                      |
|---------------------|-----------|--------------------------------------------------|
| `id`                | INTEGER   | Primary key, auto-incremented                   |
| `ad_no`             | TEXT      | Unique advertisement number                     |
| `description`       | TEXT      | Product description                             |
| `price`             | REAL      | Product price                                   |
| `image`             | TEXT      | URL of the product image                        |
| `category`          | TEXT      | Main category of the product                    |
| `subcategory`       | TEXT      | Subcategory of the product                      |
| `city`              | TEXT      | Location of the product                         |
| `brand`             | TEXT      | Brand name (for vehicles)                       |
| `model`             | TEXT      | Model name (for vehicles)                       |
| `type`              | TEXT      | Type or style of the product                    |
| `year`              | INTEGER   | Manufacturing year (for vehicles)               |
| `km`                | INTEGER   | Kilometers driven (for vehicles)                |
| `engine_capacity`   | TEXT      | Engine capacity (for vehicles)                  |
| `real_estate_type`  | TEXT      | Type of real estate (for properties)            |
| `area`              | INTEGER   | Area in square meters                           |
| `room_count`        | TEXT      | Room count (for properties)                     |
| `building_age`      | INTEGER   | Building age in years                           |
| `floor_location`    | TEXT      | Floor location of the property                  |
| `total_floors`      | INTEGER   | Total floors in the building                    |
| `zoning_status`     | TEXT      | Zoning status (for land)                        |
| `plot_number`       | TEXT      | Plot number (for land)                          |
| `parcel_number`     | TEXT      | Parcel number (for land)                        |
| `deed_status`       | TEXT      | Deed status (for land)                          |

---

## Assumptions

- **Search Case-Insensitivity:** All searches are performed in a case-insensitive manner.
- **Dynamic Filtering:** Listings are dynamically fetched from the database based on user input or selection.
- **Default Fallbacks:** If certain fields are missing, default values like "Not Specified" are displayed.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or above)
- **SQLite3**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mertcanvuralll/Buy-Sell-Website.git
   cd Buy-Sell-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the database:
   ```bash
   node db/database.js
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the application at http://localhost:4000

---

## Deployment

The application is deployed on **Render** and accessible via https://buy-sell-website.onrender.com/

### Deployment Notes

- Ensure all dependencies are correctly specified in `package.json`.
- SQLite3 binaries may need to be rebuilt for compatibility with Render's environment:
  ```bash
  npm rebuild sqlite3 --build-from-source
  ```

---

## Issues and Improvements

- **Real-Time Updates:** Adding WebSocket support for real-time listing updates.
- **User Authentication:** Integrating user login and profile management.
- **Performance Optimization:** Implementing caching mechanisms for frequently accessed data.
