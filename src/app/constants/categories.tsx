import { Zap, Crown, Star, Award, Car, Gauge, Settings } from "lucide-react";

export const categoriasIcons = {
    'supercar': <Zap className="w-4 h-4" />,
    'hypercar': <Crown className="w-4 h-4" />,
    'luxury-sedan': <Star className="w-4 h-4" />,
    'luxury-suv': <Award className="w-4 h-4" />,
    'convertible': <Car className="w-4 h-4" />,
    'coupe-gran-turismo': <Gauge className="w-4 h-4" />,
    'deportivo-clasico': <Settings className="w-4 h-4" />
};

export const categoriasLabels = {
    'supercar': 'Supercar',
    'hypercar': 'Hypercar',
    'luxury-sedan': 'Sedán de Lujo',
    'luxury-suv': 'SUV de Lujo',
    'convertible': 'Convertible',
    'coupe-gran-turismo': 'Coupé GT',
    'deportivo-clasico': 'Clásico'
};