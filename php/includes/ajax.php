<?php
    // require the autoloader for vendor etc.
    require_once('../../vendor/autoload.php');
    // load the env file and create $_ENV for all of it
    $dotenv = Dotenv\Dotenv::createImmutable('../..//config/');
    $dotenv->load();
    // created constants for all $_ENV variables
    foreach($_ENV as $k => $v) {
        define($k, $v);
    }
    // handle both body data and post data
    $data = [];
    foreach($_POST as $k => $v) {
        $$k = $v;
    }
    $body_data = json_decode(file_get_contents('php://input'), true);
    if(is_array($body_data)) {
        foreach($body_data as $k => $v) {
            $$k = $v;
        }
    }
    if(isset($function_name) && !empty($function_name)) {
        if(!function_exists($function_name)) {
            echo json_encode([
                'success' => false,
                'data' => null,
                'error' => 'Function does not exist!'
            ]);
        } else {
            $response = $function_name($data);
            echo json_encode($response);
        }
    }

    function load_endpoints($data) {
        $token = get_token();
        if($token['success']) {
            $post_body = [
                'api_key' => API_KEY,
                'api_secret_key' => API_SECRET,
                'api_token' => $token['data']
            ];
            $curl_options = [
                CURLOPT_URL => 'http://api.local/api/api_editor/return_endpoints',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_POSTFIELDS => json_encode($post_body),
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json'
                ]
            ];
            $curl = curl_init();
            curl_setopt_array($curl, $curl_options);
            $plain_response = curl_exec($curl);
            $array_response = json_decode($plain_response, true);
            curl_close($curl);
            if(is_array($array_response)) {
                if(isset($array_response['success']) && $array_response['success']) {
                    return [
                        'success' => true,
                        'data' => $array_response['data'],
                        'error' => null
                    ];
                } else {
                    curl_close($curl);
                    return [
                        'success' => false,
                        'data' => $array_response,
                        'error' => 'Failed to retrieve endpoints, bad return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $plain_response,
                    'error' => 'Failed to retrieve endpoints, bad request / return data.'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => $token,
                'error' => 'Something went wrong retrieving a token (token return in data)'
            ];
        }
    }

    function create_endpoint($data) {
        foreach($data as $k => $v) {
            $$k = $v;
        }
        if(isset($x_endpoint_name) && !empty($x_endpoint_name) && isset($x_endpoint_enabled)) {
            $token = get_token();
            if($token['success']) {
                $post_body = [
                    'api_key' => API_KEY,
                    'api_secret_key' => API_SECRET,
                    'api_token' => $token['data'],
                    'data' => [
                        'x_endpoint_name' => $x_endpoint_name,
                        'x_endpoint_enabled' => $x_endpoint_enabled
                    ]
                ];
                $curl_options = [
                    CURLOPT_URL => 'http://api.local/api/api_editor/create_endpoint',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_POSTFIELDS => json_encode($post_body),
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json'
                    ]
                ];
                $curl = curl_init();
                curl_setopt_array($curl, $curl_options);
                $plain_response = curl_exec($curl);
                $array_response = json_decode($plain_response, true);
                curl_close($curl);
                if(is_array($array_response)) {
                    if(isset($array_response['success']) && $array_response['success']) {
                        return [
                            'success' => true,
                            'data' => $array_response['data'],
                            'error' => null
                        ];
                    } else {
                        curl_close($curl);
                        return [
                            'success' => false,
                            'data' => $array_response,
                            'error' => 'Failed to create endpoint, bad return data.'
                        ];
                    }
                } else {
                    return [
                        'success' => false,
                        'data' => $plain_response,
                        'error' => 'Failed to create endpoint, bad request / return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $token,
                    'error' => 'Something went wrong retrieving a token (token return in data)'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => null,
                'error' => 'Incorrect parameters passed to internal AJAX function.'
            ];
        }
    }

    function delete_endpoint($data) {
        foreach($data as $k => $v) {
            $$k = $v;
        }
        if(isset($x_endpoint_id) && !empty($x_endpoint_id)) {
            $token = get_token();
            if($token['success']) {
                $post_body = [
                    'api_key' => API_KEY,
                    'api_secret_key' => API_SECRET,
                    'api_token' => $token['data'],
                    'data' => [
                        'x_endpoint_id' => $x_endpoint_id
                    ]
                ];
                $curl_options = [
                    CURLOPT_URL => 'http://api.local/api/api_editor/delete_endpoint',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_POSTFIELDS => json_encode($post_body),
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json'
                    ]
                ];
                $curl = curl_init();
                curl_setopt_array($curl, $curl_options);
                $plain_response = curl_exec($curl);
                $array_response = json_decode($plain_response, true);
                curl_close($curl);
                if(is_array($array_response)) {
                    if(isset($array_response['success']) && $array_response['success']) {
                        return [
                            'success' => true,
                            'data' => $array_response['data'],
                            'error' => null
                        ];
                    } else {
                        curl_close($curl);
                        return [
                            'success' => false,
                            'data' => $array_response,
                            'error' => 'Failed to delete endpoint, bad return data.'
                        ];
                    }
                } else {
                    return [
                        'success' => false,
                        'data' => $plain_response,
                        'error' => 'Failed to delete endpoint, bad request / return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $token,
                    'error' => 'Something went wrong retrieving a token (token return in data)'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => null,
                'error' => 'Incorrect parameters passed to internal AJAX function.'
            ];
        }
    }

    function edit_endpoint($data) {
        foreach($data as $k => $v) {
            $$k = $v;
        }
        if(isset($x_endpoint_id) && !empty($x_endpoint_id) && isset($x_endpoint_name) && !empty($x_endpoint_name) && isset($x_endpoint_enabled)) {
            $token = get_token();
            if($token['success']) {
                $post_body = [
                    'api_key' => API_KEY,
                    'api_secret_key' => API_SECRET,
                    'api_token' => $token['data'],
                    'data' => [
                        'x_endpoint_id' => $x_endpoint_id,
                        'x_endpoint_name' => $x_endpoint_name,
                        'x_endpoint_enabled' => $x_endpoint_enabled
                    ]
                ];
                $curl_options = [
                    CURLOPT_URL => 'http://api.local/api/api_editor/edit_endpoint',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_POSTFIELDS => json_encode($post_body),
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json'
                    ]
                ];
                $curl = curl_init();
                curl_setopt_array($curl, $curl_options);
                $plain_response = curl_exec($curl);
                $array_response = json_decode($plain_response, true);
                curl_close($curl);
                if(is_array($array_response)) {
                    if(isset($array_response['success']) && $array_response['success']) {
                        return [
                            'success' => true,
                            'data' => $array_response['data'],
                            'error' => null
                        ];
                    } else {
                        curl_close($curl);
                        return [
                            'success' => false,
                            'data' => $array_response,
                            'error' => 'Failed to edit endpoint, bad return data.'
                        ];
                    }
                } else {
                    return [
                        'success' => false,
                        'data' => $plain_response,
                        'error' => 'Failed to edit endpoint, bad request / return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $token,
                    'error' => 'Something went wrong retrieving a token (token return in data)'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => null,
                'error' => 'Incorrect parameters passed to internal AJAX function.'
            ];
        }
    }

    function load_keys($data) {
        $token = get_token();
        if($token['success']) {
            $post_body = [
                'api_key' => API_KEY,
                'api_secret_key' => API_SECRET,
                'api_token' => $token['data']
            ];
            $curl_options = [
                CURLOPT_URL => 'http://api.local/api/api_editor/return_keys',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_POSTFIELDS => json_encode($post_body),
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json'
                ]
            ];
            $curl = curl_init();
            curl_setopt_array($curl, $curl_options);
            $plain_response = curl_exec($curl);
            $array_response = json_decode($plain_response, true);
            curl_close($curl);
            if(is_array($array_response)) {
                if(isset($array_response['success']) && $array_response['success']) {
                    return [
                        'success' => true,
                        'data' => $array_response['data'],
                        'error' => null
                    ];
                } else {
                    curl_close($curl);
                    return [
                        'success' => false,
                        'data' => $array_response,
                        'error' => 'Failed to retrieve keys, bad return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $plain_response,
                    'error' => 'Failed to retrieve keys, bad request / return data.'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => $token,
                'error' => 'Something went wrong retrieving a token (token return in data)'
            ];
        }
    }

    function load_permission_options($data) {
        $token = get_token();
        if($token['success']) {
            $post_body = [
                'api_key' => API_KEY,
                'api_secret_key' => API_SECRET,
                'api_token' => $token['data']
            ];
            $curl_options = [
                CURLOPT_URL => 'http://api.local/api/api_editor/return_permission_options',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_POSTFIELDS => json_encode($post_body),
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json'
                ]
            ];
            $curl = curl_init();
            curl_setopt_array($curl, $curl_options);
            $plain_response = curl_exec($curl);
            $array_response = json_decode($plain_response, true);
            curl_close($curl);
            if(is_array($array_response)) {
                if(isset($array_response['success']) && $array_response['success']) {
                    return [
                        'success' => true,
                        'data' => $array_response['data'],
                        'error' => null
                    ];
                } else {
                    curl_close($curl);
                    return [
                        'success' => false,
                        'data' => $array_response,
                        'error' => 'Failed to retrieve permission options, bad return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $plain_response,
                    'error' => 'Failed to retrieve permission options, bad request / return data.'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => $token,
                'error' => 'Something went wrong retrieving a token (token return in data)'
            ];
        }
    }

    function delete_api_key($data) {
        foreach($data as $k => $v) {
            $$k = $v;
        }
        if(isset($x_api_key) && !empty($x_api_key)) {
            $token = get_token();
            if($token['success']) {
                $post_body = [
                    'api_key' => API_KEY,
                    'api_secret_key' => API_SECRET,
                    'api_token' => $token['data'],
                    'data' => [
                        'x_api_key' => $x_api_key
                    ]
                ];
                $curl_options = [
                    CURLOPT_URL => 'http://api.local/api/api_editor/delete_api_key',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_POSTFIELDS => json_encode($post_body),
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json'
                    ]
                ];
                $curl = curl_init();
                curl_setopt_array($curl, $curl_options);
                $plain_response = curl_exec($curl);
                $array_response = json_decode($plain_response, true);
                curl_close($curl);
                if(is_array($array_response)) {
                    if(isset($array_response['success']) && $array_response['success']) {
                        return [
                            'success' => true,
                            'data' => $array_response['data'],
                            'error' => null
                        ];
                    } else {
                        curl_close($curl);
                        return [
                            'success' => false,
                            'data' => $array_response,
                            'error' => 'Failed to delete key, bad return data.'
                        ];
                    }
                } else {
                    return [
                        'success' => false,
                        'data' => $plain_response,
                        'error' => 'Failed to delete key, bad request / return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $token,
                    'error' => 'Something went wrong retrieving a token (token return in data)'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => null,
                'error' => 'Incorrect parameters passed to internal AJAX function.'
            ];
        }
    }

    function edit_key($data) {
        foreach($data as $k => $v) {
            $$k = $v;
        }
        if(isset($x_api_key) && !empty($x_api_key) && isset($x_api_key_new) && !empty($x_api_key_new) && isset($x_api_secret) && !empty($x_api_secret) && isset($x_key_enabled) && isset($x_permissions)) {
            $token = get_token();
            if($token['success']) {
                $post_body = [
                    'api_key' => API_KEY,
                    'api_secret_key' => API_SECRET,
                    'api_token' => $token['data'],
                    'data' => [
                        'x_api_key' => $x_api_key,
                        'x_api_key_new' => $x_api_key_new,
                        'x_api_secret' => $x_api_secret,
                        'x_key_enabled' => $x_key_enabled,
                        'x_permissions' => $x_permissions
                    ]
                ];
                $curl_options = [
                    CURLOPT_URL => 'http://api.local/api/api_editor/edit_key',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_POSTFIELDS => json_encode($post_body),
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json'
                    ]
                ];
                $curl = curl_init();
                curl_setopt_array($curl, $curl_options);
                $plain_response = curl_exec($curl);
                $array_response = json_decode($plain_response, true);
                curl_close($curl);
                if(is_array($array_response)) {
                    if(isset($array_response['success']) && $array_response['success']) {
                        return [
                            'success' => true,
                            'data' => $array_response['data'],
                            'error' => null
                        ];
                    } else {
                        curl_close($curl);
                        return [
                            'success' => false,
                            'data' => $array_response,
                            'error' => 'Failed to edit key, bad return data.'
                        ];
                    }
                } else {
                    return [
                        'success' => false,
                        'data' => $plain_response,
                        'error' => 'Failed to edit key, bad request / return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $token,
                    'error' => 'Something went wrong retrieving a token (token return in data)'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => null,
                'error' => 'Incorrect parameters passed to internal AJAX function.'
            ];
        }
    }

    function generate_key($data) {
        foreach($data as $k => $v) {
            $$k = $v;
        }
        if(isset($permissions) && !empty($permissions)) {
            $token = get_token();
            if($token['success']) {
                $post_body = [
                    'api_key' => API_KEY,
                    'api_secret_key' => API_SECRET,
                    'api_token' => $token['data'],
                    'data' => [
                        'permissions' => $permissions,
                        'x_api_key_enabled' => 1
                    ]
                ];
                $curl_options = [
                    CURLOPT_URL => 'http://api.local/api/api_editor/generate_key',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_POSTFIELDS => json_encode($post_body),
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json'
                    ]
                ];
                $curl = curl_init();
                curl_setopt_array($curl, $curl_options);
                $plain_response = curl_exec($curl);
                $array_response = json_decode($plain_response, true);
                curl_close($curl);
                if(is_array($array_response)) {
                    if(isset($array_response['success']) && $array_response['success']) {
                        return [
                            'success' => true,
                            'data' => $array_response['data'],
                            'error' => null
                        ];
                    } else {
                        curl_close($curl);
                        return [
                            'success' => false,
                            'data' => $array_response,
                            'error' => 'Failed to edit key, bad return data.'
                        ];
                    }
                } else {
                    return [
                        'success' => false,
                        'data' => $plain_response,
                        'error' => 'Failed to edit key, bad request / return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $token,
                    'error' => 'Something went wrong retrieving a token (token return in data)'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => null,
                'error' => 'Incorrect parameters passed to internal AJAX function.'
            ];
        }
    }

    function load_key_permission_options($data) {
        foreach($data as $k => $v) {
            $$k = $v;
        }
        if(isset($x_api_key) && !empty($x_api_key)) {
            $token = get_token();
            if($token['success']) {
                $post_body = [
                    'api_key' => API_KEY,
                    'api_secret_key' => API_SECRET,
                    'api_token' => $token['data'],
                    'data' => [
                        'x_api_key' => $x_api_key
                    ]
                ];
                $curl_options = [
                    CURLOPT_URL => 'http://api.local/api/api_editor/return_key_permissions',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_POSTFIELDS => json_encode($post_body),
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json'
                    ]
                ];
                $curl = curl_init();
                curl_setopt_array($curl, $curl_options);
                $plain_response = curl_exec($curl);
                $array_response = json_decode($plain_response, true);
                curl_close($curl);
                if(is_array($array_response)) {
                    if(isset($array_response['success']) && $array_response['success']) {
                        return [
                            'success' => true,
                            'data' => $array_response['data'],
                            'error' => null
                        ];
                    } else {
                        curl_close($curl);
                        return [
                            'success' => false,
                            'data' => $array_response,
                            'error' => 'Failed to edit key, bad return data.'
                        ];
                    }
                } else {
                    return [
                        'success' => false,
                        'data' => $plain_response,
                        'error' => 'Failed to edit key, bad request / return data.'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'data' => $token,
                    'error' => 'Something went wrong retrieving a token (token return in data)'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => null,
                'error' => 'Incorrect parameters passed to internal AJAX function.'
            ];
        }
    }
   
    function get_token() {
        $post_body = [
            'api_key' => API_KEY,
            'api_secret_key' => API_SECRET
        ];
        $curl_options = [
            CURLOPT_URL => 'http://api.local/api/general/get_token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_POSTFIELDS => json_encode($post_body),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json'
            ]
        ];
        $curl = curl_init();
        curl_setopt_array($curl, $curl_options);
        $plain_response = curl_exec($curl);
        $array_response = json_decode($plain_response, true);
        curl_close($curl);
        if(is_array($array_response)) {
            if(isset($array_response['success']) && $array_response['success']) {
                return [
                    'success' => true,
                    'data' => $array_response['data']['token'],
                    'error' => null
                ];
            } else {
                return [
                    'success' => false,
                    'data' => $array_response,
                    'error' => 'Failed to retrieve token, bad return data.'
                ];
            }
        } else {
            return [
                'success' => false,
                'data' => $plain_response,
                'error' => 'Failed to retrieve token, bad request / return data.'
            ];
        }
    }
?>