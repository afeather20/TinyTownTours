$(document).ready(function() { 
    $('#login').click(function (e) {



    });
    $('#createAccount').click(function(e){ 
        var newUserAccount = {
            firstName: $('#input-first-name').val(),
            lastName: $('#input-last-name').val(),
            email: $('#input-email').val(),
            userName: $('#input-username').val(),
            hashedPassword: $('#input-pass').val(),
            confirmHashedPassword: $('#input-confirm-pass').val()
        };

        $.ajax({
            url: '/createUser', 
            type:'POST',
            data: newUserAccount, 
            dataType: 'json',
            success: function(data) { 
                window.alert("You have created an account");
            },
            error: function(data){ 
                window.alert(data.responseJSON.error)
            }

        })

    });

});