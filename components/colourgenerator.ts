function getRandomLightColor() {
    // Generates random RGB values with a focus on lighter colors
    const r = Math.floor(Math.random() * 128 + 128); // RGB values from 128 to 255
    const g = Math.floor(Math.random() * 128 + 128);
    const b = Math.floor(Math.random() * 128 + 128);
    
    return `rgb(${r}, ${g}, ${b})`;
}
export default getRandomLightColor