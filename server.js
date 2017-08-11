var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles=   {
     'article-two':{
            title: 'Article 1 - Guru',
            heading: 'MY FIRST ARTICLE ABOUT ME',
            date:'Jan 16, 2015',
            content:`<p>     Hi! Welcome to my First Article. I am Gurumoorthy. Completed B.E. </p>
                <p>Greetings from NovelVista learning Solutions! Thanks for showing interest in NovelVista Learning Solutions!!
    It was nice to talk to you today. Please find below details for ITIL Foundation Certification.
     
    We are the global and leading Accredited Training Organization (ATO) for ITIL, PRINCE2, Lean Six Sigma, Agile Scrum Master, ISO 20000/27000, CSM, MSP, PMP, Cloud Computing, etc. !!!
    ITIL® (IT Infrastructure Library®) is the most widely established approach to IT Service Management. It provides a set of best practices for identifying, planning, delivering and supporting IT services to businesses and can be applied to nearly all organizations.</p>`
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
            <h2> ${date}</h2>
            
        </div>
        
        <div>
            ${content}
        </div>
    
        <div>
        <input type="text" id="comments" placeholder="Say Something about article">
        
        </input>
        </div>
        <input type="submit" id = "submitcontent" value="Submit">
        
        <ul id="nameList">
                    
        </ul>
         
    </div> 
        
        
    </body>

</html>
    
`;

return htmlTemplate;

}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var namesArticle1=[];
app.get('/article1Comment', function (req, res) {
    
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
