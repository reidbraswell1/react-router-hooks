import { React, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function SingleFilmPage(props) {

    console.log(`---Begin Function SingleFilmPage()---`);

    const [ item, setItem ] = useState({});
    const { id } = useParams();

    useEffect(function() {
        console.log(`---Begin useEffect()---`);
        getFilm();
        console.log(`---End useEffect()---`);
    },[]);

    function getFilm() {
        console.log(`---Begin FilmsList getFilms()---`);
 
        const BAD_URL = "https://ghibliapi.herokuapp.com/filmss"
        const GOOD_URL = `https://ghibliapi.herokuapp.com/films/${id}`
        let URL = "";

        // Set URL to the good url or bad based on the errTest prop
        if(errorTest) {
            URL = BAD_URL;
        }
        else {
            URL = GOOD_URL;
        }
        fetch(URL)
            .then((response) => {
                if(response.ok) { 
                    return response.json()
                }
                else {
                    throw new Error("Unknown Network Error Has Occurred");
                }
            })
            .then((data) => {
                console.log(`Data=`,data);
                setList(data);
                const directors = getListOf(data, "director");
                console.log(`Directors=`,directors)
                setDirectors(directors);
                setErrorText("");
            })
            .catch((err) => { 
                console.log(`${err} fetching from URL: ${URL}`);
                setList([]);
                setErrorText(`${err} fetching from URL: ${URL}`);
            });
        console.log(`---End FilmsList getFilms()---`);

    }

    return(<div>
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
      </div>);
}
export default SingleFilmPage;