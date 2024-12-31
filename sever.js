import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Static Files
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

// Food Data
const foodData = {
    rice: { calories: 130, storage: 'roomTemperature' },
    bread: { calories: 79, storage: 'roomTemperature' },
    milk: { calories: 42, storage: 'refrigerator' },
    eggs: { calories: 68, storage: 'refrigerator' },
    cheese: { calories: 402, storage: 'refrigerator' },
    chicken: { calories: 239, storage: 'refrigerator' },
};

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

    const food = foodData[foodName.toLowerCase()];
    if (!food) {
        return res.status(400).json({ error: 'Unknown food item' });
    }

    if (storageCondition !== food.storage) {
        quality = 'Poor';
    }

    res.json({
        foodName,
        quality,
        calories: food.calories,
        daysUntilExpiration,
        recommendedStorage: food.storage,
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
