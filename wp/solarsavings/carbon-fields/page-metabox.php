<?php
	use Carbon_Fields\Container;
	use Carbon_Fields\Field;
	
	Container::make( 'post_meta', 'Referrer settings' )
		->where( 'post_template', '=', 'home.php' )
		->add_fields( array(
			Field::make( 'text', 'crb_ghl_calendar_code', 'GHL Calendar integration code')
				->set_required( true ),
				Field::make( 'text', 'crb_ghl_file_upload_code', 'GHL File Upload Form integration code')
				->set_required( true ),
			Field::make( 'text', 'crb_ghl_bearer', 'GHL Bearer')
				->set_required( true ),
		) );
?>