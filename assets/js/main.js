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
    if(!(params.has('location_id') && params.has('user_id') && params.has('session_id'))) {
        console.log('location_id, user_id, or session_id are not defined');
        // hide the loginBtn, welcome back text and checkbox
        $('#loginBtn').hide();
        // hide the checkbox
        $(".checkbox-wrapper").addClass('hidden');
        // show  this text 
        $('#loginRequestMalformed').removeClass('hidden');
    }
});