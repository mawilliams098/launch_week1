import React, { Component } from 'react'
import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY;

export class Restaraunts extends Component {

    state = {
        restaraunts: []
    };
        
componentDidMount() {
    let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Charlottesville&open_now=True&key=` + API_KEY;
      axios.get(url).then(res => {
          this.setState({ restaraunts: res.data.results });        
        console.log(res);
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
            </div>
        )
    }
}

export default Restaraunts
