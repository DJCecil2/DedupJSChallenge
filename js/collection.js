"use strict";

var Collection = function(source) {
    this.collection = {};

    this.add = function(lead) {
        // By using the ID as a key, the latest ID will take its place.
        this.collection[lead._id] = new Lead(lead);
        return this;
    };

    this.delete = function(leadID) {
        var lead = this.fetch(leadID);

        // Only delete if it exists
        if(lead) {
            console.log('Deleting record "'+leadID+'". Goodbye, '+lead['firstName']+' '+lead['lastName']+'. :(');
            delete this.collection[leadID];
        }
    };

    this.dedup = function() {
        var collection = this;
        var duplicates = _.groupBy(this.collection, 'email');

        for(var group in duplicates) {
            if(duplicates.hasOwnProperty(group) && duplicates[group].length > 1) {
                var group = duplicates[group];

                while(group.length != 1) {
                    var thisLead = group[0];
                    var thatLead = group[1];

                    if (thisLead.isOlderThan(thatLead) || thisLead.isTheSameAgeAs(thatLead)) {
                        group.splice(0, 1);
                        collection.delete(thisLead._id);
                    } else {
                        group.splice(1, 1);
                        collection.delete(thatLead._id);
                    }
                }
            };
        }
    };

    this.fetch = function(leadID) {
        return this.collection[leadID]
    };

    this.sort = function() {
        this.collection = _.sortBy(this.collection, 'entryDate');
    };

    this.render = function() {
        var htmlSrc = $('#template').html();
        var template = Handlebars.compile(htmlSrc);

        $('#container').html(template({leads: this.collection}));
    };

    this.init(source.leads);
};

Collection.prototype.init = function(leads) {
    var collection = this;

    leads.forEach(function(lead) {
        collection.add(lead);
    });
};