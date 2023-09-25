<?php
	use Carbon_Fields\Container;
	use Carbon_Fields\Field;
	
	Container::make( 'post_meta', 'General fields' )
		->where( 'post_template', '=', 'home.php' )
		->add_fields( array(
			Field::make( 'rich_text', 'crb_main_title', 'Main Title')
				->set_default_value('See How Much You Can <span class="main-title_p2"> Save&nbsp;with&nbsp;Solar</span>&nbsp;!')
				->set_required( true ),
			Field::make( 'text', 'crb_ghl_calendar_code', 'GHL Calendar integration code')
				->set_required( true ),
			Field::make( 'text', 'crb_ghl_bearer', 'GHL Bearer')
				->set_required( true ),
			Field::make( 'text', 'crb_google_api_key', 'Google API Key')
				->set_default_value('AIzaSyAzKgasm0eB7tXP-FMXZ-9iKNNU00Yl7Y0')
				->set_required( true ),
		) );
	Container::make( 'post_meta', 'Power Bill step' )
	->where( 'post_template', '=', 'home.php' )
	->add_fields( array(
			Field::make( 'text', 'crb_power_bill_step_question', 'Step Question')
				->set_default_value('What’s your average monthly power bill?')
				->set_required( true ),
			Field::make( 'text', 'crb_power_bill_left_card_title', 'Left Card Title')
				->set_required( true ),
			Field::make( 'text', 'crb_power_bill_left_card_text', 'Left Card Text')
				->set_required( true ),
			Field::make( 'text', 'crb_power_bill_right_card_title', 'Right Card Title')
				->set_required( true ),
			Field::make( 'text', 'crb_power_bill_right_card_text', 'Right Card Text')
				->set_required( true ),
		) );
	Container::make( 'post_meta', 'Address step' )
	->where( 'post_template', '=', 'home.php' )
	->add_fields( array(
			Field::make( 'text', 'crb_address_step_question', 'Step Question')
				->set_default_value('What’s your average monthly power bill?')
				->set_required( true ),
			Field::make( 'text', 'crb_address_left_card_title', 'Left Card Title')
				->set_required( true ),
			Field::make( 'text', 'crb_address_left_card_text', 'Left Card Text')
				->set_required( true ),
			Field::make( 'text', 'crb_address_right_card_title', 'Right Card Title')
				->set_required( true ),
			Field::make( 'text', 'crb_address_right_card_text', 'Right Card Text')
				->set_required( true ),
		) );
	Container::make( 'post_meta', 'Thank you step' )
		->where( 'post_template', '=', 'home.php' )
		->add_fields( array(
			Field::make( 'complex', 'crb_faq_item', 'FAQ record')
				->add_fields( array(
					Field::make( 'text', 'crb_faq_item_title', 'Title'),
					Field::make( 'textarea', 'crb_faq_item_text', 'Text'),
				) ),
		) );
?>