# Solution Docs

<!-- Include documentation, additional setup instructions, notes etc. here -->

No additional setup instructions. Only installed babel-polyfill additionally and imported it at the top of index.js so that asyc would would properly.

# Rendering Data

This was a pretty tricky assessment on some levels. In general, writing some functions with keyCodes and filtering JSON Response data are quite simple, but I enjoyed the challenges that this code presented.

The structure of the objects created some speed bumps that forced me to edit the code in Autocomplete.js no matter how badly I wanted to keep myself out of there. 

In order to get the sequence of events to work properly for both inputs, I found that updating the getResults function in Autocomplete to be an asynchronous call would allow me to use it to send the correct data for both states and gh-users (and any other instance of the Autocomplete component, if data/endpoints were passed properly).

In addition to making that call asynchronous, I added a new async call to the render of just the gh-user Autocomplete component that would return the items array from the GitHub API back to the component. This would allow for Autcomplete.getResults to continue parsing the data properly so that it can render the drop downs.

Another component can be created and will need to either pass static data or an endpoint and a similar version of the getUserData call (if an endpoint is passed) that would be able to parse the response properly into the data array that Autocomplete.getUsers utilizes.

# Key Code Logic

I tried to keep this logic as dynamic as possible based on what the target input was being interacted with. If I had some more time I was hoping to add in some logic to clear the input on blur (mostly when you went to another input) so that there would only be one field dropped down at any given moment. I'd also like to work in some seamless stuff to allow for the hover effect to overwrite the keyup logic and vice-versa.

But this logic is relatively standard to just using the up and down arrows on my 15inch macbook. I didn't try to put in any stuff for a num-key keyboard, and could have done some fun stuff with alternative keyboards, but those didn't seem necessary for this.

The key presses will take whatever is rendered in the .results UL element and then use a global count variable that increments or decrements with each keyup (arrow up or down). You won't be able to go above the amount of values returned as a result of the search, and you won't be able to decrement below -1.

As the count changes, the element at that point in the results array will get a class named .highlighted. That will tell it to look identical to the hover effect on that same element. And finally, when the enter key is his, the element that is highlighted will print out the value assigned to it.

I updated the Autocomplete component to add a data attribute to each result element so that the value was available in the HTML allowing me to print it out. I could have spent some time to figure out a way to parse the data that was used for rendering the results and match up the data.text with the element selected and return it's value, but adding the data attribute seemed like the least intrusive and least time consuming option for returning the right values.