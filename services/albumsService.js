const axios = require('axios');
const fs = require('fs');
const path = require('path');

class AlbumsService {
  async generarCSV() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      const albums = response.data.slice(0, 15);

      let csv = 'userId,id,title\n';
      
      albums.forEach(album => {
        csv += `${album.userId},${album.id},"${album.title}"\n`;
      });

      const filePath = path.join(__dirname, '../database/albums_15.csv');
      fs.writeFileSync(filePath, csv, 'utf8');

      return csv;
    } catch (error) {
      throw new Error(`Error al generar CSV: ${error.message}`);
    }
  }
}

module.exports = new AlbumsService();

