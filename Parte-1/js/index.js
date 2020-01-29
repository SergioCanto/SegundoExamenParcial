function watchBtn(){

    let btn = $('#btn');

    $(btn).on('click', function(e){

        e.preventDefault();

        let country = $('#query').val();

        $('#query').val("");

        let url = `https://restcountries.eu/rest/v2/name/${country}`;

        $.ajax({
            url : url,
            method : 'GET',
            dataType : 'json',
            success : function(responseJSON ){
            console.log(responseJSON);
            displayResults( responseJSON);
            },
            error : function( err ){
            console.log( err );
            displayError();
            }
        });

    });

}

function displayResults(responseJSON){

    $('.js-search-results').empty();

    $('.js-search-results').append(`

        <div> ${responseJSON[0].name} </div>
        <div> ${responseJSON[0].capital} </div>
        <img src=${responseJSON[0].flag} class="image"> </img>
        <div> ${responseJSON[0].population} </div>
        <div> ${responseJSON[0].region} </div>

    `);

    for(let i=0;i<responseJSON[0].timezones.length; i++ ){
        $('.js-search-results').append(`

        <div> ${responseJSON[0].timezones[i]} </div>

        `);
    }

    for(let j=0;j<responseJSON[0].borders.length; j++ ){
        $('.js-search-results').append(`

        <div> ${responseJSON[0].borders[j]} </div>

        `);
    }

}

function displayError(){

    $('.js-search-results').empty();

    $('.js-search-results').append(`

        <div> País no existente. </div>

    `);
}

function init(){
    watchBtn();
}

init();