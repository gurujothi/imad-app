var contentInput = document.getElementById('comments');

var submitbtn = document.getElementById('submitcontent');
submitbtn.onclick = function() {
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
                
                var ui = document.getElementById('nameList');
                ui.innerHTML = list;
                            
                
            }
        }
    };
    var Name = contentInput.value;
    
    request.open('GET','http://gurumoorthy1994.imad.hasura-app.io/article1Comment?content=' + Name, true);
    
    request.send(null);
    
    
};

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
