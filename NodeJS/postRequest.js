/**
 * Created by ASU on 15.06.2016.
 */
var studensModule = require('./mainCodePost');

module.exports = (function() {

    var getPage = function (params) {
        return '<html>' + getPageHead() +
            '<body>' +
            getPageHeader() +
            getMain(params) +
            getPageFooter() +
            '</body></html>';
    };

    var getPageHead = function () {
        return '<head><title>Students</title></head>';
    };

    var getPageHeader = function () {
        return '<header></header>';
    };

    var getPageFooter = function () {
        return '<footer></footer>';
    };

    var getMain = function (params) {
        return '<main><h1>Students</h1>' +
            getSearchForm() +
            getAllKeysTable(params) +
            '</main>';
    };
    var getSearchForm = function () {
        return '<h2>Search by student name</h2>' + 
        '<form method="POST"><label>Enter name: </label><input type="text" name="student_name"/><input type="submit"/></form>';
    };
    
    var getViewData = function (params) {
        if (!params) {
            return studensModule.getAll();
        }
        if (params.student_name) {
            return studensModule.searchByStudentName(params.student_name);
        }
    }
    var getAllKeysTable = function (params) {
        var data = getViewData(params);
        if (!data.length) {
            return 'Nothing found';
        }
        var result = "<tr><td>Student Name</td><td>Group</td><td>Subject</td><td>Rating</td></tr>";
        for(var i = 0; i < data.length; ++i) {
            result += "<tr>" +
                "<td>" + data[i].name + "</td>" +
                "<td>" + data[i].group + "</td>" +
                "<td>" + data[i].subject + "</td>" +
                "<td>" + data[i].rating + "</td>" +                
                "</tr>";
        }
        return '<table border="1">' + result + '</table>';
    };

    return {
        getPage: getPage
    };
})();