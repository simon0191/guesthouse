$(document).ready(function() {

  var mainRegionTemplate = _.template($('#main-region-template').html());
  var $mainRegion = $('#main-region');
  var register = function() {
    $mainRegion.html(mainRegionTemplate({
      carousel: {
        mainText:'Create your account'
      },
      form: {
        inputs: [
          {placeholder:'Your name'},
          {placeholder:'Your email address'},
          {placeholder:'Your password'}
        ],
        submit: 'Sign up',
        info: {
          text: 'Got an account already?',
          link: 'Log in'
        }
      }
    }));
  };
  var login = function() {
    $mainRegion.html(mainRegionTemplate({
      carousel: {
        mainText:'Login'
      },
      form: {
        inputs: [
          {placeholder:'Your email address'},
          {placeholder:'Your password'}
        ],
        submit: 'Login',
        info: {
          text: "Don't have an account?",
          link: 'Sign up'
        }
      }
    }));
  }

  var router = Router({
    '/': login,
    '/login': login,
    '/register': register
  }).configure({
    html5history: true
  });

  router.init();

  $('.navbar-link').click(function(event) {
    event.preventDefault();
    var $link = $(event.currentTarget);
    var href = $link.attr('href');
    router.setRoute(href);
  });

});
