
var views = ["#quick-reports", "#fmy-folders", "#my-team-folders", "#public-folders"];
var formVisible;

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


/*initialization functions*/

function SetData(){
    var rightTab = SetTab(storageData.lastTab);
    document.location.hash = rightTab;
}

function AddEventsOnStart(){
    UTILS.addEvent(window, "hashchange", ChangeTab);
    UTILS.addEvent(window, "keypress", ChangeTabKeypress);
    UTILS.addEvent(Select(".open-close-form"), "click", OpenCloseForm);
    UTILS.addEvent(Select(".cancel"), "click", CloseForm);
    UTILS.addEvent(Select(".save"), "click", saveForm);
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

    if((theRightTab == views[0] || theRightTab == views[2] )){
        formVisible = true;
        Select(".sites-form").style.display = "block";
    }
    else
        formVisible = false;

    return theRightTab;
}


/*Events related functions*/

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

function CloseForm(){
    Select(".sites-form").style.display = "none";
    formVisible = false;
}

function ChangeTab(){
    var currentLoc = document.location.hash;
    SetTab(currentLoc);

    //refocus on the navigation tab
    document.querySelector(".chosen-tab").focus();
    
}

function saveForm(){
    if(ValidateForm())
    {

    }
    
}

function ValidateForm(){
    var valid = true;
    if(Select("#report1name").value !='' && Select("#report1url").value ==''){
        Select("#report1url").style.borderColor = "red";
        valid =  false;
    }
    if(Select("#report1name").value =='' && Select("#report1url").value !=''){
        Select("#report1name").style.borderColor = "red";
        valid = false;
    }

    if(Select("#report2name").value !='' && Select("#report2url").value ==''){
        Select("#report2url").style.borderColor = "red";
        valid = false;
    }
    if(Select("#report2name").value =='' && Select("#report2url").value !=''){
        Select("#report2name").style.borderColor = "red";
        valid = false;
    }

    if(Select("#report3name").value !='' && Select("#report3url").value ==''){
        Select("#report3url").style.borderColor = "red";
        valid = false;
    }
    if(Select("#report3name").value =='' && Select("#report3url").value !=''){
        Select("#report3name").style.borderColor = "red";
        valid = false;
    }
         
    return valid;
}

/*goes to the next navigation tab using the keyboard - space
*/
function ChangeTabKeypress(){
    var currentLoc = document.location.hash;
    var nextLoc;
    var keyup;
    
    //space was pressed
    if(event.keyCode ==32){
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
}


/*functional aid function*/
function Select(query){
    return document.querySelector(query);
}

