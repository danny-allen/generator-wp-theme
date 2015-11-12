			<!-- footer -->
			<footer class="footer" role="contentinfo">

				<!-- copyright -->
				<p class="copyright">
					&copy; <?php echo date('Y'); ?> Copyright <?php bloginfo('name'); ?>. <?php _e('Powered by', '<%= _.slugify(appMachineName) %>'); ?>
					<a href="//wordpress.org" title="WordPress">WordPress</a> &amp; <a href="//cddnation.com" title="<%= _.slugify(appName) %>"><%= _.slugify(appName) %></a>.
				</p>
				<!-- /copyright -->

			</footer>
			<!-- /footer -->

		</div>
		<!-- /wrapper -->

		<?php wp_footer(); ?>

		<!-- analytics -->
		<script>
		(function(f,i,r,e,s,h,l){i['GoogleAnalyticsObject']=s;f[s]=f[s]||function(){
		(f[s].q=f[s].q||[]).push(arguments)},f[s].l=1*new Date();h=i.createElement(r),
		l=i.getElementsByTagName(r)[0];h.async=1;h.src=e;l.parentNode.insertBefore(h,l)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-XXXXXXXX-XX', 'yourdomain.com');
		ga('send', 'pageview');
		</script>



	    <!-- build:js /scripts/vendor.js -->
	    <!-- bower:js -->
	    <!-- endbower -->
	    <!-- endbuild -->

	    <!-- build:js /scripts/main.js -->
	     
	    <script src="scripts/myApp.js"></script>
	    <script src="scripts/modules/moduleA.js"></script>
	    <script src="scripts/modules/moduleB.js"></script>
	    <script src="scripts/main.js"></script> 
	     
	    <!-- endbuild -->
	</body>
</html>
