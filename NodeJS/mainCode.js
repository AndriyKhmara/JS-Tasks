/**
 * Created by Andriy.Khmara on 14.06.2016.
 */
var studentsArr = ['Andriy', 'Oleksandr', 'Vasya', 'Petro', 'Margarita', 'Luda', 'Nastya', 'Vera', 'Oksana', 'Vova'];
var subjectArr = ['Mathematics', 'Philosophy', 'Ukraine language', 'Physical Culture', 'Physics'];
var dataArr = [], newStudentsNames = [];
dataArr.push({
    name: "test",
    group: 1,
    subject: "Math",
    rating: 5
});
//Рандомизатор оценок
function randomRating (){
    var random = Math.random();
    if (random < 0.02) {
        return "Пропуск";
    } else if (random < 0.07) {
        return 2;
    } else if (random < 0.2) {
        return 3;
    } else if (random < 0.7)  {
        return 4;
    } else {
        return 5;
    }
}
//Заполняем масив данными
for (var i = 1; i <= 3; i++ ){ 							//количество груп
    for (var j = 0; j < 10; j++){						//количество студентов
        var studentName = studentsArr[j] + "_" + i;
        newStudentsNames.push(studentName);
        for (var k = 0; k < subjectArr.length; k++) {	//количество предметов
            for (var l = 0; l < 10; l++) {				//количество оценок
                dataArr.push({
                    name: studentName,
                    group: i,
                    subject: subjectArr[k],
                    rating: randomRating()
                });
            }
        }
    }
}
var myStudents = (function () {
    var searchByStudentName = function(name) {
        var foundNames = [];
        for (var i = 0; i < dataArr.length; i++) {
            if (name == dataArr[i].name) {
                foundNames.push(dataArr[i]);
            }
        }
        return foundNames;
    }
    return {
        searchByStudentName : searchByStudentName
    }
}) ();
function search (){
    var studentName = $("#studentName").val();
    var foundConcat = [];
    var t = "<tr>" + "<td>" + "<b>Name of student</b>" + "</td>" + "<td>" + "<b>Number of group</b>" + "</td>"+ "<td>" + "<b>Subject</b>" + "</td>"+ "<td>" + "<b>Rating</b>" + "</td>" + "</tr>";
    foundConcat = myStudents.searchByStudentName(studentName);

    for (var i = 0; i < foundConcat.length; i++) {
        t += "<tr>" + "<td>" + foundConcat[i].name + "</td>" + "<td>" +  foundConcat[i].group + "</td>" + "<td>" + foundConcat[i].subject +"</td>" + "<td>" + foundConcat[i].rating + "</td>" + "</tr>";
    }
    var testResult = true, triger = 0;
    if (studentName == "test") {
        for (var i = 0; i < foundConcat.length; i++) {
            triger = 1;
            if (foundConcat[i].name == "test") {
                console.log("Name coincide");
            } else {
                testResult = false;
                console.log("Test failed, data not coincide");
            }
            if (foundConcat[i].group == 1){
                console.log("Group coincide");
            } else {
                testResult = false;
                console.log("Test failed, data not coincide");
            }
            if (foundConcat[i].subject == "Math"){
                console.log("Subject coincide");
            } else {
                testResult = false;
                console.log("Test failed, data not coincide");
            }
            if (foundConcat[i].rating == 5){
                console.log("Rating coincide");
                console.log("Test success, all data coincide");
            } else {
                testResult = false;
                console.log("Test failed, data not coincide");
            }
        }
    } else {
        $("table.foundTable").html(t);
    }
    if (testResult == false) {
        alert('Search result is incorect!, see details in the console log');
    } else if (triger == 1) {
        alert('Search result is correct, see details in the console log')
    }

}
function searchStudents (){
    var studensList = [];
    var sL = "<tr>" + "<td>" + "<b>Name of student</b>" + "</td>" + "<td>" + "<b>Number of group</b>" + "</td>" + "</tr>";
    for (var i = 0; i < newStudentsNames.length; i++) {
        for (var j = 0; j < dataArr.length; j++) {
            if (newStudentsNames[i] == dataArr[j].name) {
                studensList.push({
                    name: 	dataArr[j].name,
                    group: 	dataArr[j].group
                });
                break;
            }
        }
    }
    console.log(studensList.length);
    for (var i = 0; i < studensList.length; i++) {
        sL += "<tr>" + "<td>" + studensList[i].name + "</td>" + "<td>" +  studensList[i].group + "</td>" + "</tr>";
    }
    $("table.foundStudentsTable").html(sL);
}
function globalStatistic(){
    var countStudents = newStudentsNames.length;
    var sum = 0;
    var count = 0;
    var gS = "<h3>" + "Общая статистика" + "</h3>";

    for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i].rating != "Пропуск") {
            sum += dataArr[i].rating;
            count += 1;
        }

    }
    sum = (sum / count).toFixed(2); //Середній бал по всім групам
    gS += "<p>" + "<b>Total count of the students: </b>" + countStudents + " <b>avg rating is: </b>" + sum + "</p>"
    gS += "<div class='row'>";
    for (var j = 1; j <= 3; j++) {
        gS += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='statisticTable'><tr><td>Number of group</td><td>Avg rating</td><td>Count of passes</td></tr>";
        count = 0;
        sum = 0;
        var sumOuts = 0, countRating = 0;
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].group == j) {
                if (dataArr[i].rating != "Пропуск"){
                    sum += dataArr[i].rating;
                    countRating++;
                } else {
                    sumOuts++;
                }

            }
        }
        sum = (sum / countRating).toFixed(2);
        gS += "<tr><td>" + j + "</td><td>" + sum + "</td><td>" + sumOuts + "</td></tr></table></div>";
    }
    gS += "</div>";

    $("div.groupStatistic").html(gS);
}
$(document).ready(function() {
    $("table.foundStudentsTable").hide();
    $("a.click").click(function(){
        searchStudents();
        $(this).parent().find("table.foundStudentsTable").slideToggle();
    });
});
$(document).ready(function() {
    $("table.foundTable").hide();
    $("a.clickFN").click(function(){
        search();
        $(this).parent().find("table.foundTable").slideToggle();
    });
});
$(document).ready(function() {
    $("div.groupStatistic").hide();
    $("a.clickS").click(function(){
        globalStatistic();
        $(this).parent().find("div.groupStatistic").slideToggle();
    });
});
