
var views = ["#quick-reports", "#fmy-folders", "#my-team-folders", "#public-folders"];
var formVisible = true;

var storageData ;

function OnPageLoad(){

    document.location.hash = '#quick-reports';
    
    AddEventsOnStart();

    storageData = JSON.parse(localStorage.getItem("storageData"));
    if(storageData==null)
        storageData = {"lastTab" : "#quick-reports", "reports":[{"":""}]};

    SetData();

    //UTILS.ajax('data/config.json',{done: notificationUpdate});// doesn't work, chrome blocks Cross origin requests 

}

/*function notificationUpdate(){

}*/

function SetData(){
    var rightTab = SetTab(storageData.lastTab);
    document.location.hash = rightTab;
}

function SetTab(theRightTab){
    document.querySelector(".chosen-tab").className = "tabs-lis";//cleaning the last chosen tab
    document.querySelector('.tabs-ul li a[href="'+theRightTab+'"]').parentNode.className += " chosen-tab";
    for(var i=0; i< this.views.length; i++)
    {
        if(theRightTab != views[i]){
            Select(this.views[i]).style.display = "none";
        }
        else{
             Select(this.views[i]).style.display = "block";
             storageData.lastTab = views[i];
             localStorage.setItem("storageData", JSON.stringify(storageData));
         }
    }
    return theRightTab;
}

function AddEventsOnStart(){
    UTILS.addEvent(window, "hashchange", ChangeTab);
    UTILS.addEvent(window, "keypress", ChangeTabKeypress);
    UTILS.addEvent(document.querySelector(".open-close-form"), "click", OpenCloseForm);
}
function OpenCloseForm(){
    if(formVisible){
        Select(".sites-form").style.display = "none";
        formVisible = false;
    }
    else {
        Select(".sites-form").style.display = "block";
        formVisible = true;
    }
}

function ChangeTab(){
    var currentLoc = document.location.hash;
    SetTab(currentLoc);

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

