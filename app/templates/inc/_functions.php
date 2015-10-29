<?php

/**
 * Functions
 */

//<%= _.slugify(appName) %> navigation
function <%= _.slugify(appMachineName) %>_nav() {
	wp_nav_menu(
	array(
		'theme_location'  => 'header-menu',
		'menu'            => '',
		'container'       => 'div',
		'container_class' => 'menu-{menu slug}-container',
		'container_id'    => '',
		'menu_class'      => 'menu',
		'menu_id'         => '',
		'echo'            => true,
		'fallback_cb'     => 'wp_page_menu',
		'before'          => '',
		'after'           => '',
		'link_before'     => '',
		'link_after'      => '',
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 0,
		'walker'          => ''
		)
	);
}

//load <%= _.slugify(appName) %> scripts (header.php)
function <%= _.slugify(appMachineName) %>_header_scripts() {
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        wp_register_script('<%= _.slugify(appMachineName) %>_scripts', get_template_directory_uri() . '/scripts/main.js', array('jquery'), '1.0.0'); //custom scripts
        wp_enqueue_script('<%= _.slugify(appMachineName) %>_scripts'); // Enqueue it!
    }
}

//load <%= _.slugify(appName) %> conditional scripts
function <%= _.slugify(appMachineName) %>_conditional_scripts() {
    if (is_page('pagenamehere')) {
        wp_register_script('scriptname', get_template_directory_uri() . '/js/scriptname.js', array('jquery'), '1.0.0'); //conditional script(s)
        wp_enqueue_script('scriptname'); // Enqueue it!
    }
}

//load <%= _.slugify(appName) %> styles
function <%= _.slugify(appMachineName) %>_styles() {
    wp_register_style('<%= _.slugify(appMachineName) %>_styles', get_template_directory_uri() . '/styles/main.css', array(), '1.0', 'all');
    wp_enqueue_style('<%= _.slugify(appMachineName) %>_styles'); // Enqueue it!
}

//register <%= _.slugify(appName) %> Navigation
function <%= _.slugify(appMachineName) %>_register_menu() {
    register_nav_menus(array( // Using array to specify more menus if needed
        'header-menu' => __('Header Menu', '<%= _.slugify(appMachineName) %>_'), // Main Navigation
        'sidebar-menu' => __('Sidebar Menu', '<%= _.slugify(appMachineName) %>_'), // Sidebar Navigation
        'extra-menu' => __('Extra Menu', '<%= _.slugify(appMachineName) %>_') // Extra Navigation if needed (duplicate as many as you need!)
    ));
}

//remove the <div> surrounding the dynamic navigation to cleanup markup
function my_wp_nav_menu_args($args = '') {
    $args['container'] = false;
    return $args;
}

//remove Injected classes, ID's and Page ID's from Navigation <li> items
function my_css_attributes_filter($var) {
    return is_array($var) ? array() : '';
}

//remove invalid rel attribute values in the categorylist
function remove_category_rel_from_category_list($thelist) {
    return str_replace('rel="category tag"', 'rel="tag"', $thelist);
}

//add page slug to body class, love this - Credit: Starkers Wordpress Theme
function add_slug_to_body_class($classes) {
    global $post;
    if (is_home()) {
        $key = array_search('blog', $classes);
        if ($key > -1) {
            unset($classes[$key]);
        }
    } elseif (is_page()) {
        $classes[] = sanitize_html_class($post->post_name);
    } elseif (is_singular()) {
        $classes[] = sanitize_html_class($post->post_name);
    }

    return $classes;
}

//if dynamic sidebar exists
if (function_exists('register_sidebar')) {
    //define Sidebar Widget Area 1
    register_sidebar(array(
        'name' => __('Widget Area 1', '<%= _.slugify(appMachineName) %>_'),
        'description' => __('Description for this widget-area...', '<%= _.slugify(appMachineName) %>_'),
        'id' => 'widget-area-1',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));

    //define sidebar widget area 2
    register_sidebar(array(
        'name' => __('Widget Area 2', '<%= _.slugify(appMachineName) %>_'),
        'description' => __('Description for this widget-area...', '<%= _.slugify(appMachineName) %>_'),
        'id' => 'widget-area-2',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));
}

//remove wp_head() injected Recent Comment styles
function my_remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action('wp_head', array(
        $wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
        'recent_comments_style'
    ));
}

