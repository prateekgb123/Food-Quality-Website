document.getElementById('foodForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const foodName = document.getElementById('foodName').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const storageCondition = document.getElementById('storageCondition').value;
    const appearance = document.getElementById('appearance').value;

    try {
        const response = await fetch('/api/check-quality', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foodName,
                expirationDate,
                storageCondition,
                appearance
            }),
        });

        const data = await response.json();

        document.getElementById('qualityResult').textContent = data.quality;
        document.getElementById('result').classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while checking food quality.');
    }
});

