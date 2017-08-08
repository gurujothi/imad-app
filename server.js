var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var articleOne = {
    title: 'Article 1 - Guru',
    heading: 'MY FIRST ARTICLE ABOUT ME',
    date:'Jan 16, 2015',
    content:`
                <p>     Hi! Welcome to my First Article. I am Gurumoorthy. Completed B.E. </p>
                        <p>Greetings from NovelVista learning Solutions! Thanks for showing interest in NovelVista Learning Solutions!!
            It was nice to talk to you today. Please find below details for ITIL Foundation Certification.
             
            We are the global and leading Accredited Training Organization (ATO) for ITIL, PRINCE2, Lean Six Sigma, Agile Scrum Master, ISO 20000/27000, CSM, MSP, PMP, Cloud Computing, etc. !!!
            ITIL® (IT Infrastructure Library®) is the most widely established approach to IT Service Management. It provides a set of best practices for identifying, planning, delivering and supporting IT services to businesses and can be applied to nearly all organizations.</p>
              `
};

function createTemplate (data)
{
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
    
    </div>    
</body>

</html>
    
`;

return htmlTemplate;

}
app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
    
});

app.get('/article-three', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
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
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
