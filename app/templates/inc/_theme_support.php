<?php

/**
 * Theme Support
 */

//set the content width
if (!isset($content_width)) {
    $content_width = 900;
}

//start adding theme support!
if (function_exists('add_theme_support')) {

    //add menu support
    add_theme_support('menus');

    //add thumbnail theme support
    add_theme_support('post-thumbnails');

    //add image sizes
    add_image_size('large', 700, '', true); // Large thumbnail
    add_image_size('medium', 250, '', true); // Medium thumbnail
    add_image_size('small', 120, '', true); // Small thumbnail
    add_image_size('custom-size', 700, 200, true); // Custom thumbnail Size call using the_post_thumbnail('custom-size');

    // Add Support for Custom Backgrounds - Uncomment below if you're going to use
    /*add_theme_support('custom-background', array(
	'default-color' => 'FFF',
	'default-image' => get_template_directory_uri() . '/img/bg.jpg'
    ));*/

    // Add Support for Custom Header - Uncomment below if you're going to use
    /*add_theme_support('custom-header', array(
	'default-image'			=> get_template_directory_uri() . '/img/headers/default.jpg',
	'header-text'			=> false,
	'default-text-color'		=> '000',
	'width'				=> 1000,
	'height'			=> 198,
	'random-default'		=> false,
	'wp-head-callback'		=> $wphead_cb,
	'admin-head-callback'		=> $adminhead_cb,
	'admin-preview-callback'	=> $adminpreview_cb
    ));*/

    //enable post and comment RSS feed links to head
    add_theme_support('automatic-feed-links');

    //add localisation support
    load_theme_textdomain('<%= _.slugify(appMachineName) %>', get_template_directory() . '/languages');
}