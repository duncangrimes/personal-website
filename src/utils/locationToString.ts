
export default function locationToString(location: { city: string, state?: string, country?: string }): string {
    const { city, state, country = 'US' } = location;
    return (`${city}${(state) ? `, ${state}` : ''}${(country !== 'US') ? `(${country})` : ''}`)
}