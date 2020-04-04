import React, { Component } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import styled from "styled-components";

import { XYZ as XYZSource} from 'ol/source'
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { fromLonLat } from 'ol/proj'
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';

import DotImage from "../assets/dot.png";

class StoreMap extends Component {
 
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let latitude = this.props.latitude;
    let longitude = this.props.longitude;

    let location = new Point(fromLonLat([longitude, latitude]));
    let marker = new Feature({
      geometry: location,
    })
    marker.setStyle(new Style({
      image: new Icon({
        color: '#e02702',
        crossOrigin: 'anonymous',
        src: DotImage,
        imgSize: [20, 20]
      })
    }));
    var vectorSource = new VectorSource({
      features: [marker]
    });

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZSource({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          })
        }),
        new VectorLayer({
          source: vectorSource
        })
      ],
      // Render the tile layers in a map view
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 16
      })
    })
  }

  render() {
    return(
      <MapContainer id='map'></MapContainer>
    )
  }

}

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

export default StoreMap;