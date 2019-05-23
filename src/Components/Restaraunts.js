import React, { Component } from 'react';
import axios from "axios";
import Map from './Map.js';
import Search from './Search.js';

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
                <ul>
                    {this.state.restaraunts.map(place => (
                        <li key={place.id}> {place.name} <br /> 
                        Price = {place.price_level} <br />
                        Rating = {place.rating} <br /> <br /> 
                        </li>
                    ))}
                </ul>
                
                {/* display the map only if the state has been set */}
                {this.state.restaraunts.length !== 0 ? (
                    <Map restaraunts = {this.state.restaraunts} / >
                ):(
                    <div />
                )
                }

                {/* display search bar in restaraunts component */}
                <Search restaraunts = {this.state.restaraunts} / >


            </div>
        )
    }
}

export default Restaraunts;
