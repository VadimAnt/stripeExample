const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('./stripe');
const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/createCustomer', async (req, res) => {
  const customer = await stripe.customers.create({
    email: 'test@gmail.com',
    source: 'tok_visa' // token customer card
  });
  res.send({
    customer,
  })
});

app.get('/customerList', async (req, res) => {
  const customers = await stripe.customers.list();
  res.send(customers);
});

app.get('/createCardToken', async (req, res) => {
  const cardToken = await stripe.tokens.create({
    card: {
      "number": "4242424242424242",
      "exp_month": 12,
      "exp_year": 2019,
      "cvc": '123',
    }
  });

  res.send({
    data: cardToken,
  })
})

// Pay
app.post('/charge', async (req, res) => {
  const token = 'tok_visa'; // token customer card
  const chargeAmount = 30 * 100; // $30
  const charge = await stripe.charges.create({
    amount: chargeAmount,
    currency: 'usd',
    source: token,
  });

  res.send({
    data: charge,
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});