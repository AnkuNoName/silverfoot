$(document).ready(function(){
  $('.history__slider').slick({
    slidesToShow: 4, // Кількість видимих слайдів одночасно
    slidesToScroll: 1, // Кількість слайдів для прокрутки
    autoplay: true, // Автоматичне прокручування слайдів
    autoplaySpeed: 3000, // Швидкість автоматичного прокручування (у мілісекундах)
    responsive: [
      {
        breakpoint: 1500, // Порогове значення ширини вікна браузера, при якому застосовуватимуться ці налаштування
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1125, // Порогове значення ширини вікна браузера, при якому застосовуватимуться ці налаштування
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 700, // Інше порогове значення ширини вікна браузера
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });


  $('.form__input').on('focus', function() {
      if ($(this).val() === $(this).attr('value')) {
          $(this).val('');
      }
  });

  $('.form__message').on('focus', function() {
    if ($(this).val() === $(this).text()) {
      $(this).val('');
    }
  });


  $('#form').submit(function(e) {
    e.preventDefault(); // Prevent form submission

    var formData = $(this).serialize(); // Serialize form data

    $.ajax({
      url: 'send_email.php', // URL для обробки форми
      type: 'POST',
      data: formData,
      success: function(response) {
        console.log(response);
        // Обробка успішного відгуку
        alert('Email sent successfully!');
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
        // Обробка помилкового відгуку
        alert('Error sending email. Please try again.');
      }
    });
  });

  // BURGER MENU-------------------

  $('.burger__menu').click(function(){
    $('.modal').css('display', 'flex')
  });

  $('.modul-close, .nav__list-item').click(function(){
    $('.modal').css('display', 'none')
  });
});

// COLLAPSE ------------------------------ 


$('.collapse__title-box').click(function(event){
  $(this).toggleClass('active').next().slideToggle(500);
});


// COLLAPSE ------------------------------ 

// TO TOP BUTTON ------------------
$(window).scroll(function() { 
  let scrolled = $(window).scrollTop(); 

  if(scrolled > 350) { 
      $('.back-to-top').addClass('active');
  } else {
      $('.back-to-top').removeClass('active');
  }
});

$('.back-to-top').click(function () {
  $('body,html').animate({ scrollTop: 0}, 1500);
});
// TO TOP BUTTON ------------------




// Form JS -------------------------
$(function() {
  // Знаходить форму контактної інформації за її ідентифікатором
  var form = document.getElementById('ajax-contact-form');
  
  // Додає обробник події submit до форми
  form.addEventListener('submit', function(evt){
    var http = new XMLHttpRequest(), f = this;
    var th = $(this);
    
    // Зупиняє стандартну поведінку форми
    evt.preventDefault();
    
    // Відкриває новий запит POST на вказану адресу "contact.php"
    http.open("POST", "contact.php", true);
    
    // Обробник стану запиту
    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        // Виводить повідомлення з відповіддю від сервера
        alert(http.responseText);
        
        // Якщо відповідь містить ім'я, яке було введене в поле "nameFF"
        if (http.responseText.indexOf(f.nameFF.value) == 0) {
          // Очищає форму
          th.trigger("reset");
        }
      }
    }
    
    // Обробник помилки
    http.onerror = function() {
      alert('Помилка, спробуйте ще раз');
    }
    
    // Відправляє дані форми на сервер
    http.send(new FormData(f));
  }, false);
});


