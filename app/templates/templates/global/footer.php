<footer class="footer" role="contentinfo">
	<div class="footer__inner">
		<nav class="footer-nav" role="navigation">
			<?php <%= _.slugify(appMachineName) %>_footernav(); ?>
		</nav>
		<p class="footer__copyright">
			&copy; <?php echo date('Y'); ?> Copyright <?php bloginfo('name'); ?>.
		</p>
	</div>
</footer>