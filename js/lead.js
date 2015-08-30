"use strict";

var Lead = function(lead) {
    this.isOlderThan = function(otherLead) {
        return moment(this.entryDate).isBefore(otherLead.entryDate);
    };

    this.isTheSameAgeAs = function(otherLead) {
        return moment(this.entryDate).isSame(otherLead.entryDate)
    };

    this.init(lead);
};

Lead.prototype.init = function(lead) {
    var object = this;

    for(var property in lead) {
        if(lead.hasOwnProperty(property)) {
            object[property] = lead[property];
        }
    }
};