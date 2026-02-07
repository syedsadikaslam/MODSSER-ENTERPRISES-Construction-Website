
const fs = require('fs');
try {
    const content = fs.readFileSync('debug_server.txt', 'utf8');
    console.log(content);
} catch (e) {
    console.log('Error reading file:', e.message);
}
