function load_index(element) {
    let html = `
        <div class="container-fluid">
            <div class="row justify-content-center align-items-top pt-5 pb-5">
                <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-10 col-sm-10 col-sm-12 col-12 main_sec_back p-0">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="endpoints_tab" data-bs-toggle="tab" data-bs-target="#endpoints_tab_content" type="button" role="tab" aria-controls="endpoints_tab" aria-selected="true">Endpoints</button>
                            <button class="nav-link" id="keys_tab" data-bs-toggle="tab" data-bs-target="#keys_tab_content" type="button" role="tab" aria-controls="keys_tab" aria-selected="false">Keys</button>
                        </div>
                    </nav>
                    <div class="tab-content text-center" id="nav-tabContent">
                        <div id="endpoints_tab_content" class="tab-pane fade show active justify-content-center" role="tabpanel" aria-labelledby="endpoints_tab" tabindex="0">
                            <span class="loader m-3"></span>
                        </div>
                        <div id="keys_tab_content" class="tab-pane fade text-center" role="tabpanel" aria-labelledby="keys_tab" tabindex="0">
                            <span class="loader m-3"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $(element).html(html);
    load_endpoints();
}

function render_endpoints(element, response) {
    let html = `
        <div class="row justify-content-center align-items-center pt-2 pb-2 ps-5 pe-5 g-0 text-start row_back title_row sticky-top">
            <div class="col-2">
                <span class="row_header_title">ID</span>
            </div>
            <div class="col-6">
                <span class="row_header_title">Name</span>
            </div>
            <div class="col-3">
                <span class="row_header_title">Date Created</span>
            </div>
            <div class="col-1 text-end float-end">
                <span class="row_header_title btn btn_main toggle_disabled" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Toggle disabled"><i class="fa-solid fa-ban"></i></span>
                <span id="create_endpoint" class="row_header_title btn btn_main" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Create"><i class="fa-solid fa-plus"></i></span>
            </div>
        </div>
    `;
    $.each(response.data, function(k, v) {
        var enabled_disabled_class = '';
        var updated_tooltip = '';
        switch(v.endpoint_enabled) {
            case 1:
                enabled_disabled_class = '';
            break;
            case 0:
                enabled_disabled_class = 'endpoint_disabled hider';
            break;
        }
        if(v.updated_timestamp !== '' && v.updated_timestamp !== null && v.updated_timestamp !== undefined) {
            updated_tooltip = 'Updated: ' + v.updated_timestamp;
        } else {
            updated_tooltip = 'Never Modified:';
        }
        html += `
            <div class="row justify-content-center align-items-center pt-4 pb-4 ps-5 pe-5 g-0 text-start row_back endpoint_row `+enabled_disabled_class+`" data-endpoint-id="`+v.endpoint_id+`" data-endpoint-name="`+v.endpoint_name+`" data-created-timestamp="`+v.created_timestamp+`" data-endpoint-enabled="`+v.endpoint_enabled+`">
                <div class="col-2">
                    <span>`+v.endpoint_id+`</span>
                </div>
                <div class="col-6">
                    <span>`+v.endpoint_name+`</span>
                </div>
                <div class="col-4">
                    <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="`+updated_tooltip+`">`+v.created_timestamp+`</span>
                </div>
            </div>
        `;
    });
    $(element).html(html);
    enable_tt();
}

function render_create_endpoint_modal() {
    var html = ``;
    if(!$('#create_endpoint_modal').length) {
        // create the modal structure
        html = `
            <div id="create_endpoint_modal" class="modal fade" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create Endpoint</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="endpoint_name" class="form-label">Endpoint Name</label>
                                <input id="endpoint_name" type="text" class="form-control" placeholder="This should match your classname AND filename!" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Required">
                            </div>
                            <div class="form-check form-switch mb-3">
                                <label class="form-check-label" for="endpoint_enabled">Enabled?</label>
                                <input id="endpoint_enabled" class="form-check-input" type="checkbox" checked role="switch">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button id="start_endpoint_creation" type="button" class="btn btn-success">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // append the modal to the root element
        $('#root').append(html);
    }
    // initialise modal
    const create_endpoint_modal = new bootstrap.Modal('#create_endpoint_modal', {});
    // show the modal
    create_endpoint_modal.show();
    enable_tt();
}


