function getFormattedDate(datetime) {
    // changing the date format to readable form DD/MM/YYYY hh/mm AM/PM
    var createdDate = new Date(datetime);

    var day = createdDate.getDate();
    var month = createdDate.getMonth() + 1; //months are zero based
    var year = createdDate.getFullYear();

    var time = createdDate.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
    return day + "/" + month + "/" + year + " " + time;
}

export {
    getFormattedDate
};