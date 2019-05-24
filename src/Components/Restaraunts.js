import React, { Component } from 'react';
import axios from "axios";
import Map from './Map.js';
import './Restaraunts.css';

const API_KEY = process.env.REACT_APP_API_KEY;

// make filter search bar results by restaraunt name or address
function searchingFor(term){
    return function(x){
            return x.name.toLowerCase().includes(term.toLowerCase()) 
            || x.formatted_address.toLowerCase().includes(term.toLowerCase())
            || !term;
    } 
}

export class Restaraunts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaraunts: [],
            term: '',
        };
        this.searchHandler = this.searchHandler.bind(this);
    }   

    searchHandler(event){
        this.setState({term: event.target.value})
    }
        
    componentDidMount() {
        let url = `https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Charlottesville&open_now=True&key=` + API_KEY;
        axios.get(url).then(res => {
            this.setState({ restaraunts: res.data.results }); 
            //console.log(this.state.restaraunts);       
            //console.log(res);
        });
        }

    render() {

        console.log("restaraunts in render,", this.state.restaraunts)
        return (
            <div>
                <h1>Restaraunt Finder</h1>
                <div className="resList">
                    <h3><u>Search Results by Name or Address</u></h3>

                    {/* Restaraunt Search Bar */}
                    <form>
                        <input type="text"
                            onChange={this.searchHandler}
                        ></input>
                    </form>

                    <ul>
                        {this.state.restaraunts.filter(searchingFor(this.state.term)).map(place => (
                                <li key={place.id}> <b> {place.name} </b> <br /> 
                                Price = {place.price_level} <br />
                                Rating = {place.rating} <br /> <br /> 
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="map">
                    {/* display the map only if the state has been set */}
                    {this.state.restaraunts.length !== 0 ? (
                        <Map restaraunts = {this.state.restaraunts} / >
                    ):(
                        <div />
                    )
                    }
                </div>
            </div>
        )
    }
}

export default Restaraunts;