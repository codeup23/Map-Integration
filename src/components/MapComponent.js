import React, { useEffect, useRef, useState } from 'react';
import { Map as MapLibreMap, NavigationControl, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl'; // For accessing MapLibre's LngLatBounds
import axios from 'axios'; // For fetching places from the database

const MapComponent = ({mapComponentRef}) => {
  const mapContainerRef = useRef(null);
  const [places, setPlaces] = useState([]); // State to store places from the database
  const apiKey = '5siyDljYYJ4tQ7tuNBCNZLtXIMw6Frskos1MOYe3'; // Your API key

  const [isSmWindow, setIsSmWindow] = useState(false);

  const handleScreen = () => {
    if(window.innerWidth <= 768) {
      setIsSmWindow(true);
    }
    else{
      setIsSmWindow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleScreen);
    return () => window.removeEventListener('resize', handleScreen);
  }, []);

  // Fetch places from your database (assuming API endpoint returns an array of place objects with lat/lng)
  const fetchPlacesFromDatabase = async () => {
    try {
      const response = await axios.get('/api/places'); // Adjust this to your actual API endpoint
      setPlaces(response.data); // Array of place objects with lat/lng coordinates
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    fetchPlacesFromDatabase(); // Fetch places when component mounts

    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
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

    // Load political boundaries
    map.on('load', () => {
      // Add a country boundary layer using MapLibre's boundary tileset
      map.addLayer({
        id: 'country-boundaries',
        type: 'line',
        source: {
          type: 'vector',
          url: 'maplibre://mapbox.boundaries-v1', // Predefined tileset for boundaries
        },
        'source-layer': 'boundaries',
        layout: {},
        paint: {
          'line-color': '#000000', // Black for boundaries
          'line-width': 1.5,
        },
      });

      // Check if there are places to display
      if (places.length > 0) {
        const bounds = new maplibregl.LngLatBounds();

        map.addSource('places-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: places.map((place) => {
              bounds.extend([place.lng, place.lat]); // Extend bounds for each place
              return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [place.lng, place.lat],
                },
                properties: {
                  isInDatabase: true, // This will help in styling
                  name: place.name, // Additional properties
                },
              };
            }),
          },
        });

        map.addLayer({
          id: 'places-layer',
          type: 'circle',
          source: 'places-source',
          paint: {
            'circle-radius': 8,
            'circle-color': [
              'case',
              ['==', ['get', 'isInDatabase'], true], // Highlight if in database
              '#ff0000', // Red for places in the database
              '#000000', // Black for places not in the database
            ],
          },
        });

        // Fit the map to the bounds of the places
        map.fitBounds(bounds, { padding: 50, maxZoom: 15 });

        let popup = new Popup({ closeButton: false, closeOnClick: false });

        map.on('mouseenter', 'places-layer', (e) => {
          map.getCanvas().style.cursor = 'pointer';

          const coordinates = e.features[0].geometry.coordinates.slice();
          const placeName = e.features[0].properties.name;

          popup
            .setLngLat(coordinates)
            .setHTML(`
              <div>
                <h3>${placeName}</h3>
                <button onclick="viewMore()">View More</button>
                <button onclick="viewBlogs()">View Blogs</button>
              </div>
            `)
            .addTo(map);
        });

        map.on('mouseleave', 'places-layer', () => {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });

        window.viewMore = () => {
          console.log('View More clicked');
          // Implement the logic to view more details for the place
        };

        window.viewBlogs = () => {
          console.log('View Blogs clicked');
          // Implement the logic to view related blogs for the place
        };
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
      
      <div id="map" ref={mapContainerRef} className={`h-[500px] w-7/12 rounded-lg max-h-[500px]`}></div>
    </div>
  );
};

export default MapComponent;
