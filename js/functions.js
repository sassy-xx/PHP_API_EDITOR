// coonstants to be access globally
var tooltipTriggerList;
var tooltipList;
function load_endpoints() {
    var data = {
        'function_name': 'load_endpoints'
    }
    $.ajax({
        method: "POST",
        url: "/php/includes/ajax.php",
        data: data,
        beforeSend: function() {
            if(!$('#endpoints_tab_content > .loader').length) {
                $('#endpoints_tab_content').html(`
                    <span class="loader m-3"></span>
                `);
            }
        }
    }).done(function(response) {
        response = JSON.parse(response);
        if(response.success) {
            render_endpoints('#endpoints_tab_content', response);
        } else {
            console.log('Something went wrong loading the endpoint data. Details are likely in the network tab!');
        }
        console.log(response);
    });
}

function create_endpoint() {
    // show a loader on the create button
    $('#start_endpoint_creation').html(`
        <span class="button_loader me-3"></span>Creating...
    `);
    // gather endpoint details
    var endpoint_name = $('#endpoint_name').val();
    var endpoint_enabled = $('#endpoint_enabled').prop('checked');
    // validate endpoint details
    if(endpoint_name.replace(/\s/g,'') !== '') {
        $('#endpoint_name').removeClass('border border-danger-subtle');
        var data = {
            'function_name': 'create_endpoint',
            'data': {
                'x_endpoint_name': endpoint_name,
                'x_endpoint_enabled': endpoint_enabled
            }
        };
        $.ajax({
            method: "POST",
            url: "/php/includes/ajax.php",
            data: data
        }).done(function(response) {
            response = JSON.parse(response);
            if(response.success) {
                var data = {
                    'function_name': 'load_endpoints',
                }
                $.ajax({
                    method: "POST",
                    url: "/php/includes/ajax.php",
                    data: data
                }).done(function(response) {
                    response = JSON.parse(response);
                    if(response.success) {
                        $('#create_endpoint_modal').remove();
                        $('.modal-backdrop').remove();
                        render_endpoints('#endpoints_tab_content', response);
                    } else {
                        console.log('Something went wrong loading the endpoint data. Details are likely in the network tab!');
                    }
                });
            } else {
                console.log('Something went wrong creating the endpoint. Details are likely in the network tab!');
            }
        });
    } else {
        // show validation error on the endpoint name box
        $('#endpoint_name').addClass('border border-danger-subtle');
        $('#endpoint_name').tooltip('show');
    }
}

function delete_endpoint(endpoint_id) {
    // show a loader on the create button
    $('#start_endpoint_delete').html(`
        <span class="button_loader me-3"></span>Deleting...
    `);
    var data = {
        'function_name': 'delete_endpoint',
        'data': {
            'x_endpoint_id': endpoint_id
        }
    };
    $.ajax({
        method: "POST",
        url: "/php/includes/ajax.php",
        data: data
    }).done(function(response) {
        response = JSON.parse(response);
        if(response.success) {
            var data = {
                'function_name': 'load_endpoints',
            }
            $.ajax({
                method: "POST",
                url: "/php/includes/ajax.php",
                data: data
            }).done(function(response) {
                response = JSON.parse(response);
                if(response.success) {
                    $('#edit_endpoint_modal').remove();
                    $('.modal-backdrop').remove();
                    render_endpoints('#endpoints_tab_content', response);
                } else {
                    console.log('Something went wrong loading the endpoint data. Details are likely in the network tab!');
                }
            });
        } else {
            console.log('Something went wrong deleting the endpoint. Details are likely in the network tab!');
        }
    });
}

function edit_endpoint(endpoint_id, endpoint_name, endpoint_enabled) {
    // show a loader on the create button
    $('#start_endpoint_edit').html(`
        <span class="button_loader me-3"></span>Editing...
    `);
    // gather endpoint details
    var endpoint_name = $('#endpoint_name').val();
    var endpoint_enabled = $('#endpoint_enabled').prop('checked');
    // validate endpoint details
    if(endpoint_name.replace(/\s/g,'') !== '') {
        $('#endpoint_name').removeClass('border border-danger-subtle');
        var data = {
            'function_name': 'edit_endpoint',
            'data': {
                'x_endpoint_id': endpoint_id,
                'x_endpoint_name': endpoint_name,
                'x_endpoint_enabled': endpoint_enabled
            }
        };
        $.ajax({
            method: "POST",
            url: "/php/includes/ajax.php",
            data: data
        }).done(function(response) {
            response = JSON.parse(response);
            if(response.success) {
                var data = {
                    'function_name': 'load_endpoints',
                }
                $.ajax({
                    method: "POST",
                    url: "/php/includes/ajax.php",
                    data: data
                }).done(function(response) {
                    response = JSON.parse(response);
                    if(response.success) {
                        $('#edit_endpoint_modal').remove();
                        $('.modal-backdrop').remove();
                        render_endpoints('#endpoints_tab_content', response);
                    } else {
                        console.log('Something went wrong loading the endpoint data. Details are likely in the network tab!');
                    }
                });
            } else {
                console.log('Something went wrong editing the endpoint details. Details are likely in the network tab!');
            }
        });
    } else {
        // show validation error on the endpoint name box
        $('#endpoint_name').addClass('border border-danger-subtle');
        $('#endpoint_name').tooltip('show');
    }
}

