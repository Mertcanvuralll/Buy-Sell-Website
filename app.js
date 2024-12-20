const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Homepage
app.get('/', (req, res) => {
  const categoryCounts = {};
  const subcategoryCounts = {};

  // Fetch category and subcategory counts from the database
  db.all(
    'SELECT category, subcategory, COUNT(*) as count FROM products GROUP BY category, subcategory',
    (err, rows) => {
      if (err) return res.status(500).send('Database Error');

      rows.forEach(row => {
        categoryCounts[row.category] = (categoryCounts[row.category] || 0) + row.count;
        subcategoryCounts[row.subcategory] = row.count;
      });

      // Fetch products for the homepage
      db.all('SELECT DISTINCT * FROM products LIMIT 10', (err, products) => {
        if (err) return res.status(500).send('Database Error');
        res.render('home', { products, categoryCounts, subcategoryCounts });
      });
    }
  );
});

// Listing by Category
app.get('/category/:category', (req, res) => {
  const category = req.params.category;

  const categoryCounts = {};
  const subcategoryCounts = {};

  db.all(
    'SELECT category, COUNT(*) as count FROM products GROUP BY category',
    (err, categories) => {
      if (err) return res.status(500).send('Database Error');

      categories.forEach(row => {
        categoryCounts[row.category] = row.count;
      });

      db.all(
        'SELECT subcategory, COUNT(*) as count FROM products GROUP BY subcategory',
        (err, subcategories) => {
          if (err) return res.status(500).send('Database Error');

          subcategories.forEach(row => {
            subcategoryCounts[row.subcategory] = row.count;
          });

          db.all(
            'SELECT * FROM products WHERE category = ?',
            [category],
            (err, products) => {
              if (err) return res.status(500).send('Database Error');

              res.render('search', {
                products,
                query: category,
                categoryCounts,
                subcategoryCounts,
              });
            }
          );
        }
      );
    }
  );
});

// Listing by Subcategory
app.get('/subcategory/:subcategory', (req, res) => {
  const subcategory = req.params.subcategory;

  const categoryCounts = {};
  const subcategoryCounts = {};

  db.all(
    'SELECT category, COUNT(*) as count FROM products GROUP BY category',
    (err, categories) => {
      if (err) return res.status(500).send('Database Error');

      categories.forEach(row => {
        categoryCounts[row.category] = row.count;
      });

      db.all(
        'SELECT subcategory, COUNT(*) as count FROM products GROUP BY subcategory',
        (err, subcategories) => {
          if (err) return res.status(500).send('Database Error');

          subcategories.forEach(row => {
            subcategoryCounts[row.subcategory] = row.count;
          });

          db.all(
            'SELECT * FROM products WHERE subcategory = ?',
            [subcategory],
            (err, products) => {
              if (err) return res.status(500).send('Database Error');

              res.render('search', {
                products,
                query: subcategory,
                categoryCounts,
                subcategoryCounts,
              });
            }
          );
        }
      );
    }
  );
});

// Search functionality
app.get('/search', (req, res) => {
  const query = req.query.q || '';

  const normalizedQuery = query.toLowerCase(); // Normalize user input to lowercase

  db.all(
    'SELECT category, COUNT(*) as count FROM products GROUP BY category',
    (err, categories) => {
      if (err) {
        console.error('Category query error:', err);
        return res.status(500).send('Database Error');
      }

      const categoryCounts = {};
      categories.forEach(row => {
        categoryCounts[row.category] = row.count;
      });

      db.all(
        'SELECT subcategory, COUNT(*) as count FROM products GROUP BY subcategory',
        (err, subcategories) => {
          if (err) {
            console.error('Subcategory query error:', err);
            return res.status(500).send('Database Error');
          }
      
          const subcategoryCounts = {};
          subcategories.forEach(row => {
            subcategoryCounts[row.subcategory] = row.count;
          });
      
          // Normalize the query to address case-insensitivity
          const normalizedQuery = query.toLowerCase();
      
          // Use LOWER function in SQL for matching
          db.all(
            `SELECT DISTINCT * FROM products WHERE 
              LOWER(ad_no) LIKE ? OR 
              LOWER(brand) LIKE ? OR 
              LOWER(model) LIKE ? OR 
              LOWER(type) LIKE ? OR 
              LOWER(description) LIKE ? OR 
              LOWER(category) LIKE ? OR 
              LOWER(subcategory) LIKE ?`,
            [
              `%${normalizedQuery}%`, `%${normalizedQuery}%`, `%${normalizedQuery}%`, 
              `%${normalizedQuery}%`, `%${normalizedQuery}%`, `%${normalizedQuery}%`, 
              `%${normalizedQuery}%`
            ],
            (err, products) => {
              if (err) {
                console.error('Search results error:', err);
                return res.status(500).send('Database Error');
              }
      
              res.render('search', {
                products,
                query,
                categoryCounts,
                subcategoryCounts,
              });
            }
          );
        }
      );      
    }
  );
});

// Detail Page
app.get('/detail/:id', (req, res) => {
  const productId = req.params.id;

  db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
    if (err) return res.status(500).send('Database Error');
    if (!product) return res.status(404).send('Product Not Found');

    let additionalFields = {};
    if (product.category === 'Emlak' && product.subcategory === 'Konut') {
      additionalFields = {
        realEstateType: product.real_estate_type || 'Not Specified',
        area: product.area || 'Not Specified',
        roomCount: product.room_count || 'Not Specified',
        buildingAge: product.building_age || 'Not Specified',
        floorLocation: product.floor_location || 'Not Specified',
        totalFloors: product.total_floors || 'Not Specified',
      };
    } else if (product.category === 'Emlak' && product.subcategory === 'İş Yeri') {
      additionalFields = {
        realEstateType: product.real_estate_type || 'Not Specified',
        area: product.area || 'Not Specified',
        roomCount: product.room_count || 'Not Specified',
        buildingAge: product.building_age || 'Not Specified',
        floorLocation: product.floor_location || 'Not Specified',
        totalFloors: product.total_floors || 'Not Specified',
      };
    } else if (product.category === 'Emlak' && product.subcategory === 'Arsa') {
      additionalFields = {
        realEstateType: product.real_estate_type || 'Not Specified',
        area: product.area || 'Not Specified',
        zoningStatus: product.imar_durumu || 'Not Specified',
        plotNumber: product.ada_no || 'Not Specified',
        parcelNumber: product.parsel_no || 'Not Specified',
        deedStatus: product.tapu_durumu || 'Not Specified',
      };
    } else if (product.category === 'Vasıta') {
      additionalFields = {
        brand: product.brand || 'Not Specified',
        model: product.model || 'Not Specified',
        type: product.type || 'Not Specified',
        year: product.year || 'Not Specified',
        km: product.km || 'Not Specified',
        engineCapacity: product.engine_capacity || 'Not Specified',
      };
    }

    res.render('detail', { product, additionalFields });
  });
});

// Category Summary (Overview Page)
app.get('/overview', (req, res) => {
  db.all(
    `SELECT category, subcategory, COUNT(*) as count FROM products GROUP BY category, subcategory`,
    (err, categories) => {
      if (err) return res.status(500).send('Database Error');
      res.render('overview', { categories });
    }
  );
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
