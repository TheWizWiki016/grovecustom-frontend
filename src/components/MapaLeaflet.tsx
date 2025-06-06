'use client'

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup, TileLayer } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
    ssr: false,
})

const position: LatLngExpression = [22.7589614, -102.5592065]

export default function MapaMapTiler() {
    return (
        <div className="rounded-xl overflow-hidden shadow-2xl mt-12">
            <MapContainer
                style={{ height: '320px', width: '100%' }}
                zoom={13}
                center={position}
            >
                <TileLayer
                    url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
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
