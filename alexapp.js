exports.handler = function( event, context ) {

    var http = require( 'http' );

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=<YOURZIP>,us&units=imperial&APPID=<YOURAPPID>';

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );

            var temp = json.main.temp;

            var wind_speed = json.wind.speed;

            var wind_chill = 35.74 + 0.6215*temp - 35.75*Math.pow(wind_speed, 0.16) + 0.4275*temp*Math.pow(wind_speed, 0.16);

            var chill_rounded = Math.round( wind_chill * 10 ) / 10;

            var text = 'Outside with wind chill the temperature feels like ';
            text+=chill_rounded+" degrees fahrenheit.";
            output( text, context );

        } );

    } );

};

function output( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "Thornton Windchill",
            content: text
        },
        shouldEndSession: true
    };

    context.succeed( { response: response } );

}
