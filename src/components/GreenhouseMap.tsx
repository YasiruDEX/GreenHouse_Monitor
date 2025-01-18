import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface GreenhouseMapProps {
  location: {
    lat: number;
    lng: number;
  };
  name: string;
}

const GreenhouseMap = ({ location, name }: GreenhouseMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [location.lng, location.lat],
      zoom: 15
    });

    // Add marker
    new mapboxgl.Marker()
      .setLngLat([location.lng, location.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${name}</h3>`))
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [location, name, mapboxToken]);

  return (
    <div className="space-y-4">
      {!mapboxToken && (
        <div className="mb-4">
          <label htmlFor="mapboxToken" className="block text-sm font-medium text-gray-700">
            Enter your Mapbox public token to view the map
          </label>
          <input
            type="text"
            id="mapboxToken"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="pk.eyJ1..."
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="mt-1 text-sm text-gray-500">
            Get your token from{' '}
            <a
              href="https://mapbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Mapbox Dashboard
            </a>
          </p>
        </div>
      )}
      <div ref={mapContainer} className="h-64 rounded-lg shadow-lg" />
    </div>
  );
};

export default GreenhouseMap;