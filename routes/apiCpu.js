const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', async function (req, res, next) {
 
  try {
    const response = await fetch('https://g10-project-strapi.herokuapp.com/cpus');
    const data = await response.json();
    // const [rows] = await db.query('SELECT * FROM books ORDER BY id desc');
    // data = rows;
    // res.json(data);
    
   res.render('crud_cpu/index', { data });
  } catch (err) {
    console.log('Errors on getting books!');
    res.render('crud_cpu/index', { data: '' });
  }
});

router.get('/add', async function (req, res, next) {
  //   res.send('display add book page')
  res.render('crud_cpu/add', {
    name: '',
         core: '',
         socket_id: '',
         image_url: '',
         GHz: '',
  });
});

router.post('/add', async function (req, res, next) {
  // res.send('Add a new book.');
  const name = req.body.name;
     const core = req.body.core;
     const socket_id = req.body.socket_id;
     const image_url = req.body.image_url;
     const GHz = req.body.GHz;
 

  const form_data = {
    name,
    core,
    socket_id, 
    image_url, 
    GHz,
  };

  try {
    // await db.query('INSERT INTO books SET ?', form_data);
    const response = await fetch('https://g10-project-strapi.herokuapp.com/cpus', {
      method: 'post',
      body: JSON.stringify(form_data), 
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    res.redirect('/crud_cpu');
  } catch (err) {
    console.log(err);
    res.render('crud_cpu/add', {
      name: form_data.name,
      core: form_data.core,
      socket_id: form_data.socket_id,
      image_url: form_data.image_url,
      GHz: form_data.GHz
    });
  }
});

// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  // res.send('display edit book page');
  const id = req.params.id;
  try {
    // const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    const response = await fetch(`https://g10-project-strapi.herokuapp.com/cpus/${id}`);
    const data = await response.json();
    res.render('crud_cpu/edit', {
      id: data.id,
      name: data.name,
      core: data.core,
      socket_id: data.socket_id,
      image_url: data.image_url,
     GHz: data.GHz
    });
  } catch (err) {
    console.log(err);
  }
});

// update book data
router.post('/update', async function (req, res, next) {
  // res.send('update book data');
  const id = req.body.id;
  const name = req.body.name;
  const core = req.body.core;
  const socket_id = req.body.socket_id;
  const image_url = req.body.image_url;
  const GHz = req.body.GHz;
  //console.log(name, clock_rate, size, image_url, ram_ID,id);

  const form_data = {
    name,
    core,
    socket_id, 
    image_url, 
    GHz,
  };
  try {
    const response = await fetch(`https://g10-project-strapi.herokuapp.com/cpus/${id}`, {
      method: 'put',
      body: JSON.stringify(form_data), 
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    // await db.query('UPDATE books SET name = ?, author = ? WHERE id = ?', [
    //   name,
    //   author,
    //   id,
    // ]);
    // res.status(200).json({ message: 'Updating successful' });
    res.redirect('/crud_cpu');
  } catch (err) {
    console.log(err);
  }
});

// delete book
router.get('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    // await db.query('DELETE FROM books WHERE id = ?', [id]);
    const response = await fetch(`https://g10-project-strapi.herokuapp.com/cpus/${id}`, {
      method: 'delete',
    });
    const data = await response.json();
    res.redirect('/crud_cpu');
  } catch (err) {
    console.log(err);
  }
 
});


module.exports = router;