function render_edit_endpoint_modal(endpoint_id, endpoint_name, endpoint_enabled) {
    $('#edit_endpoint_modal').remove();
    // create the modal structure
    if(endpoint_enabled == 1) {
        var checked = 'checked';
    } else {
        var checked = '';
    }
    let html = `
        <div id="edit_endpoint_modal" class="modal fade" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Endpoint</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="endpoint_name" class="form-label">Endpoint Name</label>
                            <input id="endpoint_name" type="text" class="form-control" value="`+endpoint_name+`" placeholder="This should match your classname AND filename!" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Required">
                        </div>
                        <div class="form-check form-switch mb-3">
                            <label class="form-check-label" for="endpoint_enabled">Enabled?</label>
                            <input id="endpoint_enabled" class="form-check-input" type="checkbox" `+checked+` role="switch" id="endpoint_enabled">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="start_endpoint_delete" type="button" class="btn btn-danger" data-endpoint-id="`+endpoint_id+`">Delete</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button id="start_endpoint_edit" type="button" class="btn btn-success" data-endpoint-id="`+endpoint_id+`">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    // append the modal to the root element
    $('#root').append(html);
    // initialise modal
    const edit_endpoint_modal = new bootstrap.Modal('#edit_endpoint_modal', {});
    // show the modal
    edit_endpoint_modal.show();
    enable_tt();
}

function render_keys(element, response) {
    let html = `
        <div class="row justify-content-center align-items-center pt-2 pb-2 ps-5 pe-5 g-0 text-start row_back title_row sticky-top">
            <div class="col-2">
                <span class="row_header_title">Key</span>
            </div>
            <div class="col-6">
                <span class="row_header_title">Secret</span>
            </div>
            <div class="col-3">
                <span class="row_header_title">Date Created</span>
            </div>
            <div class="col-1 text-end float-end">
                <span class="row_header_title btn btn_main toggle_disabled" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Toggle disabled"><i class="fa-solid fa-ban"></i></span>
                <span id="create_key" class="row_header_title btn btn_main" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Create"><i class="fa-solid fa-plus"></i></span>
            </div>
        </div>
    `;
    $.each(response.data, function(k, v) {
        var enabled_disabled_class = '';
        var updated_tooltip = '';
        switch(v.key_enabled) {
            case 1:
                enabled_disabled_class = '';
            break;
            case 0:
                enabled_disabled_class = 'key_disabled hider';
            break;
        }
        if(v.updated_timestamp !== '' && v.updated_timestamp !== null && v.updated_timestamp !== undefined) {
            updated_tooltip = 'Updated: ' + v.updated_timestamp;
        } else {
            updated_tooltip = 'Never Modified:';
        }
        html += `
            <div class="row justify-content-center align-items-center pt-4 pb-4 ps-5 pe-5 g-0 text-start row_back key_row `+enabled_disabled_class+`" data-api-key="`+v.api_key+`" data-secret-key="`+v.secret_key+`" data-created-timestamp="`+v.created_timestamp+`" data-key-enabled="`+v.key_enabled+`">
                <div class="col-2">
                    <span class="cell_text overflow-auto">`+v.api_key+`</span>
                </div>
                <div class="col-6">
                    <span class="cell_text overflow-auto">`+v.secret_key+`</span>
                </div>
                <div class="col-4">
                    <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="`+updated_tooltip+`">`+v.created_timestamp+`</span>
                </div>
            </div>
        `;
    });
    $(element).html(html);
    enable_tt();
}

function render_create_key_modal() {
    var html = ``;
    if(!$('#create_key_modal').length) {
        // create the modal structure
        html = `
            <div id="create_key_modal" class="modal fade" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create Key</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="permissions_options">
                            
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button id="start_key_creation" type="button" class="btn btn-success">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // append the modal to the root element
        $('#root').append(html);
    }
    load_permissions_options();
    // initialise modal
    const create_key_modal = new bootstrap.Modal('#create_key_modal', {});
    // show the modal
    create_key_modal.show();
    enable_tt();
}

function render_permission_options(element, response) {
    let html = ``;
    var checked;
    $.each(response.data, function(k, v) {
        if(v.permission_granted == 1) {
            checked = 'checked';
        } else {
            checked = '';
        }
        html += `
            <div class="form-check form-switch mb-3">
                <label class="form-check-label text-truncate" style="max-width: 412px;" for="switch_`+v.endpoint_id+`">`+v.endpoint_name+`</label>
                <input id="switch_`+v.endpoint_id+`" class="form-check-input permission" `+checked+` value="`+v.endpoint_id+`" type="checkbox" role="switch">
            </div>
        `;
    });

    $(element).html(html);
}

function render_edit_key_modal(x_api_key, x_secret_key, x_key_enabled) {
    $('#edit_key_modal').remove();
    // create the modal structure
    if(x_key_enabled == 1) {
        var checked = 'checked';
    } else {
        var checked = '';
    }
    let html = `
        <div id="edit_key_modal" class="modal fade" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Key</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="x_api_key" class="form-label">API Key</label>
                            <br>
                            <span id="regen_api_key" class="btn btn_main w-100"><i class="fa-solid fa-arrows-rotate"></i><input id="x_api_key" type="text" class="form-control" value="`+x_api_key+`" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Required" readonly></span>
                        </div>
                        <div class="mb-3">
                            <label for="x_api_secret" class="form-label">API Secret</label>
                            <span id="regen_api_secret" class="btn btn_main w-100"><i class="fa-solid fa-arrows-rotate"></i><input id="x_api_secret" type="text" class="form-control" value="`+x_secret_key+`" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Required" readonly></span>
                        </div>
                        <div id="permissions_options">
                            
                        </div>
                        <div class="form-check form-switch mb-3">
                            <label class="form-check-label" for="endpoint_enabled">Key Enabled?</label>
                            <input id="key_enabled" class="form-check-input" type="checkbox" `+checked+` role="switch" id="key_enabled">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="start_key_delete" type="button" class="btn btn-danger" data-api-key="`+x_api_key+`">Delete</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button id="start_key_edit" type="button" class="btn btn-success" data-api-key="`+x_api_key+`">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    // append the modal to the root element
    $('#root').append(html);
    load_key_permissions_options(x_api_key);
    // initialise modal
    const edit_key_modal = new bootstrap.Modal('#edit_key_modal', {});
    // show the modal
    edit_key_modal.show();
    enable_tt();
}