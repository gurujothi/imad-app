var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'gurumoorthy1994',
    database: 'gurumoorthy1994',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge:1000*60*60*24*30}
}));

var articles=   {
     'article-two':{
            title: 'Article 1 - Guru',
            heading: 'MY FIRST ARTICLE ABOUT ME',
            date:'Jan 16, 2015',
            content:`<p>     Hi! Welcome to my First Article. I am Gurumoorthy. Completed B.E. </p>
                <p>Greetings from NovelVista learning Solutions! Thanks for showing interest in NovelVista Learning Solutions!!
    It was nice to talk to you today. Please find below details for ITIL Foundation Certification.
     
    We are the global and leading Accredited Training Organization (ATO) for ITIL, PRINCE2, Lean Six Sigma, Agile Scrum Master, ISO 20000/27000, CSM, MSP, PMP, Cloud Computing, etc. !!!
    ITIL� (IT Infrastructure Library�) is the most widely established approach to IT Service Management. It provides a set of best practices for identifying, planning, delivering and supporting IT services to businesses and can be applied to nearly all organizations.</p>`
            },
     'article-three':{
            title: 'Article 2 - Guru',
            heading: 'MY SECOND ARTICLE ABOUT MY JOB',
            date:'August 15, 2015',
            content:`Hi! Welcome to my Second Article. I am Gurumoorthy. working on DXC Technology. Healthways Account.`
            },
     'article-four':{
            title: 'Article 3 - Guru',
            heading: 'MY THIRD ARTICLE ABOUT LIFE',
            date:'Nov 16,2016',
            content:`Hi! Welcome to my Third Article. I am Gurumoorthy. A Searcher of science.`
            }
};
function createTemplate (data){
var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;

var htmlTemplate = `
<html>
<head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="/ui/style.css" rel="stylesheet" />
</head>

<body>
    <div class="container">
        <div>
            <a href ="/"> Home </a>
        </div>
        
        <div>
            <h1> ${heading}</h1>
        </div>
        
        <div>
            <h2> ${date.toDateString()}</h2>
            
        </div>
        
        <div>
            ${content}
        </div>
        
        <br>
        <div>
        <input type="text" id="comments" placeholder="Say Something about article">
        
        </input>
        
        <input type="submit" id = "submitcontent" value="Submit">
        <br>
        </div>
        <br>
        Comments Section
            <div>
            <ul id="nameList">
                 
                
            </ul>
            </div>
         
    </div> 
        
    <script type="text/javascript" src="/ui/main.js">
    </script> 
    </body>

</html>
    
`;

return htmlTemplate;

}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hashFunction(password,salt){
    var hashed = crypto.pbkdf2Sync(password, 'salt', 10000, 512, 'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:password', function (req, res) {
  var hashedString = hashFunction(req.params.password,'This_is_some_random_string')
  res.send(hashedString);
});

app.post('/create-user', function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hashFunction(password, salt);
   
   pool.query(`INSERT INTO "user" (username, password) VALUES ($1,$2)`,[username,dbString], function(err,result){
     if(err){
         res.status(500).send(err.toString());
            } 
     else{
            res.send("User created successfully" +username);
         }
   });
});

app.post('/login', function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query(`SELECT * FROM "user" WHERE username= $1`,[username], function(err,result){
     if(err){
         res.status(500).send(err.toString());
            } 
     else{
         if(result.rows.length === 0){
             res.send(403).send("Invalid User or Password");
         }
         else{
             var dbString = result.rows[0].password;
             var salt = dbString.split('$')[2];
             var hashedPassword = hashFunction(password,salt);
             if(hashedPassword === dbString){
                 req.session.auth = {userId: result.rows[0].id};
                 res.send("Credentials are Correct. Welcome");
             }
             else{
          res.send(403).send("Wrong Password for User: " +username);   
                }
             
         }
         }
   });
});

app.get('/check-login', function(req,res){
    
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('You are Logged In ' +req.session.auth.userId.toString());
    }
    else{
        res.send('You are not logged In');
    }
});

app.get('/logout', function(req,res){
   delete req.session.auth;
   res.send('Logged out');
});


var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  pool.query("SELECT * FROM test", function (err, result){
     if(err){
         res.status(500).send(err.toString());
     } 
     else{
         res.send(JSON.stringify(result.rows));
     }
  });
});

var namesArticle1=[];
app.get('/article1comment', function (req, res) {
    
    var name1 = req.query.content;
    namesArticle1.push(name1);
    res.send(JSON.stringify(namesArticle1));
});


var counter =0;
app.get('/counter', function (req,res) {
   counter = counter + 1;
   res.send(counter.toString()); 
});

var names=[];
app.get('/submit-name', function (req, res) {
    
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
  
});

app.get('/articles/:articleName', function (req, res) {
  
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err,result){
     if(err){
         res.status(500).send(err.toString());
     } 
     else{
         if(result.rows.length === 0){
             res.status(404).send("Article not Found");
             
         }
         else{
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));
                         
         }
     }
  });
  
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(80, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
