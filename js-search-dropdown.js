var jsDropdown = function (config) {
    const identifier = config.identifier;
    $('<div class="jsd-search-container" id="'+identifier+'-search"></div>').insertAfter("#"+identifier);
    const getInputWidth = $('#'+identifier).css("width");
    const ul = document.createElement("ul");
    $('#'+identifier+'-search').css("width", getInputWidth);
    $('#'+identifier+'-search').append(ul);
    $(ul).append('<li class="loader"></li>');
    // $(ul).append('<li>Hmm</li>');
    // $(ul).append('<li>Ok</li>');
    // $(ul).append('<li>Ok</li>');
    // $(ul).append('<li>Ok</li>');

    $('#'+identifier+'-search ul li').mouseover(function(event){
        $(this).addClass("active");
    }).mouseout(function(){
        $(this).removeClass("active");
    });
};

