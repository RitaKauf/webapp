
var views = ["#quick-reports", "#fmy-folders", "#my-team-folders", "#public-folders"];
var formVisible;

var storageData ;

function OnPageLoad(){

    document.location.hash = '#quick-reports';
    
    AddEventsOnStart();

    storageData = JSON.parse(localStorage.getItem("storageData"));
    if(storageData==null)
        storageData = {"lastTab" : "#quick-reports", "reports":[{"name":"", "url":""}, {"name": "", "url":""}, {"name": "", "url":""}]};

    SetData();
    SetReports();

    //UTILS.ajax('data/config.json',{done: notificationUpdate});// doesn't work, chrome blocks Cross origin requests 

}

/*function notificationUpdate(){

}*/


/*initialization functions*/


function SetReports(){
    if(storageData.reports[0] != null && storageData.reports[0].name!= "")
    {
        Select("#report1name").value = storageData.reports[0].name;
        Select("#report1url").value = storageData.reports[0].url;
    }

    if(storageData.reports[1] != null && storageData.reports[1].name!= "")
    {
        Select("#report2name").value = storageData.reports[1].name;
        Select("#report2url").value = storageData.reports[1].url;
    }

    if(storageData.reports[2] != null && storageData.reports[2].name!= "")
    {
        Select("#report3name").value = storageData.reports[2].name;
        Select("#report3url").value = storageData.reports[2].url;
    }
}


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
    UTILS.addEvent(Select(".open-link-new-window") ,"click",OpenInNewWindow);
    UTILS.addEvent(Select("#open-link1") ,"click",OpenInNewWindow1);
    UTILS.addEvent(Select("#open-link2") ,"click",OpenInNewWindow2);
    UTILS.addEvent(Select("#toolbar1 select"), "change", changeFrame);
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

    function saveForm(){
        var last;
        if(ValidateForm())
    {//saving the reports
        storageData.reports.length=0;//clearing the array
        if(Select("#report1name").value != ''){
            storageData['reports'].push({"name":Select("#report1name").value,"url": Select("#report1url").value});
            last =0;
        }

        if(Select("#report2name").value != ''){
            storageData['reports'].push({"name":Select("#report2name").value,"url": Select("#report2url").value});
            last =1;
        }

        if(Select("#report3name").value != ''){
            storageData['reports'].push({"name":Select("#report3name").value,"url": Select("#report3url").value});
            last =2;
        }

        localStorage.setItem("storageData", JSON.stringify(storageData));
        newIFrame(storageData.reports[last].name);
        CloseForm();
    }

    FillDropDown();
    
    
}

function FillDropDown(){
    
    var selectDropdown = Select("#toolbar1 select");
    selectDropdown.innerHTML= "";
    for(var i=0; i<storageData.reports.length; i++){
        var Option = document.createElement("option");
        Option.text = storageData.reports[i].name;
        Option.value = storageData.reports[i].url;
        selectDropdown.add(Option); 
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

function newIFrame (siteName)
{
    var url;
    for(var i=0; i<storageData.reports.length; i++){
        if(storageData.reports[i].name == siteName)
            url = storageData.reports[i].url;
    }
    Select("#quick-reports iframe").setAttribute('src',url);
}

function OpenInNewWindow ()
{
    var urlOfFrame = Select(".chosen-div iframe").getAttribute('src');
    window.open(urlOfFrame,'_blank');
}

function OpenInNewWindow1(){
    var urlOfFrame = Select("#fmy-folders iframe").getAttribute('src');
    window.open(urlOfFrame,'_blank');
}

function OpenInNewWindow2(){
    var urlOfFrame = Select("#public-folders iframe").getAttribute('src');
    window.open(urlOfFrame,'_blank');
}

function changeFrame(){
    
    var select = Select("#toolbar1 select");
    var url = select.options[select.selectedIndex].value;
    Select("#quick-reports iframe").setAttribute('src',url);
}


/*functional aid function*/
function Select(query){
    return document.querySelector(query);
}

