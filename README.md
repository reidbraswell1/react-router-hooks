# Getting Started with Create React App
# React Router Hooks

## Part 1

### Exercise 1: Creating SingleFilm Page
Start off by creating the component for our film page.

Create a new file in pages/ called singlefilm.page.jsx
Create a functional component called SingleFilmPage in singlefilm.page.jsx
make sure to export it (I tend to forget unless I do it early on)
Import useState from the react package
Import useParams from the react-router-dom package
Declare a piece of state, item and setItem, that will be destructured from the return of useState({})
Call useParams
Destructure id from the return object
Add the following to the return statement
```
<div>
  <div>
    <img src={`${item.image}`} alt={`${item.title} Poster`} />
  </div>
  <div>
    <h1>{item.title}</h1>
    <p>
      Directed by {item.director}. Produced by {item.producer}.
    </p>
    <p>
      The film was released in <strong>{item.release_date}</strong> and garnered
      a <strong>{item.rt_score}</strong> aggregate score on{" "}
      <a
        href="https://www.rottentomatoes.com/"
        target="_blank"
        rel="noreferrer"
      >
        Rotten Tomatoes
      </a>
      .
    </p>
    <h2>Description</h2>
    <p>{item.description}</p>
  </div>
</div>
```
Feel free to change anything about this return statement from content to style. We'll use this to display information about a single film.

### Exercise 2: getFilm
Similar to our getFilms function in films.page.jsx, create a function to get a single Studio Ghibli film.

In SingleFilmPage, create a function called getFilm
The function should call the fetch function with the following url parameter: https://ghibliapi.herokuapp.com/films/${id}
id in this case will need to be interpolated since we'll be getting that value dynamically from the route params
Call the then method on the returned promise
the first then call should receive a callback function that returns the result parsed to json
Make another then call on the returned promise
the second then call should receive a callback function that uses setItem to set item equal to the result
Lastly add a catch method call that should receive a callback function that will handle an error if one occurs

### Exercise 3: Calling getFilm in useEffect#
Call getFilm when the component mounts.

Import useEffect from the react package
Call useEffect with
a callback function passed in that calls getFilm
an empty dependency array passed in

### Exercise 4: Links to Single Films#
Add links to a single page view.

In pages/films.page.jsx, import Link from react-router-dom
Update the li's rendered by list.map(...) to include a Link
wrap the item.title in a Link that has a path set to film/${film.id}
make sure the path is interpolated to include the film's id as a url parameter
Exercise 5: A Route for SingleFilmPage#
Lastly, set up a route for SingleFilmPage.

In pages/index.js, import SingleFilmPage and export it with HomePage and FilmsPage
In App.jsx, add SingleFilmPage to the destructured imports from pages/
Add a Route within Routes that renders SingleFilmPage for "film/:id" paths

## Part 2

### Exercise 1: Create getFilmStats
Create and export a new helper function in film.helpers.js called getFilmStats.

The goal of getFilmStats is to receive list (array) parameter, and return a object that contains the following:

avg_score as a number, being the average rt_score of the list of films
acc_score as a number, being the sum rt_score of the list of films
total as a number, being the amount of films in the list
latest as a number, being the latest release year for a film in the list

For example:

```
Input:
list - [
        { title: "Castle in the Sky", release_date: "1986", rt_score: "95" },
        { title: "My Neighbor Totoro", release_date: "1988", rt_score: "93" }
      ]

Output:
{
   acc_score: 188,
   avg_score: 94,
   total: 2,
   latest: 1988
}
```

Implement getFilmStats
### Exercise 2: Display Film Stats
Create several elements for displaying average film score, latest film and total films for the filtered list of films.

In films.page.jsx, import getFilmStats from film.helpers.js
Call getFilmStats before the return statement and pass list as a parameter
destructure avg_score, total and latest from the result
Add the following code to the return statement between the form and ul
```
<div>
  <div>
    <span># Of Films</span>
    <span>{total}</span>
  </div>
  <div>
    <span>Average Rating</span>
    <span>{avg_score.toFixed(2)}</span>
  </div>
  <div>
    <span>Latest Film</span>
    <span>{latest}</span>
  </div>
</div>
```