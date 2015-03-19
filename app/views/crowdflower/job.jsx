<!-- Crowdflower Job -->
<!--
This is the CML for the Crowdflower job that should be used to interact with this experiment.
-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript">
$.noConflict();
jQuery(document).ready(function($){

    jQuery.ajax('https://hcilab.csit.upei.ca:8998/example/')
        .done(function(data){
            jQuery("#upei-content").html(data);
        })
        .fail(function(){
            // Do something drastic.
            console.log('fail')
        });

});
</script>

<div id="upei-content"></div>

<cml:text label="Text" class="" validates="required"/>