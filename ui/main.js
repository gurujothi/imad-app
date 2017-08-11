var button = document.getElementById('counter');

button.onclick = function() {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        
        if(request.readyState === XMLHttpRequest.DONE){
            
            if(request.status === 200){
                
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
                
            }
        }
    };
    request.open('GET','http://gurumoorthy1994.imad.hasura-app.io/counter', true);
    request.send(null);
    
};

var nameInput = document.getElementById('name');

var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        
        if(request.readyState === XMLHttpRequest.DONE){
            
            if(request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i = 0; i<names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
                }
                
                var ui = document.getElementById('namelist');
                ui.innerHTML = list;
                            
                
            }
        }
    };
    var Name = nameInput.value;
    request.open('GET','http://gurumoorthy1994.imad.hasura-app.io/submit-name?name=' + Name, true);
    request.send(null);
    
    
};

var conInput = document.getElementById('comments');
var contsubmit = document.getElementById('submitcontent');
contsubmit.onclick = function() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        
        if(request.readyState === XMLHttpRequest.DONE){
            
            if(request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i = 0; i<names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
                }
                
                var ui = document.getElementById('namelist');
                ui.innerHTML = list;
                            
                
            }
        }
    };
    var Name = conInput.value;
    request.open('GET','http://gurumoorthy1994.imad.hasura-app.io/article1Comment?name=' + Name, true);
    request.send(null);
    
    
};