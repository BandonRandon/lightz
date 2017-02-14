# lightz
Home Automation with Seeed Studios Wio and Flic
This project can run on any computer which supports a web server. We used Nginx running on a C.H.I.P $9 computer from Next Thing Co.

This is a simple example of using the Grove Relay from Seeed Studios with a Wio Link or Wio Node. To get started set up your relay then enter your seeedAccessToken and API Server in either build/core/js/main.js and/or src/core/js/main.js. Note you may be better off with src as you may also need to replace the port, D0 in the example, with your own relay location.

As an added bonus the flic folder includes an example of how to toggle the lights using the Flic Python Bluetooth Library and deamon from Flic. This is also a simple example of using Python3 and Request to do a POST request to the Seeed API.

More and better documentation to come.
