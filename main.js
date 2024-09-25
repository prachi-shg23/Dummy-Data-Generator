const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Employee = require('./models/employee')

mongoose.connect('mongodb://127.0.0.1:27017/company');

app.set('view engine', 'ejs');

const getRandom = (arr) => {
  let rno = Math.floor(Math.random() * (arr.length - 1))
  return arr[rno]
}

app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.render('index', { foo: 'FOO' });
})

app.get('/generate', async (req, res) => {
  // clear the collection Employee
  await Employee.deleteMany({});

  //Generate random data

  let randomName = ["Rekha", "Hema", "Abhi", "Saru", "Prachi"];
  let randomCities = ["Amravti", "Yavatmal", "Nagpur", "Pune", "Nashik"];
  let randomLang = ["C#", "Java", "JS", "C++"];

  for (let index = 0; index < 10; index++) {
    let e = await Employee.create({
      name: getRandom(randomName),
      salary: Math.floor(Math.random() * 22000),
      language: getRandom(randomLang),
      city: getRandom(randomCities),
      isManager: Math.random() > 0.5 ? true : false
    })
    console.log(e)

  }
  res.render('index', { foo: 'FOO' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})