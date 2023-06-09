function each_class (e){

    const px_rm = _ => {
        if ( !_.endsWith("px") && !_.endsWith("rem") && !_.endsWith("em") && !_.endsWith("%") ) _ += "px";
        return _;
    }
    const family = _ => {
        _ = _.split("-").slice(1);
        if ( _.length > 1 ) return _.join("-");
        _ = _[0];
        let font = "";
        if ( _.includes("_")) {
            _.split("_").forEach(c => { font += `${c} `; });
            font = font.slice(0, -1);
        }
        else font = _;
        return font;
    }
    const assignValue = (el, property, value) => {
        if(typeof property == "string") $(el).css({[property]: value}) 
        else 
        for(let i=0; i<property.length; i++) $(el).css({[property[i]]: value[i]});
    }
    const set_css = (classes, el) => {
        let styles = getComputedStyle(document.documentElement);
        classes.split(" ").forEach( _ => {
            if ( _.startsWith("pl-") ) assignValue(el, "padding-left", px_rm(_.split("-")[1]));
            if ( _.startsWith("pr-") ) assignValue(el, "padding-right", px_rm(_.split("-")[1]));
            if ( _.startsWith("plr-") ) assignValue(el, ["padding-left", "padding-right"], [px_rm(_.split("-")[1]), px_rm(_.split("-")[1])]);
            if ( _.startsWith("prl-") ) assignValue(el, ["padding-left", "padding-right"], [px_rm(_.split("-")[1]), px_rm(_.split("-")[1])]);
            if ( _.startsWith("pt-") ) assignValue(el, "padding-top", px_rm(_.split("-")[1]));
            if ( _.startsWith("pb-") ) assignValue(el, "padding-bottom", px_rm(_.split("-")[1]));
            if ( _.startsWith("ptb-") ) assignValue(el, ["padding-top", "padding-bottom"], [px_rm(_.split("-")[1]), px_rm(_.split("-")[1])]);
            if ( _.startsWith("pbt-") ) assignValue(el, ["padding-top", "padding-bottom"], [px_rm(_.split("-")[1]), px_rm(_.split("-")[1])]);
            if ( _.startsWith("p-") ) assignValue(el, "padding", px_rm(_.split("-")[1]));
            if ( _.startsWith("ml-") ) assignValue(el, "margin-left", px_rm(_.split("-")[1]));
            if ( _.startsWith("mr-") ) assignValue(el, "margin-right", px_rm(_.split("-")[1]));
            if ( _.startsWith("mlr-") ) assignValue(el, ["margin-left", "margin-right"], [px_rm(_.split("-")[1]), px_rm(_.split("-")[1])]);
            if ( _.startsWith("mrl-") ) assignValue(el, ["margin-left", "margin-right"], [px_rm(_.split("-")[1]), px_rm(_.split("-")[1])]);
            if ( _.startsWith("mt-") ) assignValue(el, "margin-top", px_rm(_.split("-")[1]));
            if ( _.startsWith("mb-") ) assignValue(el, "margin-bottom", px_rm(_.split("-")[1]));
            if ( _.startsWith("mtb-") ) assignValue(el, ["margin-top", "margin-bottom"], [px_rm(_.split("-")[1]), px_rm(_.split("-")[1])]);
            if ( _.startsWith("mbt-") ) assignValue(el, ["margin-top", "margin-bottom"], [px_rm(_.split("-")[1]), px_rm(_.split("-")[1])]);
            if ( _.startsWith("m-") ) assignValue(el, "margin", px_rm(_.split("-")[1]));
            if ( _.startsWith("w-") ) assignValue(el, "width", px_rm(_.split("-")[1]));
            if ( _.startsWith("maxw-") ) assignValue(el, "max-width", px_rm(_.split("-")[1]));
            if ( _.startsWith("minw-") ) assignValue(el, "min-width", px_rm(_.split("-")[1]));
            if ( _.startsWith("h-") ) assignValue(el, "height", px_rm(_.split("-")[1]));
            if ( _.startsWith("maxh-") ) assignValue(el, "max-height", px_rm(_.split("-")[1]));
            if ( _.startsWith("minh-") ) assignValue(el, "min-height", px_rm(_.split("-")[1]));
            if ( _.startsWith("size-") ) assignValue(el, "font-size", px_rm(_.split("-")[1]));
            if ( _.startsWith("line-") ) assignValue(el, "line-height", px_rm(_.split("-")[1]));
            if ( _.startsWith("family-") ) assignValue(el, "font-family", family(_));
            if ( _.startsWith("radius-") ) assignValue(el, "border-radius", px_rm(_.split("-")[1]));
            if ( _.startsWith("back-") ) assignValue(el, "background", _.split("-").length==2 ? _.split("-")[1] : styles.getPropertyValue(`--${_.split("-")[2]}`));
            if ( _.startsWith("color-") ) assignValue(el, "color", _.split("-").length==2 ? _.split("-")[1] : styles.getPropertyValue(`--${_.split("-")[2]}`));
            if ( _.startsWith("border-") ) assignValue(el, "border", _.split("-").length==2 ? `1px solid ${_.split("-")[1]}` : `1px solid ${styles.getPropertyValue(`--${_.split("-")[2]}`)}`);
            if ( _.startsWith("transition-") ) assignValue(el, "cursor", `all ${_.split("-")[1]} linear`);
            if ( _.startsWith("cursor-") ) assignValue(el, "cursor", px_rm(_.split("-")[1]));
            if ( _.startsWith("z-") ) assignValue(el, "z-index", px_rm(_.split("-")[1]));
            if ( _.startsWith("display-") ) assignValue(el, "display", px_rm(_.split("-")[1]));
            if ( _.startsWith("backdropFilter-") ) assignValue(el, "backdrop-filter", px_rm(_.split("-")[1]));
        });

    }
    
    let data_child = $(e).data("child");
    let classes = $(e).attr("class");

    if ( data_child ) {
        $(e).children().each(function(){
            set_css(data_child, this);
        });
    }
    if ( classes ) {
        set_css(classes, e);
    }
    
}
function print(..._){ 
    
    console.log(..._);

}
function check_hidden(_){ 
    
    return $(_).css("display") == "none";

}
function check_class(el, class_name, check_parent=true) {

    return check_parent ? $(el).hasClass(class_name) ||
        $(el).parents(`.${class_name}`).length : $(el).hasClass(class_name);

}
function position(element, query){

    if (query == "top") return $(element).offset().top;

    if (query == "bottom") return $(window).height() - $(element).offset().top;

    if (query == "left") return $(element).offset().left;

    else if (query == "right") return $(window).width() - $(element).offset().left;

    else return [$(element).offset().top, $(element).offset().left];

}
function get_cookie(name) {

    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
        
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {

            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + "=")) {

                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;

            }

        }

    }

    return cookieValue;

}
function get_date(required_name=""){
        
    var date = new Date();
    let Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let Mon_name = Months[date.getMonth()]
    let Day_name = Days[date.getDay()];
    let Weak_day = date.getDay();

    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let days = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let am_pm = "";
    if (hours > 12) { am_pm = "PM"}
    else am_pm = "AM";
    if (hours == 0) hours = 12;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    required_name = required_name.toLowerCase();

    if (required_name == "year") return years;
    else if (required_name == "month") return months;
    else if (required_name == "day")  return days;
    else if (required_name == "month_list") return Months;
    else if (required_name == "day_list") return Days;
    else if (required_name == "weekday") return date.getDay();
    else if (required_name == "hour") return hours;
    else if (required_name == "minute") return minutes;
    else if (required_name == "second") return seconds;
    else if (required_name == "dayname") return Day_name;
    else if (required_name == "monthname") return Mon_name;
    else if (required_name == "weekday") return Weak_day;
    else if (required_name == "p") return am_pm;
    else if (required_name == "date") return `${years}-${months}-${days}`;
    else if (required_name == "time") return `${hours}:${minutes}:${seconds}`;
    else if ( ! required_name || required_name == "full" ) 
        return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;
    else return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;

}
function query( query ){

    const urlSearchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params[query] ? params[query] : "";

}
function full_screen(){

    document.fullScreenElement && null !== document.fullScreenElement ||
    !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ?
    document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ?
    document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen
    && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ?
    document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() :
    document.webkitCancelFullScreen && document.webkitCancelFullScreen()

}
function main () {

    $("*").each(function(){ each_class(this); });

}

main();