/*
 * Description : Contains all functions regarding the display of the timeline and the document.ready() function
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/

var checkedCatIdArray = [];
var eventList = {}; //actually an object because of js syntax
var nbPixelPerYear = 0;
var sliderValues = [];

//Prepare the page : create the slider, add the categories list and bind functions to element events
$(document).ready(function(){
    //ask for years data and create the slider with it
    $.ajax({
        url : './functions/interlocutor/rangeYear.php', 
        type : 'GET', 
        dataType : 'json',
        async: false, //the rest of the page can't work without this so there's no need to make it asynchrone
        success: function(rangeData){
            addSlider(rangeData);

            //Add the "+" button if the admin is connected
            $.ajax({
                url : './functions/interlocutor/getSession.php', 
                dataType : 'text',
                async: false, // I prefer to have the page completely ready when the user start using it
                success: function(isAdmin){
                    if(isAdmin)
                        $('main').append('<img src="img/add.png" alt="Ajouter un événement" id="addIcon" onclick="addEvent()">');

                    sliderValues = slider.noUiSlider.get();
                    nbPixelPerYear = parseInt($("main").css("width")) / (sliderValues[1] - sliderValues[0]); //width of line / year represented by the line
                }
            });
       }
    });

    displayCategories();

    //Bind function to different event of different event

    $('main').on("mouseenter", ".dot", displayMiniInfo);
    $('main').on("mouseleave", ".dot", removeMiniInfo);

    $('#addLightbox form').submit(function(e){
        e.preventDefault();
        insertData();
    });

    $('#updateLightbox form').submit(function(e){
        e.preventDefault();
        saveUpdate();
    });

    //Show the list of categories when the user hover its title
    $("#sidebarBlock h2").on('mouseenter', function(){
        $('#listCat').show();
    });

    //Hide the list of categories when the user leave the list
    $("#listCat").on('mouseleave', function(){
        $('#listCat').hide();
        $.ajax({
            url : './functions/interlocutor/getSession.php', 
            dataType : 'text',
            async: false, // I prefer to have the page completely ready when the user start using it

            //Reload the data in case the admin started updating or creation a category but didn't finish
            success: function(isAdmin){
                if(isAdmin) {
                    displayCategories();
                }
            }
        });
    });

    //'important' is a class that override the hover style when the user unselect a category
    //i need it because the hover and select style are the same, so when the user clicked to unselect,
    // it did, but with the other style we didn't directly see a difference
    //The rest of the time i still want the hover to work normally
    $("#listCat").on('mouseleave', 'li',  function(){
        $(this).removeClass('important');
    });

    //hide every lightbox (the three aren't shown at the same time, 
    //but this click event works for the three of them, so i didn't separate it in different function)
    $('#lightboxOverlay').click(function(e){
        if(e.target === this) { //check that just the overlay (and not its children) has been clicked
            $('#lightbox').remove();
            $('#updateLightbox form')[0].reset();
            $('#addLightbox form')[0].reset();
            $('#updateLightbox').hide();
            $('#addLightbox').hide();
            $('#lightboxOverlay').hide();
        }
    });

    //Transform the 'Nouvelle Catégorie' element into a form element enabling to write the name of a new category
    $('#listCat').on('click', '#newCat', function(e){
        if(e.target === this) { //check that just the li (and not its children) has been clicked
            $("#newCat").html('');
            $("#newCat").append('<input type="text">');
            $("#newCat").append("<img src='img/tick.png' alt='Valider'>");
        }
    });

    //Inser the new category name 
    $('#listCat').on('click', '#newCat img', function(e){
        if(e.target === this) { //check that just the img has been clicked
            var catName = $("#newCat input").val();
            $("#newCat").empty();
            $("#newCat").html('Nouvelle catégorie');

            $.ajax({
                url : './functions/interlocutor/insertCategory.php', 
                type : 'POST', 
                dataType : 'html',
                data : { name : catName},
                async: false, // I prefer to have the page completely ready when the user start using it
                success: function(msg){
                    displayCategories();
                    alert(msg);
                }
            });
        }
    });

    //Delete the category from which the delete symbol has been clicked
    $('#listCat').on('click', '.supp', function(e){
        if(e.target === this) { //check that just the img has been clicked
            var catId = $(this).parent().attr('id').split('t')[1];

            $.ajax({
                url : './functions/interlocutor/deleteCategory.php', 
                type : 'POST', 
                dataType : 'html',
                data : { id : catId },
                async: false,
                success: function(msg){
                    displayCategories();
                    alert(msg);
                }
            });
        }
    });

    $('#listCat').on('click', 'li', function(e){
        if(e.target === this) { //check that just the li (and not its children) has been clicked
            selectCategory($(this));
        }
    });

    //replace the category name with an input enabling its edition
    $('#listCat').on('click', '.edit', function(e){
        if(e.target === this) { 
            var catName = $(this).prev().text();
            $(this).prev().remove();
            $(this).parent().prepend("<input type='text' value='" + catName + "' id='editCat'>");
        }
    });

    $('#listCat').on('mouseleave', '#editCat', modifyCat);
});

//Create the slider from a range of years
function addSlider(rangeData){
    var slider = document.getElementById('slider');

    // variable used to know where to place the two handles
    var minYear = parseInt(rangeData[0].minYear);
    var maxYear = parseInt(rangeData[0].maxYear);
    var range = maxYear - minYear;
    var halfOfSlider = minYear + range / 2;
    var percentageOfRange = (range * 10) / 100;

    noUiSlider.create(slider, {
        range: { //value represented by the slider
            'min': [minYear],
            'max': [maxYear]
        },
        start: [halfOfSlider - percentageOfRange, halfOfSlider + percentageOfRange], //position the two handles, at the half +/- 10% of the range
        connect: true, //fill the area between the handles with a different color

        //format the number above the handle to not show any decimals
        //(wNumb being from an extern librairy)
        tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 })], 

        behaviour: 'none' //just the normal drag of one handle, without any other possible behaviour
    });

    sliderValues = slider.noUiSlider.get();
    nbPixelPerYear = parseInt($("main").css("width")) / (sliderValues[1] - sliderValues[0]); //width of line / year represented by the line

    //detect when one of the handle has been moved and update the view if necessary
    slider.noUiSlider.on('end', function(){
        updateView();
    });
    updateView();
}

function updateView(){
    if(typeof checkedCatIdArray !== 'undefined' && checkedCatIdArray.length > 0){ //if any category has been selected
        $('main').empty();

        //add the "+" sign enabling the creation of events if the admin is connected
        //(needed because of the .empty() )
        $.ajax({
            url : './functions/interlocutor/getSession.php', 
            dataType : 'text',
            async: false, // I prefer to have the page completely ready when the user start using it
            success: function(isAdmin){
                if(isAdmin)
                    $('main').append('<img src="img/add.png" alt="Ajouter un événement" id="addIcon" onclick="addEvent()">');

                sliderValues = slider.noUiSlider.get();
                nbPixelPerYear = parseInt($("main").css("width")) / (sliderValues[1] - sliderValues[0]); //width of line / year represented by the line
            }
        });

        //Display the timeline for each selected categories
        $.each(checkedCatIdArray, function(){
            getEvents(this);
        });
    }
}

//Modify a category
function modifyCat(){
    //the id is cat1, with 1 being the id of the cat (and so different each time)
    var catId = $(this).parent().attr('id').split('t')[1]; 
    var newCatName = $(this).val();

    $.ajax({
        url : './functions/interlocutor/updateCategory.php', 
        type : 'POST', 
        dataType : 'html',
        data : { newName : newCatName , id : catId},
        async: false, // I prefer to have the page completely ready when the user start using it
        success: function(msg){
            displayCategories();
            alert(msg);
        }
    });
}

//Update with the 3 categories list (the one on the main page, the one in the update event form and the one in the insert event form)
function displayCategories(){
    $.ajax({
        url : './functions/interlocutor/getCategories.php', 
        type : 'GET', 
        dataType : 'json',
        success: function(catData){
            //Clear all data
            $('#updateCategories').empty();
            $('#insertCategories').empty();
            $('#listCat').empty();

            //add new data
            $.each(catData, function(index, cat){
                $('#updateCategories').append('<option id="option' + cat.idCategory + '" value="' + cat.idCategory + '">' + cat.name + '</option>');
                $('#insertCategories').append('<option value="' + cat.idCategory + '">' + cat.name + '</option>');
                $('#listCat').append('<li id="cat' + cat.idCategory + '"><p>' + cat.name + '</p></li>');
            });

            $.ajax({
                url : './functions/interlocutor/getSession.php', 
                dataType : 'text',
                async: false, // I prefer to have the page completely ready when the user start using it

                //Add the modify and delete symbols as well as the "Nouvelle Catégorie" element if the admin is connected
                success: function(isAdmin){
                    if(isAdmin) {
                        $("#listCat li").append("<img src='img/edit.png' alt='Modifier la catégorie' class='edit'>");
                        $("#listCat li").append("<img src='img/supp.png' alt='Supprimer la catégorie' class='supp'>");

                        //The two img are in absolute position in order to have them at the end of the line
                        //So i need to find the right distance of the first one by calculating the space taken by the second one
                        var editRight = parseInt($(".supp").css('width')) + parseInt($(".supp").css('right')) + 5;
                        //Update the width of the li element in order to have their border also goes under the symbols
                        var newWidth = parseInt($("#listCat").css('width')) + parseInt($(".edit").css('width')) + editRight; 
                        $(".edit").css("right", editRight);
                        $("#listCat li").css('width', newWidth);
                        $("#listCat").prepend("<li id='newCat'>Nouvelle catégorie</li>");
                    }
                }
            });
        }
    });
}

//Select a category and add its timeline to the page
function selectCategory(li){
    //the id is cat1, with 1 being the id of the cat (and so different each time)
    var idCat = $(li).attr('id').split('t')[1];

    if(!$(li).hasClass('selected')){ //display new timeline
        if(checkedCatIdArray.length < 8){ //check that there isn't too many cat already selected
            $(li).addClass('selected');
            checkedCatIdArray.push(idCat)
            getEvents(idCat);
        } else {
            alert("Trop de catégories sélectionnées, déselectionner en une d'abord");
        }
        
    } else { //clear timeline of this category
        $(li).removeClass('selected');

        //'important' is a class that override the hover style when the user unselect a category
        //i need it because the hover and select style are the same, so when the user clicked to unselect,
        // it did, but with the other style we didn't directly see a difference
        //The rest of the time i still want the hover to work normally
        $(li).addClass('important');
        var index = checkedCatIdArray.indexOf(idCat);
        checkedCatIdArray.splice(index, 1);
        $('#timeline' + idCat).remove();
    }
}

//Get the event for a certain period & category and call the function to display them
function getEvents(idCat){
    $.ajax({
        url : './functions/interlocutor/event.php', 
        type : 'GET', 
        dataType : 'json',
        data : { idCategory: idCat, minYear: Math.trunc(sliderValues[0]), maxYear: Math.trunc(sliderValues[1])},
        async: false, //otherwise the line won't appear in the right order
        success: function(eventData){
            displayTimeline(eventData);
        }
    });
}

//display the new timeline with the received events
function displayTimeline(eventData){
    //eventData has the id and name of the category at the beginning and then all the event object
    var idCategory = eventData.splice(0,1);
    var categoryName = eventData.splice(0,1);

    //add the timeline
    $('main').append('<div class="timeline" id="timeline' + idCategory + '"></div>');
    $("#timeline" + idCategory).append('<p class="timelineName">' + categoryName + '</p>');

    //add the dots
    $(eventData).each(function(){
        //the id is used to retrieve this event, but i also need to retrieve this specific dot, which is why i use a unique class
        var uniqueClass = 'dot' + this.idEvent + '_' + idCategory;

        // -sliderValues[0] because we want the year difference between the start of the timeline (not the year 0) and the dot * nb pixel per 1 year
        var dotLeftPos = (this.startingYear - sliderValues[0]) * nbPixelPerYear; 

        $("#timeline" + idCategory).append('<div class="dot ' + uniqueClass + '" id="dot' + this.idEvent + '"></div>');
        $("." + uniqueClass).css("left", dotLeftPos);
        
        var lastDotLeftPos = parseInt($("." + uniqueClass).prev().css("left"));

        //if the new dot is on the last one (same position) -> put the new dot higher (vertically)
        if(dotLeftPos >= lastDotLeftPos - 5 && dotLeftPos <= lastDotLeftPos + 5){ 
            var lastDotBottomPos = parseFloat($("." + uniqueClass).prev().css("bottom"));

            // 2 * border of dot (= its height) + last dot bottom pos + small space
            var dotBottomPos = parseFloat($(".dot").css("border-width")) * 2 + 2 + lastDotBottomPos; 
            $("." + uniqueClass).css("bottom", dotBottomPos);
        }

        eventList['dot' + this.idEvent] = this;
    });
}