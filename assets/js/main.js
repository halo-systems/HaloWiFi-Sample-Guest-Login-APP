document.addEventListener('DOMContentLoaded', function() {
    // Modal triggers
    document.getElementById('tosModalTitle').addEventListener('click', function(e) {
        e.preventDefault();
        openModal('tos');
    });

    document.getElementById('privacyModalTitle').addEventListener('click', function(e) {
        e.preventDefault();
        openModal('privacy');
    });

    // Checkbox and button logic
    const termsCheckbox = document.getElementById('terms');
    const loginBtn = document.getElementById('loginBtn');

    termsCheckbox.addEventListener('change', function() {
        loginBtn.disabled = !this.checked;
    });
});

function openModal(type) {  
    const modalId = type === 'tos' ? 'tosModal' : 'privacyModal';
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(type) {
    const modalId = type === 'tos' ? 'tosModal' : 'privacyModal';
    document.getElementById(modalId).style.display = 'none';
}

$(document).ready(function() {
    // on button click
    $('#loginBtn').on('click', function() {
        console.log('loginBtn clicked');
    }); 

    // verify if the $_GET has location_id, user_id and session_id
    var url = window.location.href;
    var params = url.split('?')[1];
    var params = new URLSearchParams(params);
    console.log(params);
    if(!(params.has('location_id') && params.has('network_id') && params.has('session_id'))) {
        console.log('location_id, network_id, or session_id are not defined');
        // hide the loginBtn, welcome back text and checkbox
        $('#loginBtn').hide();
        // hide the checkbox
        $(".checkbox-wrapper").addClass('hidden');
        // show  this text 
        $('#loginRequestMalformed').removeClass('hidden');
        document.getElementById('login-url').innerHTML = url;
    }
});


$("#loginBtn").on('click', function() {
    console.log('loginBtn clicked');
    // collect location_id, user_id and session_id from url and send it to the guest login app's 
    // api where this data will be processed and then send to halowifi api to enable access and 
    // trigger wifi login. HaloWiFi api will respond with a redirection url to which you should redirect 
    // the user to.
    var url = window.location.href;
    var params = url.split('?')[1];
    var params = new URLSearchParams(params);
    var location_id = params.get('location_id');
    // var user_id = params.get('user_id');
    var session_id = params.get('session_id');
    var login_app_id = params.get('login_app_id');

    var login_data = {
        location_id: location_id,
        network_id: params.get('network_id'),
        session_id: session_id,
        login_app_id: login_app_id
    };

    var guest_login_api_url = APP_API+'/trigger-login';

    $.ajax({
        url: guest_login_api_url,
        method: 'POST',
        data: login_data,
        success: function(response) {
            console.log(response);
            // alert("Login url:: "+response.login_url);
            // redirect the user to the url provided in the response
            window.location.href = response.login_url;
        },
        error: function(error) {
            alert("Error in triggering login:: "+error);
        }
    });
});
