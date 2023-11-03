const express = require("express");
const { db, Sequelize } = require('./connection');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));


// const test = async () =>{
//     try {
//         db.authenticate()
//         console.log('Sahi hai!')
//     } catch (error) {
//         console.error(error)
//     }
// }

// test();

app.post('/searchtrains', async (req, res) => {
    const { trainnumber } = req.body;
  console.log(trainnumber);
    try {
      // Use your Sequelize instance 'db' to perform the query.
      const results = await db.query(
        'SELECT * FROM TRAIN WHERE TR_NO = :trainnumber',
        {
          replacements: { trainnumber },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
  
      // Send the results to the client (frontend).
      res.json(results);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response to the client.
      res.status(500).json({ error: 'An error occurred while searching for trains.' });
    }
  });

  app.post('/ViewTrains', async (req, res) => {
    try {
      // Use your Sequelize instance 'db' to query all train details.
      const allTrains = await db.query('SELECT * FROM TRAIN', {
        type: Sequelize.QueryTypes.SELECT,
      });
  
      // Send the train details to the client.
      res.json(allTrains);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving train details.' });
    }
  });
  
  app.post('/TrainBwStn', async (req, res) => {
    const { fromstation, tostation } = req.body;
  
    try {
      // Use your Sequelize instance 'db' to query the database for trains between the specified stations.
      const query = 'SELECT * FROM TRAIN WHERE FROM_STN = :fromstation AND TO_STN = :tostation';
      const trains = await db.query(query, {
        replacements: { fromstation, tostation },
        type: Sequelize.QueryTypes.SELECT,
      });
  
      res.json(trains);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for trains between stations.' });
    }
  });
  
  
  app.post('/admincancletrain', async (req, res) => {
    const {trainno} = req.body;
    try {
      // Use your Sequelize instance 'db' to query the database for trains between the specified stations.
      const query = 'DELETE FROM TRAIN WHERE TR_NO = :trainno';
      const trains = await db.query(query, {
        replacements: { trainno },
        type: Sequelize.QueryTypes.DELETE,
      });

      res.send(`Train with train number ${trainno} is deleted`);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for trains between stations.' });
    }
  })

  app.post('/adminaddtrain', async (req, res) => {
    const {trainno, trainname, fromstation, tostation, available, fare} = req.body;
    try {
      // Use your Sequelize instance 'db' to query the database for trains between the specified stations.
      const query = 'INSERT INTO TRAIN VALUES (:trainno, :trainname, :fromstation, :tostation, :available, :fare)';
      const trains = await db.query(query, {
        replacements: { trainno, trainname, fromstation, tostation, available, fare },
        type: Sequelize.QueryTypes.INSERT,
      });

      res.send(`Train with train number ${trainno} is added`);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for trains between stations.' });
    }
  })

app.listen(port, () => console.log(`Started on port ${port}`));
  
app.post('/showCustomers', async (req, res) => {
  try {
    // Use your Sequelize instance 'db' to query all train details.
    const customers = await db.query('SELECT * FROM CUSTOMER', {
      type: Sequelize.QueryTypes.SELECT,
    });

    // Send the train details to the client.
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the customers details' });
  }
});

app.post('/Availabiilty', async (req, res) => {
  const { trainnumber } = req.body;
console.log(trainnumber);
  try {
    // Use your Sequelize instance 'db' to perform the query.
    const results = await db.query(
      'SELECT * FROM TRAIN WHERE TR_NO = :trainnumber',
      {
        replacements: { trainnumber },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Send the results to the client (frontend).
    res.json(results);
  } catch (error) {
    console.error(error);
    // Handle errors and send an appropriate response to the client.
    res.status(500).json({ error: 'An error occurred while searching for trains.' });
  }
});

app.post('/fareEnquiry', async (req, res) => {
  const { fromstation, tostation } = req.body;

  try {
    // Use your Sequelize instance 'db' to query the database for trains between the specified stations.
    const query = 'SELECT * FROM TRAIN WHERE FROM_STN = :fromstation AND TO_STN = :tostation';
    const details = await db.query(query, {
      replacements: { fromstation, tostation },
      type: Sequelize.QueryTypes.SELECT,
    });

    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for trains between stations.' });
  }
});

