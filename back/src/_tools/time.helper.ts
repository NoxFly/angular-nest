/**
 * Prend en argument un string du type "[0-9]+[smhdy]" et retourne le nombre de secondes correspondant
 * Exemples :
 * - "1s" => 1
 * - "1m" => 60
 * - "1h" => 3600
 * - "1d" => 86400
 * - "1y" => 31536000
 */
export function convertTime(time: string, returnUnit: 's' | 'ms'): number {
    const value = parseInt(time, 10);
    const unit = time[time.length - 1];

    const translatedTime = getTranslatedTime(value, unit, returnUnit);

    return translatedTime;
}

const getTranslatedTime = (value: number, unit: string, returnUnit: string): number => {
    if(unit === returnUnit) {
        return value;
    }

    switch(unit) {
        case 's':
            return value * times[returnUnit][0];
        case 'm':
            return value * times[returnUnit][1];
        case 'h':
            return value * times[returnUnit][2];
        case 'd':
            return value * times[returnUnit][3];
        case 'y':
            return value * times[returnUnit][4];
        default:
            return 0;
    }
};

const times = {
    's': [1, 60, 3600, 86400, 31536000],
    'ms': [1000, 60000, 3600000, 86400000, 31536000000],
};