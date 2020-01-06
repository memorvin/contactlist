const BASE_URL = "http://localhost:3000";

$(document).ready(function() {

  setPage()

  $('.AlphabetNav a').click(function(e) {
    e.preventDefault();
    filterContacts(this)
  })

  $('#to-register').click(function() {
    event.preventDefault()
    showRegister()
  })

  $('#to-login').click(function() {
    event.preventDefault()
    showLogin()
  })

  $('#login-button').click(function(e) {
    e.preventDefault()
    login()
  })

  $('#register-button').click(function(e) {
    e.preventDefault()
    register()
  })

  $('#logout-button').click(function() {
    event.preventDefault()
    logout()
  })

  $('#close-create').click(function() {
    event.preventDefault()
    toggleCreateModal()
  })

  $('#open-create').click(function() {
    event.preventDefault()
    $('#create-modal').modal('show');
  })

  $('#add-button').click(function() {
    event.preventDefault()
    createContact()
  })

  $('#save-button').click(function() {
    event.preventDefault()
    updateContact()
  })

})

function fetchContacts() {
  $.ajax({
    method: "get",
    url: `http://localhost:3000/contacts`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(data => {
      console.log(data);
      $('#contact-list').empty()
      data.forEach(el => {
        $('#contact-list').append(`
          <div class="ui card contact-card">
          <img class="ui small left floated image" src="${el.picture}">
          <div class="content">
            <div class="header contact-name">${el.name}</div>
            <div class="meta">
              ${el.company}
            </div>
            <div class="description">
              <p>Email: ${el.email}</p>
              <p>Phone: ${el.home}</p>
              <p>Mobile: ${el.mobile}</p>
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button" onClick="toggleEditModal('${el.id}')">Edit</div>
              <div class="ui basic red button" onClick="deleteContact('${el.id}')">Delete</div>
            </div>
          </div>
        </div>
      `)
      });
    })
    .fail((data) => {
      if(typeof data.responseJSON === "object") {
        let arr = []
        for(let key in data.responseJSON) {
          arr.push(data.responseJSON[key])
        }
        Swal.fire(arr.join('\n'))
      } else {
        Swal.fire(data.responseJSON)
      }
    })
}

function filterContacts(alphabet) {
  let $navItem = $(alphabet),
      $contacts = $('.contact-card');
  $contacts.show();
  if ($navItem.hasClass('active')) {
    $navItem.removeClass('active');
  } else {
   $('.AlphabetNav a').removeClass('active');
    $navItem.addClass('active');
    $.each($contacts, function(key, contact) {
      let $contact = $(contact),
          $contactName = $contact.find('.contact-name'),
          $nameArr = $contactName.text().split(' ');
      if ($nameArr[0].split('')[0].toLowerCase() !== $navItem.text().toLowerCase()) {
        $contact.hide();
      }
    }); 
  }
};

function toggleEditModal(id) {
  $.ajax({
    method: "get",
    url: `${BASE_URL}/contacts/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((data) => {
      console.log(data);
      $('#edit-name').val(data.name),
      $('#edit-email').val(data.email),
      $('#edit-home').val(data.home),
      $('#edit-mobile').val(data.mobile),
      $('#edit-company').val(data.company),
      $('#edit-picture').val(data.picture)
      $('#edit-id').val(data.id)
      $('#edit-modal').modal('show');
      $("p:first").addClass("intro")
    })
    .fail((data) => {
      if(typeof data.responseJSON === "object") {
        let arr = []
        for(let key in data.responseJSON) {
          arr.push(data.responseJSON[key])
        }
        Swal.fire(arr.join('\n'))
      } else {
        Swal.fire(data.responseJSON)
      }
    })
}

function createContact() {
  $.ajax({
    method: "post",
    url: `${BASE_URL}/contacts/`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      name: $('#create-name').val(),
      email: $('#create-email').val(),
      home: $('#create-home').val(),
      mobile: $('#create-mobile').val(),
      company: $('#create-company').val(),
      picture: $('#create-picture').val()
    }
  })
    .done((data) => {
      console.log(data);
      $('#create-modal').modal('hide');
      $("#create-form")[0].reset()
      fetchContacts()
    })
    .fail((data) => {
      if(typeof data.responseJSON === "object") {
        let arr = []
        for(let key in data.responseJSON) {
          arr.push(data.responseJSON[key])
        }
        Swal.fire(arr.join('\n'))
      } else {
        Swal.fire(data.responseJSON)
      }
    })
}

function updateContact() {
  let id = $('#edit-id').val()
  $.ajax({
    method: "patch",
    url: `${BASE_URL}/contacts/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      name: $('#edit-name').val(),
      email: $('#edit-email').val(),
      home: $('#edit-home').val(),
      mobile: $('#edit-mobile').val(),
      company: $('#edit-company').val(),
      picture: $('#edit-picture').val()
    }
  })
    .done((data) => {
      console.log(data);
      $('#edit-modal').modal('hide');
      $("#edit-form")[0].reset()
      fetchContacts()
    })
    .fail((data) => {
      if(typeof data.responseJSON === "object") {
        let arr = []
        for(let key in data.responseJSON) {
          arr.push(data.responseJSON[key])
        }
        Swal.fire(arr.join('\n'))
      } else {
        Swal.fire(data.responseJSON)
      }
    })
}

function deleteContact(id) {
  $.ajax({
    method: "delete",
    url: `http://localhost:3000/contacts/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((data) => {
      console.log(data);
      fetchContacts()
    })
    .fail((data) => {
      if(typeof data.responseJSON === "object") {
        let arr = []
        for(let key in data.responseJSON) {
          arr.push(data.responseJSON[key])
        }
        Swal.fire(arr.join('\n'))
      } else {
        Swal.fire(data.responseJSON)
      }
    })
}

function setPage() {
  if (localStorage.getItem('access_token')) {
    $('#login-box').hide()
    $('#register-box').hide()
    $('#login-box').empty()
    $('#register-box').empty()
    fetchContacts();
    $('#main').show()
  } else {
    $('#login-box').show()
    $('#register-box').hide()
    $('#main').hide()
  }
}

function showRegister() {
  $('#login-box').hide()
  $('#login-box').empty()
  $('#register-box').show()
}

function showLogin() {
  $('#login-box').show()
  $('#register-box').empty()
  $('#register-box').hide()
}

function login() {
  $.ajax({
    url: `${BASE_URL}/users/login`,
    method: 'post',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(function (data) {
      $("#login-form")[0].reset()
      localStorage.setItem('access_token', data.access_token)
      setPage()
    })
    .fail(function (data) {
      if(typeof data.responseJSON === "object") {
        let arr = []
        for(let key in data.responseJSON) {
          arr.push(data.responseJSON[key])
        }
        Swal.fire(arr.join('\n'))
      } else {
        Swal.fire(data.responseJSON)
      }
    })
}

function register() {
  $.ajax({
    url: `${BASE_URL}/users/register`,
    method: 'POST',
    data: {
      name: $('#name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val(),
      avatar: $('#avatar').val()
    }
  })
    .done(function (data) {
      $("#register-form")[0].reset()
      Swal.fire('Account successfully created. Please log in to continue.')
      showLogin()
    })
    .fail(function (data) {
      if(typeof data.responseJSON === "object") {
        let arr = []
        for(let key in data.responseJSON) {
          arr.push(data.responseJSON[key])
        }
        Swal.fire(arr.join('\n'))
      } else {
        Swal.fire(data.responseJSON)
      }
    })
}

function logout() {
  localStorage.removeItem('access_token')
  setPage()
}