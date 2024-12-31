document.getElementById('food-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const foodName = document.getElementById('foodName').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const storageCondition = document.getElementById('storageCondition').value;
    const appearance = document.getElementById('appearance').value;

    const response = await fetch('/api/check-quality', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName, expirationDate, storageCondition, appearance }),
    });

    const result = await response.json();
    displayResult(result);
});

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    if (result.error) {
        resultDiv.innerHTML = `<p style="color: red;">${result.error}</p>`;
    } else {
        resultDiv.innerHTML = `
            <h2>Food Quality Results</h2>
            <p><strong>Food Name:</strong> ${result.foodName}</p>
            <p><strong>Quality:</strong> ${result.quality}</p>
            <p><strong>Calories:</strong> ${result.calories} kcal</p>
            <p><strong>Days Until Expiration:</strong> ${result.daysUntilExpiration}</p>
            <p><strong>Recommended Storage:</strong> ${result.recommendedStorage}</p>
        `;
    }
}
