var divs = document.getElementsByClassName('alert');
for(var i=0; i<divs.length; i++) {
  divs[i].addEventListener("click", highlightThis);
  /*
  divs[i].addEventListener("click", highlightThis, true);
  divs[i].addEventListener("click", highlightThis, false);*/
}

function highlightThis(event) {
    //event.stopPropagation();
  
    var backgroundColor = this.style.backgroundColor;
    this.style.backgroundColor='yellow';
    alert(this.className);
    this.style.backgroundColor=backgroundColor;
}

/*
$('#signup').click(function(){
  $('#logo').animate({paddingTop:"1.8em"}, 200);
  $('#slogan').hide();
  $('#signup-form').show();
});

$('#login').click(function() {
  alert("login");
  $('#logo').animate({paddingTop:"2.2em"}, 200);
  $('#slogan').hide();
  $('#login-form').show();
});

$('.back').click(function() {
  $('#logo').animate({paddingTop:"2.5em"});
  $('#slogan').show();
  $('#signup-form').hide();
  $('#login-form').hide();
});
*/
