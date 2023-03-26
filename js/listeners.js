$(document).on('click', '#endpoints_tab', function(e) {
    load_endpoints();
});

$(document).on('click', '#keys_tab', function(e) {
    load_keys();
});

$(document).on('click', '.toggle_disabled', function(e) {
    if($(this).hasClass('check')) {
        $(this).html(`
            <i class="fa-solid fa-ban"></i>
        `);
        $('.endpoint_disabled').addClass('hider');
        $('.key_disabled').addClass('hider');
        $(this).removeClass('check');
    } else {
        $(this).html(`
            <i class="fa-solid fa-ban text-light"></i>
        `);
        $('.endpoint_disabled').removeClass('hider');
        $('.key_disabled').removeClass('hider');
        $(this).addClass('check');
    }
});

$(document).on('click', '#create_endpoint', function(e) {
    render_create_endpoint_modal();
});

$(document).on('click', '#start_endpoint_creation', function(e) {
    create_endpoint();
});

$(document).on('click', '.endpoint_row', function(e) {
    let endpoint_id = $(this).attr('data-endpoint-id');
    let endpoint_name = $(this).attr('data-endpoint-name');
    let endpoint_enabled = $(this).attr('data-endpoint-enabled');
    render_edit_endpoint_modal(endpoint_id, endpoint_name, endpoint_enabled);
});

$(document).on('click', '#start_endpoint_delete', function(e) {
    if($(this).hasClass('sure')) {
        let endpoint_id = $(this).attr('data-endpoint-id');
        delete_endpoint(endpoint_id);
    } else {
        $(this).html(`Are you sure?`);
        $(this).addClass('sure');
    }
});

$(document).on('click', '#start_endpoint_edit', function(e) {
    if($(this).hasClass('sure')) {
        let endpoint_id = $(this).attr('data-endpoint-id');
        edit_endpoint(endpoint_id);
    } else {
        $(this).html(`Are you sure?`);
        $(this).addClass('sure');
    }
});

$(document).on('click', '#create_key', function(e) {
    render_create_key_modal();
});

$(document).on('click', '#start_key_creation', function(e) {
    create_api_key();
});

$(document).on('click', '.key_row', function(e) {
    let x_api_key = $(this).attr('data-api-key');
    let x_secret_key = $(this).attr('data-secret-key');
    let x_key_enabled = $(this).attr('data-key-enabled');
    render_edit_key_modal(x_api_key, x_secret_key, x_key_enabled);
});

$(document).on('click', '#regen_api_key', function(e) {
    let new_api_key = gen_string(64);
    $('#x_api_key').val(new_api_key);
});

$(document).on('click', '#regen_api_secret', function(e) {
    let new_api_secret = gen_string(256);
    $('#x_api_secret').val(new_api_secret);
});

$(document).on('click', '#start_key_delete', function(e) {
    if($(this).hasClass('sure')) {
        let x_api_key = $(this).attr('data-api-key');
        delete_api_key(x_api_key);
    } else {
        $(this).html(`Are you sure?`);
        $(this).addClass('sure');
    }
});

$(document).on('click', '#start_key_edit', function(e) {
    if($(this).hasClass('sure')) {
        let x_api_key = $(this).attr('data-api-key');
        let x_api_key_new = $('#x_api_key').val();
        let x_api_secret = $('#x_api_secret').val();
        let x_key_enabled = $('#key_enabled').prop('checked');
        console.log(x_key_enabled);
        edit_api_key(x_api_key, x_api_key_new, x_api_secret, x_key_enabled);
    } else {
        $(this).html(`Are you sure?`);
        $(this).addClass('sure');
    }
});