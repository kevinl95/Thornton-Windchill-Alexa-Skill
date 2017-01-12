exports.handler = function( event, context ) {

    var http = require( 'http' );

    var url = 'Your Weather Underground link with API key goes here!';

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );

            var text = 'According to Weather Underground outside with wind chill the temperature feels like ';
            text+=json.current_observation.feelslike_f+" degrees fahrenheit.";
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
