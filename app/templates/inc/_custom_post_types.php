<?php

/**
 * Custom Post Types
 */

//create custom post types
function <%= _.slugify(appMachineName) %>_create_post_type() {

    //register taxonomies for post type
    register_taxonomy_for_object_type('category', '<%= _.slugify(appMachineName) %>-blank');
    register_taxonomy_for_object_type('post_tag', '<%= _.slugify(appMachineName) %>-blank');
    
    //register post type
    register_post_type('<%= _.slugify(appMachineName) %>-blank', //register Custom Post Type
        array(
        'labels' => array(
            'name' => __('<%= _.slugify(appName) %> Custom Post', '<%= _.slugify(appMachineName) %>'), //rename these to suit
            'singular_name' => __('<%= _.slugify(appName) %> Custom Post', '<%= _.slugify(appMachineName) %>'),
            'add_new' => __('Add New', '<%= _.slugify(appMachineName) %>'),
            'add_new_item' => __('Add New <%= _.slugify(appName) %> Custom Post', '<%= _.slugify(appMachineName) %>'),
            'edit' => __('Edit', '<%= _.slugify(appMachineName) %>'),
            'edit_item' => __('Edit <%= _.slugify(appName) %> Custom Post', '<%= _.slugify(appMachineName) %>'),
            'new_item' => __('New <%= _.slugify(appName) %> Custom Post', '<%= _.slugify(appMachineName) %>'),
            'view' => __('View <%= _.slugify(appName) %> Custom Post', '<%= _.slugify(appMachineName) %>'),
            'view_item' => __('View <%= _.slugify(appName) %> Custom Post', '<%= _.slugify(appMachineName) %>'),
            'search_items' => __('Search <%= _.slugify(appName) %> Custom Post', '<%= _.slugify(appMachineName) %>'),
            'not_found' => __('No <%= _.slugify(appName) %> Custom Posts found', '<%= _.slugify(appMachineName) %>'),
            'not_found_in_trash' => __('No <%= _.slugify(appName) %> Custom Posts found in Trash', '<%= _.slugify(appMachineName) %>')
        ),
        'public' => true,
        'hierarchical' => true, //allows your posts to behave like Hierarchy Pages
        'has_archive' => true,
        'supports' => array(
            'title',
            'editor',
            'excerpt',
            'thumbnail'
        ), //go to Dashboard Custom <%= _.slugify(appName) %> post for supports
        'can_export' => true, // Allows export in Tools > Export
        'taxonomies' => array(
            'post_tag',
            'category'
        ) //add category and post tags support
    ));
}