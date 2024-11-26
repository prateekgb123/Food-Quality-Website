import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/check-quality', (req, res) => {
    const { foodName, expirationDate, storageCondition, appearance } = req.body;

    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysUntilExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

    let quality = 'Good';

    if (daysUntilExpiration < 0) {
        quality = 'Expired';
    } else if (daysUntilExpiration < 3) {
        quality = 'Poor';
    } else if (daysUntilExpiration < 7) {
        quality = 'Fair';
    }

    if (appearance < 5) {
        quality = 'Poor';
    }

    if (storageCondition === 'roomTemperature' && ['milk', 'meat', 'fish'].includes(foodName.toLowerCase())) {
        quality = 'Poor';
    }

    res.json({ quality });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

