'use client'

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

// Importa los tipos correctos
import { MapContainer as MapContainerBase, TileLayer as TileLayerBase, Marker as MarkerBase, Popup as PopupBase } from 'react-leaflet'

const MapContainer = dynamic(async () => (await import('react-leaflet')).MapContainer, {
    ssr: false,
}) as typeof MapContainerBase

const TileLayer = dynamic(async () => (await import('react-leaflet')).TileLayer, {
    ssr: false,
}) as typeof TileLayerBase

const Marker = dynamic(async () => (await import('react-leaflet')).Marker, {
    ssr: false,
}) as typeof MarkerBase

const Popup = dynamic(async () => (await import('react-leaflet')).Popup, {
    ssr: false,
}) as typeof PopupBase

const position: [number, number] = [22.7589614, -102.5592065]

export default function MapaLeaflet() {
    return (
        <div className="rounded-xl overflow-hidden shadow-2xl mt-12">
            <MapContainer center={position} zoom={13} style={{ height: '320px', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Grove Custom Cars <br /> Zacatecas, México
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
