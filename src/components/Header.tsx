"use client"

import { useState } from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Header() {
    return (
        <header className="bg-[var(--dark)] text-white shadow-md px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[var(--gold)]">Grove Custom</h1>

                {/* Menú para md+ */}
                <nav className="hidden md:block">
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-6">
                            <NavigationMenuItem>
                                <Link href="/" passHref>
                                    <NavigationMenuLink asChild>
                                        <span className="cursor-pointer hover:text-[var(--gold)] transition-colors">Inicio</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/autos" passHref>
                                    <NavigationMenuLink asChild>
                                        <span className="cursor-pointer hover:text-[var(--gold)] transition-colors">Autos</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/contacto" passHref>
                                    <NavigationMenuLink asChild>
                                        <span className="cursor-pointer hover:text-[var(--gold)] transition-colors">Contacto</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Menú hamburguesa para sm */}
                <MobileMenu />
            </div>
        </header>
    )
}

function MobileMenu() {
    const [open, setOpen] = useState(false)

    return (
        <div className="md:hidden relative">
            <button
                aria-label="Toggle menu"
                className="text-[var(--gold)] focus:outline-none"
                onClick={() => setOpen(!open)}
            >
                {/* Icono hamburguesa simple */}
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {open ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    )}
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--dark)] border border-gray-700 rounded-md shadow-lg z-50">
                    <ul className="flex flex-col p-2 space-y-2">
                        <li>
                            <Link href="/" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-[var(--gold)] hover:text-[var(--dark)] rounded">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/autos" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-[var(--gold)] hover:text-[var(--dark)] rounded">
                                Autos
                            </Link>
                        </li>
                        <li>
                            <Link href="/contacto" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-[var(--gold)] hover:text-[var(--dark)] rounded">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
