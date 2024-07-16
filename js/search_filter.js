window.Vnb || (window.Vnb = {})

Vnb.SearchOperators = {
    OR: "OR",
    AND: "AND",
    NOT: "NOT"
}

Vnb.SearchField = function () {
    function SearchField (name) {
        this.name = name;
        this.values = [];
    }

    SearchField.prototype.addValue = function (value, operator) {
        this.values.push({ value: value, operator: operator });
    }
    SearchField.prototype.deleteValue = function (value, operator) {
        var index = -1;

        for (var i = 0; i < this.values.length; i++) {
            if(this.values[i].value === value && this.values[i].operator === operator)
                index = i;
        }

        this.values.splice(index, 1);

    }

    SearchField.prototype.deleteValuedqdt = function (value, operator) {
        var index = -1;

        for (var i = 0; i < this.values.length; i++) {
            if(this.values[i].value === value && this.values[i].operator === operator)
                index = i;
        }
        //console.log(index);
        if(index > -1){
            this.values.splice(index, 1);
            //console.log(this);
            alert('ok');
        }

    }

    SearchField.prototype.buildParam = function () {
        var value = "";

        for (var i = 0; i < this.values.length; i++) {
            if (i == 0) {
                value += this.values[i].value;
            }
            else{
                value += this._buildValue(this.values[i]);
            }
        }

        //if (this.values.length > 1) {
        //	value = value;
        //}

        if(value !== "")
            return this.name + "=" + value

        return null;
    }
    SearchField.prototype._buildValue = function (value) {
        switch (value.operator.toUpperCase()){
            case Vnb.SearchOperators.OR:
                return "," + value.value;
            case Vnb.SearchOperators.AND:
                return "_" + value.value;
            case Vnb.SearchOperators.NOT:
                return "!" + value.value;
            default:
                return " " + value.value;
        }
    }

    SearchField.name = "SearchField";
    return SearchField;
}();

Vnb.SearchFilter = function () {
    function SearchFilter (){
        this.fields = {};
    }

    SearchFilter.prototype.addValue = function (group, field, value, operator) {
        var searchField = this.findOrCreateField(group, field);

        return searchField.addValue(value, operator);
    }

    SearchFilter.prototype.findOrCreateField = function (group, field) {
        var searchField = this.fields[group];
        if(!searchField) {
            searchField = new Vnb.SearchField(field);
            this.fields[group] = searchField;
        }

        return searchField;
    }

    SearchFilter.prototype.deleteValue = function (group, field, value, operator) {
        var searchField = this.findOrCreateField(group, field);

        return searchField.deleteValue(value, operator);
    }

    SearchFilter.prototype.deleteValuedqdt = function (group, field, value, operator) {
        var searchField = this.findOrCreateField('Khoáº£ng giÃ¡', 'price_min');

        return searchField.deleteValue(value, 'OR');
    }


    SearchFilter.prototype.deleteGroup = function (group) {
        delete this.fields[group];
    }

    SearchFilter.prototype.search = function (settings) {
        if(!settings)
            settings = {};

        var url = this.buildSearchUrl(settings);

        if(settings.success)
            this._search(this_url+"?"+url, settings.success);
    }

    SearchFilter.prototype.buildSearchUrl = function (settings) {
        if (!settings)
            settings = {};

        var url = this._buildSearchUrl();
        if (settings.view)
            url += "&view=" + settings.view;
        if (settings.page > 1)
            url += "&page=" + settings.page;
        if (settings.sortby)
            url += "&sortby=" + settings.sortby;

        return url;
    }

    SearchFilter.prototype._buildSearchUrl = function () {
        var url = "";
        var params = "";
        for (group in this.fields) {
            var param = this.fields[group].buildParam();
            if (param)
            {
                if (params) params +="&";

                params += param;
            }
        }
        url=params;

        return url;
    }

    SearchFilter.prototype._search = function (url, callback) {
        var n = url.indexOf("url");

        $.ajax({
            url: url,
            data:{is_ajax:1},
            dataType: 'html',
            success: function (html) {

                if(callback)
                    callback(html);
            }
        });
    }

    SearchFilter.containsOperator = function (value) {
        if(value.indexOf(Vnb.SearchOperators.OR) > 0)
            return true;

        if(value.indexOf(Vnb.SearchOperators.AND) > 0)
            return true;

        return false;
    }

    SearchFilter.name = "SearchFilter"
    return SearchFilter;
}();
