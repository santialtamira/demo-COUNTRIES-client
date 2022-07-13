import { useEffect, useState } from "react";
import { connect } from "react-redux";
import s from "./FormActivity.module.css";
import NavBar from "../../Components/Navbar/NavBar.jsx";
import { loadAllCountries } from "../../actions";


function mapStateToProps(state) {
    return {
        allCountries: state.allCountries,
    };
}

export function validate(input) {
    let errors = {};

    if(input.name.length < 3 || input.name.length > 20 ){
        errors.name = 'Activity name must have more than 3 characters and less than 20 characters';
    }
    if (!input.name) {
        errors.name = 'Activity name is required';
    }
    if (!/(?=.*[0-9])/.test(input.duration)) {
        errors.duration = 'Duration only accept numbers.';
    }
    if (!input.duration) {
        errors.duration = 'Duration is required';
    }
    if(input.dificulty === "select" || input.dificulty === ""){
        errors.dificulty = 'Choose another option diferent to Select';
    }
    if(input.season === "select" || input.season === ""){
        errors.season = 'Choose another option diferent to Select';
    }

    return errors;
};

function FormActivity(props){

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        addedCountries: [],   
    });

    useEffect(()=>{
        fetch("https://pi-countries-santi.herokuapp.com/countries") 
                .then(r => r.json())
                .then((recurso) => {
                    props.loadAllCountries(recurso)
                    return recurso;
                });
    }, []);

    function changeHandler(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }));
    }

    function clickHandler(e){
        e.preventDefault();
        let addCountry = document.getElementById("addedCountries").value;
        let repo = document.querySelector("#countriesRepo");

        repo.insertAdjacentHTML('afterend', `<p>${addCountry}</p>`);
        setInput({
            ...input,
            addedCountries: [...input.addedCountries].concat(addCountry)
        })  
        
    }

    function submitHandler(e){
        e.preventDefault();

        fetch("https://pi-countries-santi.herokuapp.com/activities", {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.assign("https://pi-countries-santi.herokuapp.com/countries")
    }

    return(
        <div className={s.pageContainer}>
            <NavBar></NavBar>
            <div className={s.formContainer}>
                <h1 className={s.formTitle}>Add an Activity</h1>
                <form onSubmit={submitHandler}>

                    <div>
                    <div className={s.twoElements}>
                        <p>Name</p>
                        <input type="text" name="name" onChange={changeHandler} value={input.name} className={s.twoElemBoxA}/>
                    </div>
                    <div>{errors.name && (<p className={s.danger}>{errors.name}</p>)}</div>
                    </div>

                    <div className={s.twoElements}>
                        <p>Dificulty</p>
                        <select name="dificulty" id="dificulty" onChange={changeHandler} value={input.dificulty} className={s.twoElemBoxB}>
                            <option value="select">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>{errors.dificulty && (<p className={s.danger}>{errors.dificulty}</p>)}</div>

                    <div className={s.twoElements}>
                        <p>Duration in hours</p>
                        <input type="text" name="duration" onChange={changeHandler} value={input.duration} className={s.twoElemBoxA}/>
                    </div>
                    <div>{errors.duration && (<p className={s.danger}>{errors.duration}</p>)}</div>

                    <div className={s.twoElements}>
                        <p>Season</p>
                        <select name="season" id="season" onChange={changeHandler} value={input.season} className={s.twoElemBoxB}>
                            <option value="select">Select</option>
                            <option value="summer">Summer</option>
                            <option value="winter">Winter</option>
                            <option value="autumn">Autumn</option>
                            <option value="spring">Spring</option>
                        </select>
                    </div>
                    <div>{errors.season && (<p className={s.danger}>{errors.season}</p>)}</div>

                    <div>
                        <p>Add countries</p>
                        <div id="countriesRepo" className={s.repo}>
                        </div>
                        <select name="addedCountries" id="addedCountries" className={s.selectBox}>
                            {props.allCountries.map(country =>
                                <option value={country.name} key={country.id}>{country.name}</option>
                            )}
                        </select>
                        <button onClick={clickHandler} className={s.addActivityBtn}>Add country</button>
                    </div>
                    
                    { (<input type="submit" disabled={Object.keys(errors).length !== 0} value="Add your Activity!" className={s.submitBtn}/>)}
                    
                </form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, {loadAllCountries})(FormActivity);
