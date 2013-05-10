# Knockout Socket.io Demo

This is a demo I made using knockout and socket.io.
It is somewhat tricky to use the same Javascript code in both a Node application and in a web browser.
This demo shows one way to do it.
It contains a file models.js that is used by both the client and the server to
verify that chess moves are legal.

You can try out the code by cloning this repo and installing the dependencies
with npm:

    > npm install

Next, start the development server:

    > ./serve.js
       info  - socket.io started
    Listening on http://localhost:8000/

Now, visit [http://localhost:8000/](http://localhost:8000/) in one tab, and
open another copy of [http://localhost:8000/](http://localhost:8000/) in
another tab.
You should be able to move the rook on one tab and it will automatically
update in the other one.