function load_keys() {
    var data = {
        'function_name': 'load_keys'
    }
    $.ajax({
        method: "POST",
        url: "/php/includes/ajax.php",
        data: data,
        beforeSend: function() {
            if(!$('#keys_tab_content > .loader').length) {
                $('#keys_tab_content').html(`
                    <span class="loader m-3"></span>
                `);
            }
        }
    }).done(function(response) {
        response = JSON.parse(response);
        if(response.success) {
            render_keys('#keys_tab_content', response);
        } else {
            console.log('Something went wrong loading the keys data. Details are likely in the network tab!');
        }
        console.log(response);
    });
}

function load_permissions_options() {
    var data = {
        'function_name': 'load_permission_options'
    }
    $.ajax({
        method: "POST",
        url: "/php/includes/ajax.php",
        data: data
    }).done(function(response) {
        response = JSON.parse(response);
        if(response.success) {
            render_permission_options('#permissions_options', response);
        } else {
            console.log('Something went wrong loading the permission options data. Details are likely in the network tab!');
        }
        console.log(response);
    });
}

function create_api_key() {
    $('#start_key_creation').html(`
        <span class="button_loader me-3"></span>Editing...
    `);
    var permissions = [];
    $.each($('.permission:checkbox:checked'), function(k, v) {
        permissions.push($(v).val());
    });
    var data = {
        'function_name': 'generate_key',
        'data': {
            permissions
        }
    }
    $.ajax({
        method: "POST",
        url: "/php/includes/ajax.php",
        data: data
    }).done(function(response) {
        response = JSON.parse(response);
        if(response.success) {
            $('#create_key_modal').remove();
            $('.modal-backdrop').remove();
            load_keys();
        } else {
            console.log('Something went wrong creating the API key. Details are likely in the network tab!');
        }
        console.log(response);
    });
}

function delete_api_key(x_api_key) {
    // show a loader on the create button
    $('#start_key_delete').html(`
        <span class="button_loader me-3"></span>Deleting...
    `);
    var data = {
        'function_name': 'delete_api_key',
        'data': {
            'x_api_key': x_api_key
        }
    };
    $.ajax({
        method: "POST",
        url: "/php/includes/ajax.php",
        data: data
    }).done(function(response) {
        response = JSON.parse(response);
        if(response.success) {
            $('#edit_key_modal').remove();
            $('.modal-backdrop').remove();
            load_keys();
        } else {
            console.log('Something went wrong deleteing the API key. Details are likely in the network tab!');
        }
        console.log(response);
    });
}

function edit_api_key(x_api_key, x_api_key_new, x_api_secret, x_key_enabled) {
    // show a loader on the create button
    $('#start_key_edit').html(`
        <span class="button_loader me-3"></span>Editing...
    `);
    // validate key details
    if(x_api_key.replace(/\s/g,'') !== '') {
        if(x_api_key_new.replace(/\s/g,'') !== '') {
            if(x_api_secret.replace(/\s/g,'') !== '') {
                $('#endpoint_name').removeClass('border border-danger-subtle');
                var x_permissions = [];
                $.each($('.permission:checkbox:checked'), function(k, v) {
                    x_permissions.push($(v).val());
                });
                var data = {
                    'function_name': 'edit_key',
                    'data': {
                        'x_api_key': x_api_key,
                        'x_api_key_new': x_api_key_new,
                        'x_api_secret': x_api_secret,
                        'x_key_enabled': x_key_enabled,
                        'x_permissions': x_permissions
                    }
                };
                $.ajax({
                    method: "POST",
                    url: "/php/includes/ajax.php",
                    data: data
                }).done(function(response) {
                    response = JSON.parse(response);
                    if(response.success) {
                        $('#edit_key_modal').remove();
                        $('.modal-backdrop').remove();
                        load_keys();
                    } else {
                        console.log('Something went wrong editing the API keys details. Details are likely in the network tab!');
                    }
                });
            } else {
                // show validation error on the secret key box
                $('#x_api_secret').addClass('border border-danger-subtle');
                $('#x_api_secret').tooltip('show');
            }
        } else {
            // show validation error on the secret key box
            $('#x_api_key').addClass('border border-danger-subtle');
            $('#x_api_key').tooltip('show');
        }
    } else {
        // show validation error on the api key box
        $('#x_api_key').addClass('border border-danger-subtle');
        $('#x_api_key').tooltip('show');
    }
}

function load_key_permissions_options(x_api_key) {
    var data = {
        'function_name': 'load_key_permission_options',
        'data': {
            'x_api_key': x_api_key
        }
    }
    $.ajax({
        method: "POST",
        url: "/php/includes/ajax.php",
        data: data
    }).done(function(response) {
        response = JSON.parse(response);
        if(response.success) {
            render_permission_options('#permissions_options', response);
        } else {
            console.log('Something went wrong loading the permission options data. Details are likely in the network tab!');
        }
        console.log(response);
    });
}

function enable_tt() {
    $('[data-bs-toggle="tooltip"]').tooltip('hide');
    tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            container: 'body',
            trigger : 'hover'
        });
    });
}

function gen_string(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}