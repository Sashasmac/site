const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com',
});

const app = express();
app.use(bodyParser.json());

app.post('/addNews', (req, res) => {
  const newsText = req.body.text;
  if (!newsText) {
    return res.status(400).send('Message is required');
  }

  const db = admin.database();
  const newsRef = db.ref('news').push();
  newsRef.set({ text: newsText, timestamp: Date.now() })
    .then(() => res.status(200).send('News added successfully'))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
