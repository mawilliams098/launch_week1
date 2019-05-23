import React from 'react';
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'

// used to resolve the broken marker icon 
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl;

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

        this.map = L.map('map', {
            center:[38.05,-78.5], // where the map display starts
            zoom: 12.25,
            zoomControl: false
        });

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
            detectRetina: true, 
            maxZoom:20, 
            maxNativeZoom:17,
        }).addTo(this.map);

        // used to resolve the broken marker image
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });

        console.log("props from componentDidMount", this.props.restaraunts[1].geometry.location.lat);

        for (let i = 0; i < this.props.restaraunts.length; i++) {
            L.marker([this.props.restaraunts[i].geometry.location.lat, this.props.restaraunts[i].geometry.location.lng]).addTo(this.map);  
        }  

    }

    render(){
        console.log("props from render()", this.props);
        return (<Wrapper width = "640px" height= "360px" id="map" />
       
        );
    }

}