import { React } from "react"

function filterFilmsByDirector(searchList,searchDirector) {

    console.log(`---Begin filterFilmsByDirector()---`);
    console.log(`SearchList=`,searchList);
    console.log(`Search Director=`,searchDirector)
    
    let filteredList = [];
    
    searchList.map((value, index, array) => {
        if(value.director === searchDirector || searchDirector === "All") {
            let filteredElement = {};
            filteredElement.title = value.title;
            filteredElement.director = value.director;
            filteredList.push(filteredElement);
        }
    });

    console.log(`Filtered Films List=`,filteredList);
    console.log(`---End function filterFilmsByDirector()---`);
    
    return filteredList;
}


function getListOf(searchList, property) {

    console.log(`---Begin Function getListOf()---`);
    console.log(`Search List=`,searchList);
    console.log(`Property=`,property);

    let resultArray = [];

    searchList.map((value, index, array) => {
        if(resultArray.indexOf(value[property]) < 0) {
            resultArray.push(value[property]);
        }
    })

    console.log(`List of Directors=`,resultArray);
    console.log(`---End Function getListOf()---`);
    
    return resultArray;
}
export { filterFilmsByDirector, getListOf };