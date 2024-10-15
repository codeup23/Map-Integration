import React, { useEffect, useRef, useState } from 'react';
import { Map as MapLibreMap, NavigationControl, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl'; // For accessing MapLibre's LngLatBounds
import axios from 'axios'; // For fetching places from the database
import HoverCard from './HoverCard'; // Import HoverCard component

const MapComponent = ({ mapComponentRef }) => {
  const mapContainerRef = useRef(null);
  const [places, setPlaces] = useState([{ name: 'Delhi', lat: 28.61, lng: 77.23, description: 'Capital of India', _id: 'delhi123', isMarked: true }]); // Store default Delhi place
  const apiKey = '5siyDljYYJ4tQ7tuNBCNZLtXIMw6Frskos1MOYe3'; // Your API key

  const [hoveredPlace, setHoveredPlace] = useState(null); // State for the hovered place
  const [hoverPosition, setHoverPosition] = useState(null); // State for hovercard position
  const [popup, setPopup] = useState(null);

  // Fetch places from your database
  const fetchPlacesFromDatabase = async () => {
    try {
      const response = await axios.get('/api/places'); // Adjust to your API
      setPlaces((prevPlaces) => [...prevPlaces, ...response.data]); // Add fetched places to the default Delhi marker
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    fetchPlacesFromDatabase(); // Fetch places on component mount

    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
      zoom: 0.65, // Default zoom
      center: [0, 23], // Keep center at the world initially
      transformRequest: (url, resourceType) => {
        url = url.replace('app.olamaps.io', 'api.olamaps.io');
        if (url.includes('?')) {
          url = url + '&api_key=' + apiKey;
        } else {
          url = url + '?api_key=' + apiKey;
        }
        return { url, resourceType };
      },
    });

    map.addControl(new NavigationControl(), 'top-left');

    // Set the map background to light orange and water to blue
    map.on('style.load', () => {
      map.setPaintProperty('background', 'background-color', '#fcca86');
      const waterLayer = map.getStyle().layers.find((layer) => layer.id.includes('water'));
      if (waterLayer) {
        map.setPaintProperty(waterLayer.id, 'fill-color', '#5fbbf1');
      }

      // Add source and layer for places
      if (places.length > 0) {
        map.addSource('places-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: places.map((place) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [place.lng, place.lat],
              },
              properties: {
                isInDatabase: true,
                name: place.name,
                description: place.description,
                _id: place._id,
                isMarked: place.isMarked,
              },
            })),
          },
        });

        map.addLayer({
          id: 'places-layer',
          type: 'circle',
          source: 'places-source',
          paint: {
            'circle-radius': 8,
            'circle-color': '#ff0000', // Red color for the city markers
          },
        });

        // Hover and click functionality for markers
        map.on('mouseenter', 'places-layer', (e) => {
          const place = e.features[0].properties;
          const coordinates = e.features[0].geometry.coordinates.slice();
          const pixelCoords = map.project(coordinates);

          setHoveredPlace(place); // Set the place details
          setHoverPosition({ x: pixelCoords.x, y: pixelCoords.y }); // Set the hovercard position
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'places-layer', () => {
          setHoveredPlace(null); // Clear hover data
          setHoverPosition(null);
          map.getCanvas().style.cursor = '';
        });

        map.on('click', 'places-layer', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          map.flyTo({
            center: coordinates,
            zoom: 5,
            essential: true,
          });
        });
      }
    });

    return () => map.remove();
  }, [places]);

  return (
    <div ref={mapComponentRef} id='mapComponent' 
      className='mapComponent min-h-screen flex flex-col md:flex-row justify-around items-center mx-auto py-10 px-6 bg-gradient-to-b from-orange-100 to-orange-100'>
      <div className='text-box flex flex-col items-center justify-center md:w-1/2 w-full mb-8 md:mb-0 px-6'>
        <h2 className='text-3xl md:text-4xl text-center md:text-left font-bold mb-4'>
          Find the right place for your vacation!</h2>
        <p className='text-base md:text-lg text-center md:text-left leading-relaxed mb-6 px-2'>
          Explore the destination you're planning to visit through people's blogs and their stay experiences so that you plan better next time. 
          Make a list of most wanted places you want to visit, hop-on in!</p>
      </div>

      <div id="map" ref={mapContainerRef} className={`h-[500px] w-7/12 rounded-lg max-h-[500px] relative`}>
        {hoveredPlace && hoverPosition && (
          <div
            style={{
              position: 'absolute',
              left: `${hoverPosition.x}px`,
              top: `${hoverPosition.y}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <HoverCard place={hoveredPlace} onClose={() => setHoveredPlace(null)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
