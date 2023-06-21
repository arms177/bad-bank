const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017';
let db = null;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err,client) {
  console.log('connected to DB');
  const dbName = 'badbank';
  db = client.db(dbName);
});

//create user
function create(name,email,password) {
  return new Promise((resolve,reject) => {
    const collection = db.collection('users');
    const doc = {name, email, password, balance: 0};
    collection.insertOne(doc, {w:1}, function (err,result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

//login user
function login(email,password) {
  return new Promise((resolve,reject) => {
    const collection = db.collection('users')
    .findOne({email: email})
      .then((doc) => {
        console.log(doc);
        if (doc) {
          if (doc.password === password) {
            resolve({
              status: 'success',
              message:'User is logged in',
              data: {name: doc.name, balance: doc.balance, email: doc.email}
            });
          } else {
            resolve({status: 'error', message: 'Password is incorrect, please try again.'});
          }
        } else {
          resolve({status: 'error', message: 'User does not exist, please try again.'});
        }

      })
      .catch((err) => {
        console.log('error: ' + err)
        reject(err);
      });

  });
}
//all users
function all() {
  return new Promise((resolve,reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray((err,docs) => {
        err ? reject(err) : resolve(docs);
      });
  });
}
//update deposit or withdrawal
function update(email, amount){
  return new Promise((resolve, reject) => {
    console.log('amount sending....arms');
    console.log(amount);
    const customers = db
      .collection('users')
      .findOneAndUpdate(
        {email: email},
        { $inc: { balance: amount}},
        { returnOriginal: false },
        function (err, documents) {
          console.log('deposit results:');
          console.log(documents);
          err ? reject(err) : resolve({balance: documents.value.balance});
        }
      );
  });
}

module.exports = {create, login, all, update};
