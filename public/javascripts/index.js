
// on form submit
$('#submitForm').click(function(e){
  console.log('submit clicked');
  const name = $('#name').val();
  const email = $('#email').val();
  const dob = $('#birthdayDate').val();
  const phone = $('#phone').val();
  $('#name').css("border", "none");
  $('#email').css("border", "none");
  $('#birthdayDate').css("border", "none");
  $('#phone').css("border", "none");
  $('#emailSpan').text('* ');
  $('#birthdayDateSpan').text('* ');
  validateUserInput(name, email, dob, phone);
});

// is valid email
const validateEmail = (input_str) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(input_str);
};

// calculate age
const calculateAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

// validate age (Age>18) from dob
const validateAge = (input_str) => {
  const userAge = calculateAge(input_str);
  if (userAge < 18) return false
  else return true
};

// validate user input
const validateUserInput = (name, email, dob, phone) => {
  name = name.trim();
  email = email.trim();
  dob = dob.trim();
  phone = phone.trim();

  let isValidEmail = false;
  let isValidAge = false;

  if (!name){
    $('#name').css({"border":"2px solid red"});
  }
  if (!email){
    $('#email').css({"border":"2px solid red"});
  }
  if (!dob){
    $('#birthdayDate').css({"border":"2px solid red"});
  }
  if (!phone){
    $('#phone').css({"border":"2px solid red"});
  }
  // validate the non empty inputs
  if (email){
    isValidEmail = validateEmail(email);
    if (!isValidEmail){
      $('#email').css({"border":"2px solid red"});
      $('#emailSpan').text('* please enter a valid email');
    }
  }
  if (dob){
    isValidAge = validateAge(dob);
    if (!isValidAge){
      $('#birthdayDate').css({"border":"2px solid red"});
      $('#birthdayDateSpan').text('* age cannot be less than 18');
    }
  }

  // submit if every validation passes
  if (isValidEmail && isValidAge){
    $('#submitForm').prop( "disabled", true );
    // call backend api to add form
    addFormAPI(data={name, email, dob, phone});
  }
};

const addFormAPI = (data) => {
  $('#spinner').html(`
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`
  );
  $.ajax({
    method:'POST',
    url:'/add-form',
    data: data,
    dataType: 'json',
    success(response){
      console.log(response);
      if (response['message'] =='Success'){
        // redirect to home page
        console.log('Loading home page');
        window.location = '/home';
      }

      $('#submitForm').prop( "disabled", false );
    },
    error(e){
      console.log(e);
      $('#submitForm').prop( "disabled", false );
    }
  });
};