import './front.scss';

jQuery(document).ready(function ($) {
    jQuery('.js-surveyhero-embed').each(function () {
        jQuery.getScript($(this).data('script'));
    });
});