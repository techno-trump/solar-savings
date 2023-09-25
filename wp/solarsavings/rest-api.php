<?php
	if ( ! class_exists( 'WP_Site_Health' ) ) {
		require_once ABSPATH . 'wp-admin/includes/class-wp-site-health.php';
	}
	WP_Site_Health::get_instance();

	function create_ghl_contact(WP_REST_Request $request) {
		$data = $request->get_json_params();
		$bearer;
		
		if (isset($data['contact']['customField']) && isset($data['contact']['customField']['referred_by'])) {
			$bearer = carbon_get_theme_option('crb_main_ghl_bearer');
		} else {
			$bearer = carbon_get_post_meta($data['postId'], 'crb_ghl_bearer');
		}
		
		$result = call_rest_API('POST', 'https://rest.gohighlevel.com/v1/contacts/', $bearer, $data['contact']);
		
		$response = new WP_REST_Response($result['data']);
		$response->set_status($result['responseCode']);
		return $response;
	}
	function add_custom_routs() {
		register_rest_route('ghl-hooks/v1', '/contacts/', array (
			'methods' => 'POST',
			'callback' => 'create_ghl_contact',
			'permission_callback' => '__return_true',
			'args' => array(
				'postId' => array (
					'required' => true,
				),
				'contact' => array (
					'required' => true,
					'validate_callback' => function($param, $request, $key) {
					  return isset($param['phone']) && isset($param['firstName']) && isset($param['lastName']);
					}
				),
			),
		) );
	}
	
	function call_rest_API($method, $url, $bearer, $data = false) {
		$curl = curl_init();

		switch ($method)
		{
			case "POST":
				curl_setopt($curl, CURLOPT_POST, 1);
				if ($data)
					curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
				break;
			case "PUT":
				curl_setopt($curl, CURLOPT_PUT, 1);
				break;
			default:
				if ($data)
					$url = sprintf("%s?%s", $url, http_build_query($data));
		}

		// Authentication:
		curl_setopt($curl, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json',
			'Authorization: Bearer ' . $bearer,
		));

		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

		$resultData = curl_exec($curl);
		$responseCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
		curl_close($curl);

		return array( 'responseCode' => $responseCode, 'data' => json_decode($resultData));
	}
?>