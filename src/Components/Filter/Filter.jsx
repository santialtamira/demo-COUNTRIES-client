import { connect } from "react-redux";
import { loadFilteredCountriesByContinent } from "../../actions";
import s from "./Filter.module.css";


function mapStateToProps(state) {
    return {
        allCountries: state.allCountries,
    };
}

function Filter(props){

    function clickHandler(event){
        event.preventDefault();
        
        let selectedContinent = document.getElementById("selectContinent").value;
        let filteredCountries = props.allCountries.filter(country => country.continent.toUpperCase().includes(selectedContinent.toUpperCase()) );
        props.loadFilteredCountriesByContinent(filteredCountries);

    }

    return(
        <div>
            <form >
                <select name="" id="selectContinent" className={s.selectBox}>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Antarctic">Antarctic</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <input type="submit" value="Filter" onClick={clickHandler} className={s.btnSelect}/>
            </form>
        </div>
    )
}

export default connect(mapStateToProps,{loadFilteredCountriesByContinent})(Filter);