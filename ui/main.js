var nameInput = document.getElementById('username').value;
var password = document.getElementById('password').value;

var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        
        if(request.readyState === XMLHttpRequest.DONE){
            
            if(request.status === 200){
                
                alert('Logged In successfully');
            }
                else if(request.status ===403){
                    alert('Username/ Password is wrong');
                }
                else if(request.status ===500){
                    alert('Something Went Wrong');
                }                
            }
        
    };
    
    console.log(nameInput);
    console.log(password);
    request.open('POST','http://gurumoorthy1994.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify({username: nameInput, password: password}));
    
    
};