//pagination for paged posts, Page 1, Page 2, Page 3, with Next and Previous Links, No plugin
function <%= _.slugify(appMachineName) %>_pagination() {
    global $wp_query;
    $big = 999999999;
    echo paginate_links(array(
        'base' => str_replace($big, '%#%', get_pagenum_link($big)),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $wp_query->max_num_pages
    ));
}

//custom Excerpts
function <%= _.slugify(appMachineName) %>_index($length) //create 20 Word Callback for Index page Excerpts, call using <%= _.slugify(appMachineName) %>_excerpt('<%= _.slugify(appMachineName) %>_index');
{
    return 20;
}

//create 40 Word Callback for Custom Post Excerpts, call using <%= _.slugify(appMachineName) %>_excerpt('<%= _.slugify(appMachineName) %>_custom_post');
function <%= _.slugify(appMachineName) %>_custom_post($length) {
    return 40;
}

//create the Custom Excerpts callback
function <%= _.slugify(appMachineName) %>_excerpt($length_callback = '', $more_callback = '') {
    global $post;
    if (function_exists($length_callback)) {
        add_filter('excerpt_length', $length_callback);
    }
    if (function_exists($more_callback)) {
        add_filter('excerpt_more', $more_callback);
    }
    $output = get_the_excerpt();
    $output = apply_filters('wptexturize', $output);
    $output = apply_filters('convert_chars', $output);
    $output = '<p>' . $output . '</p>';
    echo $output;
}

//custom View Article link to Post
function <%= _.slugify(appMachineName) %>_view_article($more) {
    global $post;
    return '... <a class="view-article" href="' . get_permalink($post->ID) . '">' . __('View Article', '<%= _.slugify(appMachineName) %>_') . '</a>';
}

//remove Admin bar
function remove_admin_bar() {
    return false;
}

//remove 'text/css' from our enqueued stylesheet
function <%= _.slugify(appMachineName) %>_style_remove($tag) {
    return preg_replace('~\s+type=["\'][^"\']++["\']~', '', $tag);
}

//remove thumbnail width and height dimensions that prevent fluid images in the_thumbnail
function remove_thumbnail_dimensions( $html ) {
    $html = preg_replace('/(width|height)=\"\d*\"\s/', "", $html);
    return $html;
}

//custom Gravatar in Settings > Discussion
function <%= _.slugify(appMachineName) %>_gravatar ($avatar_defaults) {
    $myavatar = get_template_directory_uri() . '/img/gravatar.jpg';
    $avatar_defaults[$myavatar] = "Custom Gravatar";
    return $avatar_defaults;
}

//threaded Comments
function enable_threaded_comments() {
    if (!is_admin()) {
        if (is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
            wp_enqueue_script('comment-reply');
        }
    }
}

//custom Comments Callback
function <%= _.slugify(appMachineName) %>_comments($comment, $args, $depth) {
	$GLOBALS['comment'] = $comment;
	extract($args, EXTR_SKIP);

	if ( 'div' == $args['style'] ) {
		$tag = 'div';
		$add_below = 'comment';
	} else {
		$tag = 'li';
		$add_below = 'div-comment';
	}
?>
    <!-- heads up: starting < for the html tag (li or div) in the next line: -->
    <<?php echo $tag ?> <?php comment_class(empty( $args['has_children'] ) ? '' : 'parent') ?> id="comment-<?php comment_ID() ?>">
	<?php if ( 'div' != $args['style'] ) : ?>
	<div id="div-comment-<?php comment_ID() ?>" class="comment-body">
	<?php endif; ?>
	<div class="comment-author vcard">
	<?php if ($args['avatar_size'] != 0) echo get_avatar( $comment, $args['180'] ); ?>
	<?php printf(__('<cite class="fn">%s</cite> <span class="says">says:</span>'), get_comment_author_link()) ?>
	</div>
<?php if ($comment->comment_approved == '0') : ?>
	<em class="comment-awaiting-moderation"><?php _e('Your comment is awaiting moderation.') ?></em>
	<br />
<?php endif; ?>

	<div class="comment-meta commentmetadata"><a href="<?php echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ) ?>">
		<?php
			printf( __('%1$s at %2$s'), get_comment_date(),  get_comment_time()) ?></a><?php edit_comment_link(__('(Edit)'),'  ','' );
		?>
	</div>

	<?php comment_text() ?>

	<div class="reply">
	<?php comment_reply_link(array_merge( $args, array('add_below' => $add_below, 'depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
	</div>
	<?php if ( 'div' != $args['style'] ) : ?>
	</div>
	<?php endif; ?>
<?php }
