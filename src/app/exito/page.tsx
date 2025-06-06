// app/exito/page.tsx
'use client'

import { Suspense } from 'react'
import ExitoContent from './ExitoContent'

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <ExitoContent />
        </Suspense>
    )
}
