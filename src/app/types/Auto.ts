// types/Auto.ts
export type Auto = {
    _id: string;
    marca: string;
    modelo: string;
    descripcion: string;
    precio: number;
    imagenes: string[];
    categoria?: string;
    año?: number;
    caballosFuerza?: number;
    tipoCombustible?: string;
    potencia?: string;
    cilindrada?: string;
    transmision?: string;
};