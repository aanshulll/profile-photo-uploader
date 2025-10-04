const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });



app.get('/', (req, res) => {
  res.render('index', { photo: null });
});

app.post('/upload', upload.single("profileImage"), (req, res) => {
  const pic = `/uploads/${req.file.filename}`;
  res.render("index", { photo: pic });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
