import { connect } from "react-redux";
import { loadAllCountries } from "../../actions";
import s from "./CleanFilter.module.css";

function CleanFilters(props){

    function handleClick(e){
        fetch("https://pi-countries-santi.herokuapp.com/") 
                .then(r => r.json())
                .then((recurso) => {
                    props.loadAllCountries(recurso)
                    return recurso;
                });
    }

    return(
        <div className={s.containerClean}>
            <form action="">
                <button onClick={handleClick} className={s.btn}>Clean Filters</button>
            </form>
        </div>
    )
}

export default connect(null, {loadAllCountries})(CleanFilters);