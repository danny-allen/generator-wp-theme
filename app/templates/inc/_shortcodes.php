<?php

/**
 * Shortcodes
 */

//shortcode demo with nested capability
function <%= _.slugify(appMachineName) %>_shortcode_demo($atts, $content = null) {
    return '<div class="shortcode-demo">' . do_shortcode($content) . '</div>'; //do_shortcode allows for nested shortcodes
}

//shortcode demo with simple <h2> tag
function <%= _.slugify(appMachineName) %>_shortcode_demo_2($atts, $content = null) { //demo heading H2 shortcode, allows for nesting within above element - fully expandable.
    return '<h2>' . $content . '</h2>';
}

//add the shortcodes
add_shortcode('<%= _.slugify(appMachineName) %>_shortcode_demo', '<%= _.slugify(appMachineName) %>_shortcode_demo'); //you can place [<%= _.slugify(appMachineName) %>_shortcode_demo] in Pages, Posts now.
add_shortcode('<%= _.slugify(appMachineName) %>_shortcode_demo_2', '<%= _.slugify(appMachineName) %>_shortcode_demo_2'); //place [<%= _.slugify(appMachineName) %>_shortcode_demo_2] in Pages, Posts now.

//shortcodes above would be nested like this -
// [<%= _.slugify(appMachineName) %>_shortcode_demo] [<%= _.slugify(appMachineName) %>_shortcode_demo_2] Here's the page title! [/<%= _.slugify(appMachineName) %>_shortcode_demo_2] [/<%= _.slugify(appMachineName) %>_shortcode_demo]
