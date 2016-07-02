## fcc-ImageSearch
##### User stories:

<ul>
<li>I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

<li>I can paginate through the responses by adding a ?offset=2 parameter to the URL.

<li>I can get a list of the most recently submitted search strings.
</ul>

###### Example usage:


[http://fcc-img.herokuapp.com/latest](http://fcc-img.herokuapp.com/latest)
`
Shows the latest searches, sorted by most recent first.
`
***
[http://fcc-img.herokuapp.com/search/example](http://fcc-img.herokuapp.com/search/example)
`
Performs a Bing Image search, using the term example.
`
***
[http://fcc-img.herokuapp.com/search/example?offset=5](http://fcc-img.herokuapp.com/search/example?offset=5)
`
With the added offset parameter, the search for example has an offset of 5 images, starting on the fifth. Default value is 0.
`
***
[http://fcc-img.herokuapp.com/search/example?count=5](http://fcc-img.herokuapp.com/search/example?count=5)
`
The search for example now has a maximum length of 5 objects. Default value is 10.
`
***
[http://fcc-img.herokuapp.com/search/example?offset=10&count=5](http://fcc-img.herokuapp.com/search/example?offset=10&count=5)
`
This is a combination of both parameters.
`



#### Demo
Demo project hosted at Heroku. [Click here to redirect to it.](http://fcc-img.herokuapp.com)

## License

MIT License. [Click here for more information.](LICENSE.md)
