import { React } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function SingleFilmPage(props) {

    const [ item, setItem ] = useState("");
    let id = useParams({id});
}
export default SingleFilmPage;