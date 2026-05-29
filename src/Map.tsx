import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import Map from 'react-map-gl/maplibre';
import Papa from 'papaparse';
// @ts-ignore: allow importing CSS without type declarations
import './Map.css';
import maplibregl from 'maplibre-gl';
// @ts-ignore: allow importing CSS without type declarations
import 'maplibre-gl/dist/maplibre-gl.css';

interface InspectionRecord {
  Inspection_ID: string;
  Establishment_Name: string;
  Site_Address: string;
  Total_Violations: number;
  Initial_Penalty: number;
  Current_Penalty: number;
  Case_Status: string;
  Latitude: number;
  Longitude: number;
}

const Map_Component: React.FC = () => {
  const [data, setData] = useState<InspectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewState, setViewState] = useState({
    longitude: -95,
    latitude: 37.8,
    zoom: 3.5,
    pitch: 0,
    bearing: 0,
  });
  const [colorBy, setColorBy] = useState<'violations' | 'penalty'>('violations');
  const [hoveredRecord, setHoveredRecord] = useState<InspectionRecord | null>(null);

  useEffect(() => {
    fetch('/data.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false,
          complete: (results: any) => {
            const filtered = results.data
              .filter((row: any) => {
                const lat = parseFloat(row.Latitude);
                const lon = parseFloat(row.Longitude);
                return !isNaN(lat) && !isNaN(lon) && lat && lon;
              })
              .map((row: any) => ({
                ...row,
                Latitude: parseFloat(row.Latitude),
                Longitude: parseFloat(row.Longitude),
                Total_Violations: parseInt(row.Total_Violations) || 0,
                Initial_Penalty: parseInt(row.Initial_Penalty) || 0,
                Current_Penalty: parseInt(row.Current_Penalty) || 0,
              }));

            setData(filtered);
            setLoading(false);
            console.log(`✅ Loaded ${filtered.length} geotagged records`);
          },
          error: (error: any) => {
            console.error('CSV parsing error:', error);
            setLoading(false);
          },
        });
      })
      .catch((error) => {
        console.error('Failed to load data:', error);
        setLoading(false);
      });
  }, []);

  const getColor = (record: InspectionRecord): [number, number, number] => {
    if (colorBy === 'violations') {
      const violations = record.Total_Violations || 0;
      const intensity = Math.min(violations / 20, 1);
      return [255, Math.max(50, 150 - intensity * 100), Math.max(50, 100 - intensity * 50)];
    } else {
      const penalty = record.Current_Penalty || 0;
      const intensity = Math.min(penalty / 100000, 1);
      return [
        Math.round(100 + intensity * 155),
        50,
        Math.round(150 + intensity * 105),
      ];
    }
  };

  const scatterplotLayer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: data,
    pickable: true,
    opacity: 0.85,
    radiusScale: 15,
    radiusMinPixels: 2,
    radiusMaxPixels: 40,
    getPosition: (d: InspectionRecord) => [d.Longitude, d.Latitude],
    getRadius: (d: InspectionRecord) => {
      if (colorBy === 'violations') {
        return Math.max(4, Math.min(d.Total_Violations || 0, 50));
      } else {
        return Math.max(4, Math.min((d.Current_Penalty || 0) / 5000, 50));
      }
    },
    getFillColor: (d: InspectionRecord) => getColor(d),
    onHover: (info: any) => {
      if (info.object) {
        setHoveredRecord(info.object as InspectionRecord);
      } else {
        setHoveredRecord(null);
      }
    },
  });

  const totalViolations = data.reduce((sum, r) => sum + (r.Total_Violations || 0), 0);
  const totalPenalties = data.reduce((sum, r) => sum + (r.Current_Penalty || 0), 0);
  const avgViolations = data.length > 0 ? (totalViolations / data.length).toFixed(1) : 0;

  return (
    <div className="map-container">
      <div className="controls">
        <h1>🗺️ OSHA Inspection Map</h1>
        <p className="subtitle">{data.length.toLocaleString()} inspections • 20,816 total records</p>
        
        <div className="control-group">
          <label>Color by:</label>
          <select value={colorBy} onChange={(e) => setColorBy(e.target.value as any)}>
            <option value="violations">Violation Count</option>
            <option value="penalty">Penalty Amount</option>
          </select>
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Records Loaded</span>
            <span className="stat-value">{data.length.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Violations</span>
            <span className="stat-value">{totalViolations.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Violations</span>
            <span className="stat-value">{avgViolations}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Penalties</span>
            <span className="stat-value">${(totalPenalties / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        {hoveredRecord && (
          <div className="tooltip">
            <h3>{hoveredRecord.Establishment_Name}</h3>
            <p><strong>Address:</strong> {hoveredRecord.Site_Address}</p>
            <p><strong>Violations:</strong> {hoveredRecord.Total_Violations}</p>
            <p><strong>Current Penalty:</strong> ${hoveredRecord.Current_Penalty?.toLocaleString()}</p>
            <p><strong>Status:</strong> {hoveredRecord.Case_Status}</p>
          </div>
        )}
      </div>

      {!loading && data.length > 0 && (
        <DeckGL
          initialViewState={viewState}
          onViewStateChange={(e: any) => setViewState(e.viewState)}
          controller={true}
          layers={[scatterplotLayer]}
        >
<Map
  reuseMaps
  mapLib={maplibregl}
  mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
/>
        </DeckGL>
      )}

      {loading && (
        <div className="loading">
          <h2>🗺️ Loading OSHA inspection data...</h2>
          <p>Please ensure data.csv is in the public folder</p>
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="loading error">
          <h2>❌ No data loaded</h2>
          <p>Make sure OSHA_Complete_Dataset_With_Coordinates.csv is in the public folder as data.csv</p>
        </div>
      )}

      <div className="osm-credit">
        © CartoDB | © OpenStreetMap contributors | OSHA Data
      </div>
    </div>
  );
};

export default Map_Component;
