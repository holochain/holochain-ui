# Stream Messages Mobile
The Messages list shows messages related to the chosen "Stream" on mobile. Messages are polymorphic and have a Type so the UI can use the right renderer for the info in the message.

We currently have a ChatMessage and an IdeaMessage as shown above and soon to be working on an ErrandMessage for our swim lane item hApp Errand.

One way to interact with different DNA, such as Errand, is to call a bridged function to create a new item in a board.
If we render the messages as Cards then we could easy have multiple channels open in swim lanes.
Then we can make it so the message sets the card Actions like I did with the route aware menu.
