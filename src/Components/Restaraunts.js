import React, { Component } from 'react';
import axios from "axios";
import Map from './Map.js';
import './Restaraunts.css'

const API_KEY = process.env.REACT_APP_API_KEY;

export class Restaraunts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaraunts: []
        };
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
        return (

            <div>

                <h1>Restaraunt Finder</h1>

                <div className="resList">
                    <h3><u>Your Top Finds</u></h3>
                    <ul>
                        {this.state.restaraunts.map(place => (
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
