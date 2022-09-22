import { React } from "react";
import { useState } from "react";
import Footer from "../components/Footer.jsx";

// Home Page Main Function
function HomePage(props) {

    console.log(`---Begin Function HomePage()---`);

    const [ list, setList ] = useState(["ready", "set", "GO"]);
    const [ text, setText ] = useState("");

    // Submit button event handler
    function onSubmit(event) {

      console.log(`---Begin onSubmit()---`);

      let buttonValue = event.target.value;

      event.preventDefault();
    
      switch (buttonValue) {
        case "Add":
          // Don't process empty string
          if (!text || text.length === 0) {
            console.log(`Empty String`);
          }
          else {
            // Must use a new array
            let newList = list.slice(0);
            newList.push(text);
            console.log(`NewList=`,newList);
            // Clear text so that it won't be displayed on subsequent add
            setList(newList);
            setText("");
          }
          break;
        case "Delete":
          if(!text || text.length === 0) {
            console.log(`Empty String`);
          }
          else {
            let newList = [];
            let deleteIndex = parseInt(text);
            for(let i=0; i < list.length; i++) {
              if(deleteIndex !== (i + 1)) {
                newList.push(list[i]);
              }
            }
            console.log(`NewList=`,newList);
            // Clear text so that it won't be displayed on subsequent add
            setList(newList);
            setText("");
          }
          break; 
        default: 
          console.log(`Invalid Button value ${buttonValue}`);
        break;
      }
      console.log(`---End onSubmit()---`);
    }

    return(<div className="container">
              <div className="row">
                <div className="col-4 text-center my-center mt-3">
                  <h1 className="color-white">React Routes</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-3 border border-primary rounded my-center background-color-white">
                    <form className="mt-3 mb-2" onClick={onSubmit}>
                      <p>To delete an item enter it's number only!</p>
                        <div className="form-group">
                          <label htmlFor="toDoInput">Add to do item </label>
                          <input id="toDoInput" 
                                 className="mb-1 form-control" 
                                 value={text} 
                                 onChange={(e) => setText(e.target.value)}>
                          </input>
                          <button className="m-2 btn btn-primary" 
                                  type="submit"
                                  name="Add"
                                  value="Add">Add</button>
                          <button className="m-2 btn btn-danger"
                                  type="submit"
                                  name="Delete"
                                  value="Delete">Delete</button>
                        </div>
                    </form>
                </div>
              </div>
              <div className="row">
                <div className="col-4 mt-2 my-center">
                  <h4 className="color-white text-center">To Do List</h4>
                  <ul className="list-group mt-2 mb-2 border border-primary rounded">
                    {list.map((item, idx) => {
                    let listId = `List:${idx}`;
                    let listText = `(${idx+1}.) ${item}`;
                      return <li className="list-group-item"
                                 key={listId}
                                 id={listId}>{listText}
                             </li>;
                    })}
                  </ul>
                  <Footer></Footer>
                </div>
              </div>
            </div>)
}
export { HomePage };