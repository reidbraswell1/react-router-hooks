import { React } from "react"

function filterFilmsByDirector(searchList,searchDirector) {

    console.log(`---Begin filterFilmsByDirector()---`);
    console.log(`SearchList=`,searchList);
    console.log(`Search Director=`,searchDirector)
    
    let filteredList = [];
    
    searchList.map((value, index, array) => {
        if(value.director === searchDirector || searchDirector === "All") {
            let filteredElement = {};
            filteredElement.id = value.id;
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

function getFilmStats(list) {

    console.log(`---Begin Function getFilmStats()---`);
    console.log(`List=`,list);
    
    let acc_score = 0;
    let avg_score = 0;
    let total = 0;
    let latest = 0;
    let result_object = {};

    list.map((value, index, array) => {
        acc_score+=parseInt(value.rt_score);
        total+=1;
        if(parseInt(value.release_date) > latest) {
            latest = parseInt(value.release_date);
        }

    });
    avg_score = acc_score/total;

    result_object.acc_score = acc_score;
    result_object.avg_score = avg_score;
    result_object.total = total;
    result_object.latest = latest;

    console.log(`Result Object=`,result_object);
    console.log(`---End Function getFilmStats()---`);

    return result_object;
}

export { filterFilmsByDirector, getListOf, getFilmStats };