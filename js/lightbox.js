/*
 * Description : Contains all functions regarding the three lightbox and the mini Info box
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/

var timeoutId;

//Display a lightbox with the content of the hovered event
function displayLightbox(eventData){
    $('#lightboxOverlay').show();

    //add the lightbox and its element
    $('#lightboxOverlay').append('<div id="lightbox"></div>'); //I don't append it to the overlay so the opacity doesn't affect it
    
    //displaLightbox is call by different functions, once with element and once directly with the id
    if(typeof eventData.data !== 'undefined')
        idEvent = eventData.data.idEvent;
    else
        idEvent = eventData;

    $.ajax({
        url : './functions/interlocutor/getSession.php', 
        dataType : 'text',
        async: false, //otherwise the line won't re-appear in the right order
        success: function(isAdmin){
            if(isAdmin){
                $('#lightbox').append('<button type="button" id="supp" onclick="deleteEvent(' + idEvent.split('t')[1] + ')">Supprimer</button>');
                $('#lightbox').append('<button type="button" id="modify" onclick="startUpdate()">Modifier</button>');
            }
        }
    });

    var event = eventList[idEvent];
    $("#lightbox").addClass('event' + event.idEvent);
    $('#lightbox').append('<h1>' + event.title + '</h1>');

    var dates = treatEventDate(event.startingDay, event.startingMonth, event.startingYear, event.endingDay, event.endingMonth, event.endingYear)

    //if the two dates are the same, only the first one will be shown
    //otherwise the two will be
    var dateString = '<h3>' + dates[0];

    if(dates[0] != dates[1])
        dateString += ' - ' + dates[1];

    dateString += '</h3>';

    //add the date to the lightbox aswell as other element
    $('#lightbox').append(dateString);

    if(event.imgFileName != null)
        $('#lightbox').append('<img src="img/' + event.imgFileName + '" alt="' + event.imgFileName + '">');

    $('#lightbox').append('<p>' + event.description + '</p>');
}

//Delete an event from its id
function deleteEvent(idEvent){
    $.ajax({
        url : './functions/interlocutor/deleteEvent.php', 
        type : 'POST', 
        dataType : 'html',
        data : {id : idEvent},
        async: false,
        success: function(msg){
            alert(msg);
            
            $("#lightbox").hide();
            $("#lightboxOverlay").hide();

            //reload data so the change is taken into account
            $('main').empty();
            $('main').append('<img src="img/add.png" alt="Ajouter un événement" id="addIcon" onclick="addEvent()">');

            $.each(checkedCatIdArray, function(){
                getEvents(this);
            });
        }
    });
}

//Change all the data of the lightbox with form input containing said data
//Add two buttons, 'Cancel' and 'Confirm' as well as a select multiple with the catgories
function startUpdate(){
    var boxClass = $('#lightbox').attr('class');
    var event = eventList['dot' + boxClass.split('t')[1]];

    $('#lightbox').remove();
    $('#lightboxOverlay').show();
    $('#updateLightbox').show();
    $('#updateLightbox').addClass(boxClass);

    // Title
    $('#updateTitle').val(event.title);
    $('#updateTitle').attr('size', $('#updateTitle').val().length);

    //starting date
    $("#updateStartingDay").val(event.startingDay);
    $("#updateStartingMonth option[value=" + event.startingMonth + "]").attr('selected', 'selected');
    $("#updateStartingYear").val(event.startingYear);

    //ending date
    $("#updateEndingDay").val(event.endingDay);
    $("#updateEndingMonth option[value=" + event.endingMonth + "]").attr('selected', 'selected');
    $("#updateEndingYear").val(event.endingYear);
    
    // Description
    $('#updateDescription').val(event.description);

    // Image + description width & height
    if(event.imgFileName != null){ //If there was already an image, add it
        $("#rightBlock").prepend('<img src="img/' + event.imgFileName + '" alt="' + event.imgFileName + '">');
        //space taken by the image, with some space around it (used to calculate the new width of the textarea)
        var imgAndSpaceWidth = parseInt($('#updateLightbox img').css('width')) + parseInt($('#updateLightbox').css('padding')) * 2 + parseInt($('#updateDescription').css('padding')) + 'px';
        $("#updateDescription").css('width', "calc(100% - " + imgAndSpaceWidth + ")");
    } else {
        $("#updateDescription").css('width', '70%');
    }

    $("#updateDescription").height($("#updateDescription")[0].scrollHeight);

    //categories
    $.each(event.categories, function(index, value){
        $('#option' + value[0]).attr('selected', 'selected');
    });
}

// Save the changes made
function saveUpdate(){
    if(typeof $('#updateLightbox img') !== 'undefined') // new image chosen
        var oldImgName =  $('#updateLightbox img').attr("alt");
    else
        var oldImgName = null;

    //Check if the days have new values or not 
    //(the year are obligatory and the empty option of the select has the value of null, so no need to do it for them)
    if($('#insertStartingDay').val().length == 0)
        var startingDay = null;
    else
        var startingDay = $('#insertStartingDay').val();

    if($('#insertEndingDay').val().length == 0)
        var endingDay = null;
    else
        var endingDay = $('#insertStartingDay').val();

    var tempEvent = {
        idEvent : $('#updateLightbox').attr('class').split('t')[1],
        title : $('#updateTitle').val(),
        description : $('#updateDescription').val(),
        imgFileName : oldImgName, 
        startingDay : startingDay,
        startingMonth : $('#updateStartingMonth').val(),
        startingYear : parseInt($('#updateStartingYear').val()),
        endingDay : endingDay,
        endingMonth : $('#updateEndingMonth').val(),
        endingYear : parseInt($('#updateEndingYear').val()),
        categories : $('#updateCategories').val()
    }

    //Since we prevent the processing of data (in order to send a file), we must create the formData object ourselves
    var fData = new FormData();
    fData.append('event', JSON.stringify(tempEvent));

    if(typeof $('#fileInput')[0].files[0] !== 'undefined') // new image chosen
        fData.append('img', $('#fileInput')[0].files[0]);

    //get the range of year before the update
    $.ajax({
        url : './functions/interlocutor/rangeYear.php', 
        type : 'GET', 
        dataType : 'json',
            async: false, //I need the next call to be done after this one
            success: function(rangeData){
                oldRangeData = rangeData;
            }
    });

    $.ajax({
        url : './functions/interlocutor/updateEvent.php', 
        type : 'POST', 
        dataType : 'html',
        processData: false, //prevent jquery from trying to convert the formData to a string
        contentType: false, // prevent the contentType headers to be sent, in order to have the boundary string present
        data : fData,
        async: false, //So the user can directly see the result before doing something else
        success: function(msg){
            alert(msg);
            $('#updateLightbox form')[0].reset();
            $('#updateLightbox img').remove();
            $("#updateLightbox").hide();
            $('main').empty();
            //only and admin can update the event, so no need to check if the admin is connected
            $('main').append('<img src="img/add.png" alt="Ajouter un événement" id="addIcon" onclick="addEvent()">');

            $.each(checkedCatIdArray, function(){
                getEvents(this);
            });

            displayLightbox('dot' + tempEvent.idEvent); //reload the lightbox with the new info

            compareRange(tempEvent, oldRangeData);
        }
    });
}

//Check if the updated event year are smaller of bigger than the min and max of the old range
//if it's the case, reload the slider
function compareRange(tempEvent, oldRangeData){

    var newRangeData = [];
    var mustReload = false;

    if(tempEvent.startingYear < oldRangeData[0]['minYear']){
        newRangeData[0] = {'minYear' : tempEvent.startingYear, 'maxYear' : oldRangeData[0]['maxYear']};
        mustReload = true;
    }

    if(tempEvent.endingYear > oldRangeData[0]['maxYear']){
        //i need it to be in this format because other functions call addSlider with it
        //and addSlider doesn't check the format in which it receive data
        newRangeData[0] = {'minYear' : newRangeData[0].minYear, 'maxYear' : tempEvent.endingYear};
        mustReload = true;
    }

    if(mustReload){
        $("#slider").empty();
        addSlider(newRangeData);
    }
}

//Cancel the update, reload the lightbox with the old info
function cancelUpdate(){
    var idEvent = $('#updateLightbox').attr('class').split('t')[1];

    $('#updateLightbox form')[0].reset();
    $('#updateLightbox img').remove();
    $("#updateLightbox").hide();
    displayLightbox('dot' + idEvent);
}

//Show the lightbox enabling the creation of an event
function addEvent(){
    $('#lightboxOverlay').show();
    $('#addLightbox').show();
}

//Insert the new event
function insertData() {
    //Check if the days have new values or not 
    //(the year are obligatory and the empty option of the select has the value of null, so no need to do it for them)
    if($('#insertStartingDay').val().length == 0)
        var startingDay = null;
    else
        var startingDay = $('#insertStartingDay').val();

    if($('#insertEndingDay').val().length == 0)
        var endingDay = null;
    else
        var endingDay = $('#insertStartingDay').val();

    var tempEvent = {
        title : $('#insertTitle').val(),
        description : $('#insertDescription').val(),
        startingDay : startingDay,
        startingMonth : $('#insertStartingMonth').val(),
        startingYear : parseInt($('#insertStartingYear').val()),
        endingDay : endingDay,
        endingMonth : $('#insertEndingMonth').val(),
        endingYear : parseInt($('#insertEndingYear').val()),
        categories : $('#insertCategories').val()
    }

    //Since we prevent the processing of data (in order to send a file), we must create the formData object ourselves
    var fData = new FormData();
    fData.append('event', JSON.stringify(tempEvent));

    if(typeof $('#insertImgFile')[0].files[0] !== 'undefined') // new image chosen
        fData.append('img', $('#imgFile')[0].files[0]);
    
    var oldRangeData;

    //get the range of year before the insert
    $.ajax({
        url : './functions/interlocutor/rangeYear.php', 
        type : 'GET', 
        dataType : 'json',
            async: false, //I need the next call to be done after this one
            success: function(rangeData){
                oldRangeData = rangeData;
            }
    });

    //insert the data
    $.ajax({
        url : './functions/interlocutor/insertEvent.php', 
        type : 'POST', 
        dataType : 'html',
        processData: false, //prevent jquery from trying to convert the formData to a string
        contentType: false, // prevent the contentType headers to be sent, in order to have the boundary string present
        data : fData,
        async: false, //So the user can directly see the result before doing something else
        success: function(msg){
            alert(msg);
            $('#addLightbox form')[0].reset();
            $('#updateLightbox img').remove();
            $("#addLightbox").hide();
            $("#lightboxOverlay").hide();
            $('main').empty();
            //only and admin can update the event, so no need to check if the admin is connected
            $('main').append('<img src="img/add.png" alt="Ajouter un événement" id="addIcon" onclick="addEvent()">');

            //reload the data so they are up to date
            $.each(checkedCatIdArray, function(){
                getEvents(this);
            });
            

            //Check if the new event year are smaller of bigger than the min and max of the old range
            //if it's the case, create a new object rangeData to send to the slider
            var newRangeData = [];
            var mustReload = false;

            if(tempEvent.startingYear < oldRangeData[0]['minYear']){
                newRangeData[0] = {'minYear' : tempEvent.startingYear, 'maxYear' : oldRangeData[0]['maxYear']};
                mustReload = true;
            }

            if(tempEvent.endingYear > oldRangeData[0]['maxYear']){
                //i need it to be in this format because other functions call addSlider with it
                //and addSlider doesn't check the format in which it receive data
                if(typeof newRangeData[0] !== 'undefined')
                    newRangeData[0] = {'minYear' : newRangeData[0].minYear, 'maxYear' : tempEvent.endingYear};
                else
                    newRangeData[0] = {'minYear' : oldRangeData[0]['minYear'], 'maxYear' : tempEvent.endingYear};
                mustReload = true;
            }

            if(mustReload){
                slider.noUiSlider.destroy();
                addSlider(newRangeData);
            }
        }
    });
}

//display the mini box with the title and the date of the event 
//as well as the line representing the period of the event if it has one big enough
function displayMiniInfo(){
    var animeDotWidth = "10px";
    var animeBorderWidth = "3px";
    var dot = $(this); //if i use it directly in the settimeout, the $(this) will represent the window in place of the dot

    timeoutId = setTimeout(function(){ 
        dot.animate({
            height: "10px",
            width: animeDotWidth,
            borderWidth: animeBorderWidth,
            borderColor: '#000000',
            zIndex: 8
        }, 250); 

        dot.on('click', { idEvent: dot[0].id }, displayLightbox);
        
        //prepare the info to add to the miniBox
        var event = eventList[dot[0].id];
        var dates = treatEventDate(event.startingDay, event.startingMonth, event.startingYear, event.endingDay, event.endingMonth, event.endingYear);
        
        //if the two dates are the same, only the first one will be shown
        //otherwise the two will be
        var dateString = '<p>' + dates[0]; 

        if(dates[0] != dates[1])
            dateString += ' - ' + dates[1];

        dateString += '</p>'; 

        //add the box and the info
        dot.append('<div class="miniInfo"></div>');
        $(".miniInfo").append('<h4>' + event.title  + '</h4>');
        $(".miniInfo").append(dateString);

        //Check that the miniBox isn't outside of the screen (left side) (by trying to be at the center of the dot) and move it if it's the case
        var diffLeftEdgeAndDot = parseInt(dot.css('left')) - parseInt($('.miniInfo').css('right'));
        if(diffLeftEdgeAndDot < 0)
            $('.miniInfo').css('right', parseInt($('.miniInfo').css('right')) - Math.abs(diffLeftEdgeAndDot));

        //Check that the miniBox isn't outside of the screen (right side) (by trying to be at the center of the dot) and move it if it's the case
        var miniRightSidePos = parseInt($('main').css('margin-left')) + (parseInt(dot.css('left'))  + parseInt($(".miniInfo").css('width')) / 2);
        if(miniRightSidePos > parseInt($('body').css('width'))){
            var diff = miniRightSidePos - parseInt($('body').css('width'));
            $('.miniInfo').css('right', parseInt($('.miniInfo').css('right')) + diff);
        }

        // prevent the box to go up when the dot stacks
        $('.miniInfo').css('top', parseInt(dot.css('bottom')) + 20);

        //If the starting and ending date are different add the ending dot and the line between the two
        if(event.startingYear != event.endingYear){
            var sliderValues = slider.noUiSlider.get();
            var nbPixelPerYear = parseInt(dot.parent().css("width")) / (sliderValues[1] - sliderValues[0]); //width of line / year represented by the line
            var spaceBetweenDotAndLine = 10;

            // -sliderValues[0] because we want the year difference between the start of the timeline (not the year 0) and the dot * nb pixel per 1 year
            var endingDotLeftPos = (event.endingYear - sliderValues[0]) * nbPixelPerYear; 

            //  half of dot & border width (during anim) + space between dot & line ("margin")
            var halfDotWithMargin = parseInt(animeDotWidth) / 2 + parseInt(animeBorderWidth) / 2 + spaceBetweenDotAndLine;

            //diff between beginning/ending year * nb pixel per 1 year - halfDot * 2 (one for each dot)
            var lineWidth = (event.endingYear - event.startingYear) * nbPixelPerYear - (halfDotWithMargin * 2);

            //add and stylise everything
            dot.append('<div class="periodLine"></div>');
            dot.after('<div class="endingDot" id="endingDot' + event.idEvent + '"></div>');
            $(".periodLine").css("left", halfDotWithMargin); //since the initial position of the line is the middle of the dot
            $(".periodLine").css("width", lineWidth); 
            $("#endingDot" + event.idEvent).css("left", endingDotLeftPos);
        } 
    }, 500);
}

//Erase the displayed info on hover, reset the dot to its initial style
function removeMiniInfo(){
    clearTimeout(timeoutId); //prevent the function after the timeout to start

    //if the mouse leave the dot before the timeout was finish, nothing was added, so there's nothing to remove
    if($(this).children().hasClass("miniInfo")){
        //restore the initial style of the dot
        $(this).animate({
            height: "0",
            width: "0",
            borderWidth: "5px",
            borderColor: '#FFFFFF',
            zIndex: 5
        }, 250);
        $(this).empty();
        $(this).unbind("click");

        //if the starting/ending date were the same the endingDot wasn't added, so there's no need to remove it
        if($(this).next().hasClass("endingDot"))
            $(this).next().remove();
    }
}

//Check which date info (day, month or year) are filled and create two string, one for the starting year and the other for the ending one
function treatEventDate(startingDay, startingMonth, startingYear, endingDay, endingMonth, endingYear){
    //Check if the starting/ending day/month aren't null (the year can't be)
    var startingDate = '';
    var endingDate = '';

    //starting
    if(startingDay != null)
        startingDate += startingDay + ' ' ;

    if(startingMonth != null)
        startingDate += startingMonth + ' ' ;

    //ending
    if(endingDay != null)
        endingDate += endingDay + ' ' ;

    if(endingMonth != null)
        endingDate += endingMonth + ' ' ;

    //add the year (never null)
    startingDate += startingYear;
    endingDate += endingYear;

    return [startingDate, endingDate];
}

//Update the ending year min to be the value of the starting year (for the update form)
function minInsertEndingYear(){
    $("#insertEndingYear").attr("min", $("#insertStartingYear").val());
}

//Update the ending year min to be the value of the starting year (for the insert form)
function minUpdateEndingYear(){
    $("#updateEndingYear").attr("min", $("#updateStartingYear").val());
}
