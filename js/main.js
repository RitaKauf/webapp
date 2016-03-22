
var views = ["#quick-reports", "#fmy-folders", "#my-team-folders", "#public-folders"];

function OnPageLoad(){

    document.location.hash = '#quick-reports';
    UTILS.addEvent(window, "hashchange", ChangeTab);
    UTILS.addEvent(window, "keypress", ChangeTabKeypress);

    //UTILS.ajax('data/config.json',{done: notificationUpdate});// doesn't work, chrome blocks Cross origin requests 

}

/*function notificationUpdate(){

}*/

function ChangeTab(){
    document.querySelector(".chosen-tab").className = "tabs-lis";
    var currentLoc = document.location.hash;
    document.querySelector('.tabs-ul li a[href="'+currentLoc+'"]').parentNode.className += " chosen-tab";
    for(var i=0; i< this.views.length; i++)
    {
        if(currentLoc != views[i])
            Select(this.views[i]).style.display = "none";
        else
             Select(this.views[i]).style.display = "inline-block";
    }

    //refocus on the navigation tab
    document.querySelector(".chosen-tab").focus();
    
}


/*goes to the next navigation tab using the keyboard - space
*/
function ChangeTabKeypress(){
    var currentLoc = document.location.hash;
    var nextLoc;
    var keyup;
    
    //space was pressed
    if(event.keyCode ==32)
        for(var i=0; i<views.length; i++)
        {
            if(currentLoc == views[i])
                if(i!=views.length-1)
                    nextLoc = views[i+1];
                else
                    nextLoc = views[0];
        }
        document.location.hash = nextLoc;
}

function Select(query){
    return document.querySelector(query);
}

