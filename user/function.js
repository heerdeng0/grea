function kakaoLogin() {
    Kakao.Auth.login({
        success: function(authObj) {
            alert(JSON.stringify(authObj));
        },
        fail: function(err) {
            alert(JSON.stringify(err));
        }
    });
};

function toggleLoginModal() { 
    document.getElementById("login_auth").classList.toggle("show_login_auth");
};

function toggleGreaLogin() {
    toggleLoginModal();
    document.getElementById("grea_login_id").classList.toggle("show_grea_login"); 
};

function greaSignIn() {
    fetch("https://gdw3d3ehtk.execute-api.ap-northeast-2.amazonaws.com/grea/grea-kakao-auth", {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        },
        body : "firstName=Nikhil&favColor=blue&password=easytoguess"
    }).then(function(res){
        if(res.ok){
            alert("Perfect. Your setting are saved.");
        }else if(res.status == 401){
            alert("Oops! You are not authorized");
        }
    }, function(e){
        alert("Error submitting form");
    });
};

function greaSignUp() {
    var poolData = {
        UserPoolId : 'ap-northeast-2_YN7j6tuNv',
        ClientId : '2sdvb8hbp3o2bkc6i2stdrkfak'
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : document.getElementById('grea_login_email').value, // your username here
        Pool : userPool
    };

    var attributeList = [];
 
    var dataEmail = {
        Name : 'email',
        Value : document.getElementById('grea_login_email').value
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    
    attributeList.push(attributeEmail);
    
    var cognitoUser;
    userPool.signUp('username', 'password', attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });

};