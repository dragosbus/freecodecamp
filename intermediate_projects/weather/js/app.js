const App = (function() {
    
    const getTime = () =>{
        let today = new Date(),
            day = today.getDay(),
            hour = today.getHours(),
            minute = today.getMinutes(),
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'],
            dayNow = today.getDay(),
            dateDOM;

        if (minute < 10) {
            dateDOM = days[dayNow] + ' ' + hour + ':0' + minute;
        } else {
            dateDOM = days[dayNow] + ' ' + hour + ':' + minute;
        }
        
        return dateDOM;
    };
    
}());