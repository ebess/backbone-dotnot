(function(_, Backbone) {
    _.extend(Backbone.Model.prototype, {
        get: function(key) {
        	var self = this;
            return _.reduce(key.split('.'), function(attr, key) {

                // if attribute not set
                if (_.isEmpty(attr)) {
                    return undefined;
                }

	            // get parent
	            if (key == '$' && attr.parent) {
	            	return attr.parent;
	            }

	            // other model
                if (attr instanceof Backbone.Model) {
                    return attr.attributes[key];
                }

                // collection
                if (attr instanceof Backbone.Collection) {
                    
                    // index number
                    if (key.match(/\[([0-9]+)\]/)) {
                        var index = key.substr(1, key.length-2);
                        return attr.at(index);
                    }

                    return attr[key];
                }

                // regular attribute
                return attr[key];
                
            }, this.attributes);
        }
    });
})(window._, window.Backbone);
