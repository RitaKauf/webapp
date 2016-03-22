
var views = ["#quick-reports", "#fmy-folders", "#my-team-folders", "#public-folders"];

function OnPageLoad(){
    document.location.hash = '#quick-reports';
    UTILS.addEvent(window, "hashchange", changeTab);
}

function changeTab(){
    document.querySelector(".chosen-tab").className = "tabs-lis";
    var currentLoc = document.location.hash;
    document.querySelector('.tabs-ul li a[href="'+currentLoc+'"]').parentNode.className += " chosen-tab";
    for(var i=0; i< this.views.length; i++)
    {
        if(currentLoc != views[i])
            select(this.views[i]).style.display = "none";
        else
             select(this.views[i]).style.display = "inline-block";
        
    }
    
}

function select(query){
    return document.querySelector(query);
}