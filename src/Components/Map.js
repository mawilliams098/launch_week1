import React from 'react';
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'

import * as ELG from 'esri-leaflet-geocoder';

import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl; // used to resolve the broken marker icon 

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

export default class Map extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            restaraunts: props.restaraunt
        };
    }

    componentDidMount(){

        // set up map display
        this.map = L.map('map', {
            // where the map display starts
            center:[38.05,-78.5], 
            zoom: 12.5,
            zoomControl: true,
        });

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
            detectRetina: true, 
            maxZoom:20, 
            maxNativeZoom:17,
        }).addTo(this.map);

        // resolve the broken marker image
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });

        // geocoder search feature
        const searchControl = new ELG.Geosearch().addTo(this.map);
        const results = new L.LayerGroup().addTo(this.map);
    
        searchControl.on('results', function(data){
            results.clearLayers();
            for (let i = data.results.length - 1; i >= 0; i--) {
                console.log(L.marker(data.results[i].latlng));
                results.addLayer(L.marker(data.results[i].latlng));
            }
        });

        // add markers for each restaraunt at the coordinates from google places
        for (let i = 0; i < this.props.restaraunts.length; i++) {
            L.marker([this.props.restaraunts[i].geometry.location.lat, this.props.restaraunts[i].geometry.location.lng])
            .addTo(this.map)
            .bindPopup('<strong>' + this.props.restaraunts[i].name + '</strong>' + '<br>' + this.props.restaraunts[i].formatted_address);  
        };  
    }

    render(){
        console.log("props from render()", this.props);
        return (<Wrapper width = "640px" height= "500px" id="map" />
       
        );
    }
}