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

    if (storageCondition === 'roomTemperature' && [
        'Rice', 'Bread', 'Butter', 'Milk', 'Eggs', 'Cheese', 'Chicken', 'Beef', 'Pork', 'Fish', 'Potatoes', 'Tomatoes', 'Onions', 'Garlic', 'Carrots', 'Spinach', 'Cucumber', 'Bell Peppers', 'Bananas', 'Apples', 'Oranges', 'Lemons', 'Limes', 'Strawberries', 'Blueberries', 'Yogurt', 'Coffee', 'Tea', 'Sugar', 'Salt', 'Pepper', 'Olive Oil', 'Vinegar', 'Pasta', 'Noodles', 'Oats', 'Cornflakes', 'Peanut Butter', 'Jam', 'Honey', 'Soup', 'Salad', 'Lettuce', 'Beans', 'Lentils', 'Chickpeas', 'Tofu', 'Cottage Cheese', 'Butter Milk', 'Chapati', 'Paratha', 'Tortilla', 'Bacon', 'Sausages', 'Hamburger', 'Pizza', 'Hot Dog', 'Sandwich', 'Ketchup', 'Mayonnaise', 'Mustard', 'Chips', 'Popcorn', 'Crackers', 'Cereal', 'Porridge', 'Smoothies', 'Ice Cream', 'Cookies', 'Muffins', 'Brownies', 'Cake', 'Cupcakes', 'Pancakes', 'Waffles', 'French Toast', 'Syrup', 'Rice Cakes', 'Granola Bars', 'Trail Mix', 'Mashed Potatoes', 'Fried Rice', 'Scrambled Eggs', 'Boiled Eggs', 'Grilled Chicken', 'Roast Vegetables', 'Salsa', 'Guacamole', 'Pickles', 'Dried Fruits', 'Nuts', 'Chocolates', 'Soup Stock', 'Herbal Tea', 'Curry', 'Stew', 'Juice', 'Smoothies', 'Watermelon', 'Pineapple', 'Grapes', 'Kiwi', 'Pear'].includes(foodName.toLowerCase())) {
        quality = 'Poor';
    }

    res.json({ quality });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

