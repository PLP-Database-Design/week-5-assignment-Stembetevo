const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors')

app.use(express.json());
app.use(cors());
dotenv.config();


//CONNECTING THE DATABASE
const hospital_db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//CHECKING IF THE CONNECTION IS SUCCESSFUL
hospital_db.connect((err) => {
    if(err) return console.log("Error connecting the database!!")

    console.log("Connected to mySql as id: ", hospital_db.threadId);
    
}); 


//Question 1 

    app.set('view engine','ejs');
    app.set('views',__dirname + '/views');

    app.get('/patient', (req,res) => {

        // Retrieve data from database 
        hospital_db.query('SELECT * FROM patients', (err, results) =>{
            if (err){
                console.error(err);
                res.status(500).send('Error Retrieving data')
            }else {
                //Display the records to the browser 
                res.render('patient', {results: results});
            }
        });
    });
 
//QUESTION 2

app.set('view engine','ejs');
app.set('views',__dirname + '/views');

app.get('/provider', (req,res) => {

    // Retrieve data from database 
    hospital_db.query('SELECT * FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('provider', {results: results});
        }
    });
});

//QUESTION 3

app.set('view engine','ejs');
app.set('views', __dirname + '/views');

app.get('/firstname',(req,res) => {
    hospital_db.query('SELECT * FROM patients',(err,results) => {
        if(err){
            console.error(err);
            res.status(500).send("Error fetching the data!!");
        }else{
            res.render('firstname',{results:results})
        }
    })
})


//QUESTION 4

app.set('view engine','ejs');
app.set('views',__dirname + '/views');

app.get('/specialty',(req,res) => {
    hospital_db.query('SELECT first_name,provider_specialty FROM providers',(err,results) => {
        if(err){
            console.error(err);
            res.status(500).send("Error fetching data!!");
        }else{
            res.render('specialty',{results:results});
        }
    })
})



app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)

    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Successfully!');
    });

});
