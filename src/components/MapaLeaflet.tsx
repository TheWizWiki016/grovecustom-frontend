'use client'

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

import { MapPin } from 'lucide-react'

import { MapContainerProps, MarkerProps, PopupProps } from 'react-leaflet'
import type { TileLayerProps } from 'leaflet'
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

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
