
// redirect back to form page
$("#backtohomebtn").on('click', function(){
  window.location = '/';
});

// renders forms in the dom function
const renderFormsDom = (data) => {
  let html = '';
  data.reverse();
  data.map((form)=>{
    html += `
    <div class="col-sm-6">
      <div class="card text-center">
        <div class="card-header">
          Featured
        </div>
        <div class="card-body">
          <img src="/images/profilePic.png" width="150" height="150">
          <h5 class="card-title">${form.name}</h5>
          <p class="card-text"><i class="fa fa-envelope-open-text"></i>
          ${form.email}</p>
          <p class="card-text"><i class="fa fa-mobile-alt"></i>
          ${form.phone}</p>
          <p class="card-text" style="color:#8c8c8c">This form was submitted by ${form.name}. Details of submition has been forwarded to the provided email id ${form.email}</p>
          <a href="#" class="btn btn-primary">Back to Start</a>
        </div>
        <div class="card-footer text-muted">
          Submitted on : ${form.createdAt}
        </div>
      </div>
    </div>
    `
  });
  $('#allForms').html(html);
};

const renderFormsError = () => {
  let html = `<img src='/images/error.png' width="500" height="500">`;
  $('#error').html(html);
};

// call get forms backend api function
const getFormsApi = () => {
  $.ajax({
    method:'GET',
    url:'/get-forms',
    dataType: 'json',
    success(response){
      renderFormsDom(response.data);
    },
    error(e){
      console.log(e);
      renderFormsError();
    }
  });
};

// calling get forms backend api
getFormsApi();