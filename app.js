     // the authentication in page
  function login(){
 /*   var options = {
  theme: {
    logo: 'https://example.com/assets/logo.png',
    primaryColor: 'green'
  }  
};*/
var options = {"icon":"https://s24.postimg.org/e5zr6ncet/htv_logo_01.png","container":"root","primaryColor":"#F0D96F", "foregroundColor": "#edf5e1", 
"responseType":"token","autoclose":true,"focusInput":false,"popup":false,"socialBigButtons":true,"dict":{"title":"Hack The Valley"},"authParams":{"scope":"openid email"},"connections":["facebook","twitter"]};

  // initialize
  var lock = new Auth0LockPasswordless('ThjTg1wA4gZADyLKJVkhmSOMpC6gybwA', 'eojohn.auth0.com');

        // Open the lock in Email Code mode with the ability to handle
        // the authentication in page
        lock.emailcode(options, function(err, profile, id_token, state) {

          var userEmail=profile.name;

          if (!err) {
            console.log('profile',profile);
            console.log('id_token',profile);
            console.log('state',state);

            // Save the JWT token.
            localStorage.setItem('userToken', id_token);
            
            $('.login-box').hide();
            $('.logged-in-box').show();
           $('.nickname').text(profile.name);
           var ref = firebase.database().ref();
           ref.child("users")
   .orderByChild("email")
   .equalTo(profile.name) //profile.name
   .on("child_added", function(snapshot) {

         var userName=snapshot.val().first_name;
         var userStatus=snapshot.val().status;
                       $('.userName').text(userName);

                       $('.status').text(userStatus);
                       if (userName==="Ralph" || "Eon"){
                     $('.message_box').show();
                     document.onkeydown = function () {
    if (window.event.keyCode == '13') {
        submitPost();
              return false;

    }
}

                       }else{
                      $('.message_box').hide();

                       }

     });
              $('.userName').text(snapshot.val().name);

function logout(){    // local storage example
            
            window.location.href = 'http://www.google.com';

   };
            $('.avatar').attr('src', profile.picture);
          }
        });
      
    
     $http.get('https://eojohn.github.io/htvdashboard/');
$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('id_token')) {
      xhr.setRequestHeader('Authorization',
        'Bearer ' + localStorage.getItem('id_token'));
    }
  }
});
 
    $('.btn-api').click(function(e) {
        // Just call your API here. The header will be sent
    })

}


 


 var messageRef = firebase.database().ref('messages/');;
           messageRef.on('child_added', function(snapshot) {
  var post = snapshot.val();
  displayUserPost(post.text);
});

 var template =
 '<span  class="message">Hey</span>'
;


function submitPost() {

//  var messageRef = new Firebase('https://hack-the-valley.firebaseio.com/messages');
   var text = $('#message').val();

  if (text===""){
    alert("You need to have a value in the field")
  }else{
      messageRef.push({text: text});
  $('#message').val('');
  }


 }


function displayUserPost(text) {
$('<span class="message child">').text(text).appendTo($('#messages2'));

/* var elems = document.getElementsByClassName("message");
var arr = jQuery.makeArray(elems);
arr.reverse();
$(arr).appendTo($('#messages2'));*/
 
$('body, html, #messages2').animate({ scrollTop: 0 }, "fast");
 }



window.onload = function() {
  login();
};
