define(function(require) {
    var $ = require('zepto');

    // getUserMedia browser fallback
    navigator.getMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
    var mediaStream;

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    //require('./install-button');

    function mediaended() {
        // clean up after we end the recording
        $('#listen')
            .removeClass('on')
            .text('Listen');
    }

    /** Analyze user media stream for fundamental frequency. */
    function fft(stream) {
        mediaStream = stream;
        mediaStream.onended = mediaended;

        console.log('omg streaming');

        var track = stream.videoTracks;
        console.log(stream.label);
    }

    $('#listen').click(function(e) {
        e.preventDefault();

        if ($(this).hasClass('on')) {
            mediaended();
            mediaStream.stop();
        } else {
            navigator.getMedia({video: false, audio: true}, function(stream) {
                console.log('listening!');
                $('#listen')
                    .addClass('on')
                    .text('Stop Listening');
                fft(stream);

            }, function(err) {
                console.log("The following error occured: " + err);
            });
        }
    });


});
