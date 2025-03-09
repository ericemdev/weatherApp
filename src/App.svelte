<script>
    import { onMount } from 'svelte';
    import './style.css';

    let location = "Narok";
    let userInput = "";
    let loading = false;
    let weatherData = null;
    let error = null;

    //must have an api key to access the openweathermap api
    const apiKey = "Enter your api key here..";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

    async function checkClim() {
        if (!location) {
            error = "Please enter a location";
            return;
        }

        loading = true;
        weatherData = null;
        error = null;

        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const response = await fetch(`${apiUrl}q=${location}&appid=${apiKey}&units=metric`);

            if (!response.ok) {
                error = "Location not found";
                return;
            }

            weatherData = await response.json();
            error = null;
        } catch (err) {
            error = err.message;
            weatherData = null;
        }
        await delay;
        loading = false;
    }

    function searchLocation() {
        if (userInput.trim()) {
            location = userInput.trim();
            checkClim();
        }
    }

    onMount(() => {
        checkClim();
    });
</script>

<div class="max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 text-white p-6">
    <div class="text-center mb-8">
        <h1 class="text-2xl font-bold">Weather App</h1>
        <div class="flex justify-center mt-4">
            <input type="text" bind:value={userInput} placeholder="Enter city/town name..." class="p-2 rounded-l-lg text-black"/>
            <button on:click={searchLocation} class="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Search
            </button>
        </div>
    </div>

    {#if loading}
        <div class="text-center text-xl animate-pulse">
            ⏳ Fetching weather data...
        </div>
    {/if}

    {#if error}
        <p class="text-red-500 text-center">{error}</p>
    {/if}

    {#if weatherData}
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold">{weatherData.name}</h1>
            <p class="text-gray-200">{new Date(weatherData.dt * 1000).toLocaleDateString()}</p>
        </div>

        <div class="bg-white/20 backdrop-blur-md rounded-lg p-6 text-center mb-8">
            <div class="text-8xl">☀️</div>
            <p class="text-6xl font-bold">{weatherData.main.temp}°C</p>
            <p class="text-xl">{weatherData.weather[0].description}</p>
        </div>

        <div class="mb-8">
            <h2 class="text-xl font-bold mb-4">Details</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center">
                    <p class="text-lg">Humidity</p>
                    <p class="text-xl">{weatherData.main.humidity}%</p>
                </div>
                <div class="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center">
                    <p class="text-lg">Wind</p>
                    <p class="text-xl">{weatherData.wind.speed} m/s</p>
                </div>
            </div>
        </div>
    {/if}

</div>

