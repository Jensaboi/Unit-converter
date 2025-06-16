//Round down to max 3 decimals
const FEET = 3.281; // 1 meter = 3.281 feet
const GALLON = 0.264; // 1 liter = 0.264 gallon
const POUND = 2.204; // 1 kilogram = 2.204 pound

const numberInputEl = document.getElementById("number-input");
const containerEl = document.getElementById("container-el");

let isDarkMode = JSON.parse(localStorage.getItem("darkmode") || "false");

applyThemeSettings(isDarkMode);

function applyThemeSettings(theme) {
    document.body.classList.toggle("dark-mode", theme);
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem("darkmode", JSON.stringify(isDarkMode));

    document.body.classList.toggle("dark-mode", isDarkMode);
    if (isDarkMode) {
        document.getElementById("dark-mode-btn").textContent = "🌝";
    } else {
        document.getElementById("dark-mode-btn").textContent = "🌚";
    }
}

function renderElements() {
    const input = parseFloat(numberInputEl.value);
    const data = calculateMetrics(input);
    let domElements = "";

    data.forEach((item) => {
        domElements += `
        <div class="result-card">
            <h3>${item.title}</h3>
            <p>${item.value}</p>
        </div>
        `;
    });
    containerEl.innerHTML = domElements;
}

// returns array with objects. title: string(metric type), value: string(calculation)
function calculateMetrics(num) {
    if (isNaN(num)) return [];
    return [
        {
            title: "Length (Meter/Feet)",
            value: `${num} meters = ${(num * FEET).toFixed(
                3
            )} feet | ${num} feet = ${(num / FEET).toFixed(3)} meters`,
        },
        {
            title: "Volume (Liters/Gallons)",
            value: `${num} liters = ${(num * GALLON).toFixed(
                3
            )} gallons | ${num} gallons = ${(num / GALLON).toFixed(3)} liters `,
        },
        {
            title: "Mass (Kilograms/Pounds)",
            value: `${num} kilo = ${(num * POUND).toFixed(
                3
            )} pounds | ${num} pounds = ${(num / POUND).toFixed(3)} kilos`,
        },
    ];
}

//Initializing btn
document.getElementById("convert-btn").addEventListener("click", () => {
    renderElements();
});

document.getElementById("dark-mode-btn").addEventListener("click", () => {
    toggleDarkMode();
});
