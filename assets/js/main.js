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
    // Validate URL Parameters
    var url = window.location.href;
    var params = new URLSearchParams(url.split('?')[1]);
    
    // IMPORTANT: Required URL parameters for HaloWiFi integration
    // - location_id: Identifies the specific location/venue
    // - network_id: Identifies the network within the location
    // - session_id: Unique identifier for this login session
    if(!(params.has('location_id') && params.has('network_id') && params.has('session_id'))) {
        // Handle malformed URLs by hiding login form and showing error
        $('#loginBtn').hide();
        $(".checkbox-wrapper").addClass('hidden');
        $('#loginRequestMalformed').removeClass('hidden');
        document.getElementById('login-url').innerHTML = url;
    }
});

$("#loginBtn").on('click', function() {
    // Extract URL parameters needed for HaloWiFi API
    var params = new URLSearchParams(window.location.href.split('?')[1]);
    
    // IMPLEMENTATION NOTE:
    // The following fields are collected from the login form
    // Additional fields can be added as needed:
    // - middle_name
    // - phone
    // - address
    // - city
    // - postal_code
    var login_data = {
        // Required HaloWiFi parameters from URL
        location_id: params.get('location_id'),
        network_id: params.get('network_id'),
        session_id: params.get('session_id'),
        login_app_id: params.get('login_app_id'),
        
        // WiFi access control parameters
        bandwidth: USER_BANDWIDTH_LIMIT,     // Define this constant based on your requirements
        session_timeout: USER_SESSION_TIMEOUT, // Define this constant based on your requirements
        
        // User information from form
        first_name: $('#firstName').val(),
        last_name: $('#lastName').val(),
        email: $('#email').val()
        
        // Additional fields can be added here:
        // middle_name: $('#middleName').val(),
        // phone: $('#phone').val(),
        // address: $('#address').val(),
        // city: $('#city').val(),
        // postal_code: $('#postalCode').val()
    };

    // API endpoint for guest login processing
    // IMPORTANT: APP_API should be defined as your base API URL
    $.ajax({
        url: YOUR_APP_API_DOMAIN+'/your-api-endpoint-for-guest-login',
        method: 'POST',
        data: login_data,
        success: function(response) {
            // Response should contain login_url for WiFi authentication
            window.location.href = response.login_url;
        },
        error: function(error) {
            alert("Error in triggering login:: "+error);
        }
    });
});
