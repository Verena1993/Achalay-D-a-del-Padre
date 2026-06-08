const { Jimp } = require('jimp');
const path = require('path');

const files = [
    'Hero_Source_1.jpeg',
    'Hero_Source_2.jpeg',
    'Hero_Source_3.jpeg',
    'Hero_Source_4.jpeg',
    'Hero_Source_5.jpeg'
];

async function run() {
    console.log("Analyzing average RGB values of Hero_Source images...");
    for (const file of files) {
        const filePath = path.join(__dirname, 'assets', file);
        const image = await Jimp.read(filePath);
        
        let rSum = 0, gSum = 0, bSum = 0;
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        
        let count = 0;
        for (let x = 0; x < width; x += Math.floor(width / 10)) {
            for (let y = 0; y < height; y += Math.floor(height / 10)) {
                const color = image.getPixelColor(x, y);
                // In Jimp, getPixelColor returns RGBA or ABGR depending on platform. 
                // Let's decompose it assuming RGBA (or just inspect relative color balances)
                const r = (color >> 24) & 0xff;
                const g = (color >> 16) & 0xff;
                const b = (color >> 8) & 0xff;
                
                rSum += r;
                gSum += g;
                bSum += b;
                count++;
            }
        }
        
        const rAvg = Math.round(rSum / count);
        const gAvg = Math.round(gSum / count);
        const bAvg = Math.round(bSum / count);
        
        console.log(`${file}: Avg RGB(${rAvg}, ${gAvg}, ${bAvg})`);
    }
}

run().catch(console.error);
