import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { filterFilmsByDirector } from "../helpers/film.helpers.js";
import { getListOf } from "../helpers/film.helpers.js";
import { getFilmStats } from "../helpers/film.helpers.js";
import { Link } from "react-router-dom";
import Footer from "../components/footer.jsx";

function FilmsPage(props) {

    console.log(`---Begin Function FilmsList()---`);

    const [ list, setList ] = useState([]);
    const [ errorText, setErrorText ] = useState("");
    const [ errorTest, setErrorTest ] = useState(false);
    const [ searchDirector, setSearchDirector ] = useState("All");
    const [ directors, setDirectors ] = useState([]);
    const [ filmStats, setFilmStats ] = useState({});

    useEffect(function () {
        console.log(`---Begin useEffect()---`);
        getFilms();
        console.log(`---End useEffect()---`);
    }, []);

    function getFilms() {
        console.log(`---Begin FilmsList getFilms()---`);
 
        const BAD_URL = "https://ghibliapi.herokuapp.com/filmss"
        const GOOD_URL = "https://ghibliapi.herokuapp.com/films"
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
                console.log(`Directors=`,directors);
                const filmStats = getFilmStats(data);
                console.log(`Film Stats=`, filmStats);
                setFilmStats(filmStats);
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
    
    const filmsByDirector = filterFilmsByDirector(list, searchDirector);


    return(
    <div className="container">
        <div className="row">
            <div className="col-4 my-center">
                <h1 className="color-white">Studio Ghibli Films</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-4 my-center">
                <form className="mt-2 mb-2">
                    <div className="form-group">
                        <label className="color-white" htmlFor="searchDirector">Director</label>
                        <select className="form-select mt-1" id="searchDirector" value={searchDirector} onChange={(e) => { setSearchDirector(e.target.value)} }>
                            <option value="All">All</option>
                            {directors.map((value) => {
                                return(<option value={value}>{value}</option>);
                            }) }
                        </select>
                    </div>
                </form>
            </div>
        </div>
        <div className="row">
            <div className="col-5 my-center">
                <h4 className="text-center color-white">Title - Director</h4>
                <ul className="list-group border border-primary rounded">
                    {filmsByDirector.map((value,index,array) => {
                        let path=`/film/${value.id}`;
                        console.log(`Path=`,path);
                        console.log(value.id);
                        return(
                            <li className="list-group-item" 
                                key={value.id} 
                                id={value.id}>{index+1}. <Link className="link" to={path} href={path}>{value.title} - {value.director}</Link>
                            </li>)})}
                </ul>
                <p className="error"><span className="color-red">{errorText}</span></p>
            </div>
        </div>
        <div className="row">
            <div className="col-3 my-center">
                <h4 className="text-center">Totals</h4>
                <ul className="list-group border border-primary rounded">
                    <li className="list-group-item">
                        # Of Films: <span className="text-decoration-underline">{filmStats.total}</span>
                    </li>
                    <li className="list-group-item">
                        Average Rating: <span className="text-decoration-underline">{(parseFloat(filmStats.avg_score)).toFixed(2)}</span>
                    </li>
                    <li className="list-group-item">
                        Latest Film: <span className="text-decoration-underline">{filmStats.latest}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="row">
            <div className="col-5 my-center">
                <Footer></Footer>
            </div>
        </div>      
    </div>);
}
export { FilmsPage };