"use strict";

(function($) {

    $(document).ready(function() {
        // source is defined in leads.json
        console.log(Object.keys(source.leads).length.toString() + ' in the original source.');

        // Instantiate the leads collection
        var leads = new Collection(source);
        console.log(Object.keys(leads.collection).length.toString() + ' by de-duping IDs.');

        leads.dedup();
        console.log(Object.keys(leads.collection).length.toString() + ' by de-duping emails.');

        // Sort and render
        leads.sort();
        leads.render();
    });

})(jQuery);