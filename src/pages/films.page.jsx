import { Link } from "react-router-dom";

function FilmsPage(props) {

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
                        let path=`film/${value.id}`;
                        return(
                            <li className="list-group-item" 
                                key={value.id} 
                                id={value.id}>{index+1}. <Link path={path}>{value.title} - {value.director}</Link>
                            </li>)})}
                </ul>
                <p className="error"><span className="color-red">{errorText}</span></p>
                <Footer></Footer>
            </div>
        </div>
    </div>);
}
export default FilmsPage;