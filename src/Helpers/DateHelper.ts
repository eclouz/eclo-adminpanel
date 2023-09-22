export function formatDate(date: Date): string {
    var date: Date = new Date(date.toString());

    let year = date.getFullYear();
    let month = date.getMonth().toString();
    if(month.length == 1) month = "0"+month;
    let day = date.getDay().toString();
    if(day.length == 1) day = "0"+day;

    let hours = date.getHours().toString();
    if(hours.length==1) hours = "0"+hours;
    let minutes = date.getMinutes().toString();
    if(minutes.length == 1) minutes = "0"+minutes;
    return day+"."+month+"."+year+' '+hours+':'+minutes;
}