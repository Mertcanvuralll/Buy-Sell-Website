const sqlite3 = require('sqlite3').verbose();

// Create or connect to the database
const db = new sqlite3.Database('./db/buy_sell.db');

// Create table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ad_no TEXT,
      description TEXT,
      price REAL,
      image TEXT,
      category TEXT,
      subcategory TEXT,
      city TEXT,
      brand TEXT,
      model TEXT,
      type TEXT,
      year INTEGER,
      km INTEGER,
      engine_capacity TEXT,
      real_estate_type TEXT,
      area INTEGER,
      room_count TEXT,
      building_age INTEGER,
      floor_location TEXT,
      total_floors INTEGER,
      zoning_status TEXT,  -- Zoning Status
      plot_number TEXT,    -- Plot No
      parcel_number TEXT,  -- Parcel No
      deed_status TEXT     -- Deed Status
  )`, (err) => {
    if (err) {
      console.error('An error occurred while creating the table.:', err);
    } else {
      console.log('The table was successfully verified or created.');
    }
  });
});

module.exports = db;

