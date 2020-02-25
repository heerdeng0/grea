// 카카오
//Kakao.init('0d71312f1225b97747f4f43f464c15ac');

// 네이버
var naverLogin = new naver_id_login("fa1KeUpSS5NgHqZQpVOb", "http://127.0.0.1:5500/user/callback/naver.html");
var state = naverLogin.getUniqState();
naverLogin.setButton("green", 1, 50);
naverLogin.setDomain("grea.kr");
naverLogin.setState(state);
naverLogin.setPopup();
naverLogin.init_naver_id_login();

// 페이스북
document.getElementById('facebook_id_login').setAttribute('onlogin', 'checkLoginState()');
document.getElementById('facebook_id_login').setAttribute('class', 'fb-login-button');
document.getElementById('facebook_id_login').setAttribute('data-size', 'large');
document.getElementById('facebook_id_login').setAttribute('data-button-type', 'login_with');
document.getElementById('facebook_id_login').setAttribute('data-auto-logout-link', 'true');
document.getElementById('facebook_id_login').setAttribute('data-use-continue-as', 'false');

window.fbAsyncInit = function() {
    FB.init({
        appId      : '383974355720838',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
    });
    FB.AppEvents.logPageView();
};

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        alert("statusChangeCallback");
    } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
}

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// 로그인 모달
document.getElementById("login_modal_btn").addEventListener("click", toggleLoginModal);
document.getElementById("login_auth_close_btn").addEventListener("click", toggleLoginModal);

var greaLoginLogo = document.createElement('img');
greaLoginLogo.setAttribute('src', '/img/grea_logo_50x50.png');
greaLoginLogo.setAttribute('width', '50');
document.getElementById('grea_id_login').appendChild(greaLoginLogo);
document.getElementById('grea_id_login').setAttribute('href', 'javascript:toggleGreaLogin()');

var kakaoLoginLogo = document.createElement('img');
kakaoLoginLogo.setAttribute('src', '/img/kakao_login.png');
kakaoLoginLogo.setAttribute('width', '50');
document.getElementById('kako_id_login').appendChild(kakaoLoginLogo);
document.getElementById('kako_id_login').setAttribute('href', 'javascript:kakaoLogin()');

document.getElementById("grea_login_close_btn").addEventListener("click", toggleGreaLogin);

var greaSignInImg = document.createElement('img');
greaSignInImg.setAttribute('src', '/img/grea_logo_50x50.png');
greaSignInImg.setAttribute('width', '50');
greaSignInImg.setAttribute('title', '로그인');
document.getElementById('grea_signin').appendChild(greaSignInImg);
document.getElementById("grea_signin").addEventListener("click", greaSignIn);

var greaSignUpImg = document.createElement('img');
greaSignUpImg.setAttribute('src', '/img/grea_logo_50x50.png');
greaSignUpImg.setAttribute('width', '50');
greaSignUpImg.setAttribute('title', '가입');
document.getElementById('grea_signup').appendChild(greaSignUpImg);
document.getElementById("grea_signin").addEventListener("click", greaSignUp);
