let array = [];
let originalArray = [];
let delay = 500;
let isSorting = false;

// Create random array
function generateArray() {
    array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 80) + 20);
    originalArray = [...array];
    renderArray();
}

function renderArray(comparing = [], swapping = [], sorted = []) {
    const container = document.getElementById("visualization");
    container.innerHTML = "";

    const max = Math.max(...array);

    array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${(value / max) * 300}px`;

        if (sorted.includes(index)) bar.classList.add("sorted");
        else if (swapping.includes(index)) bar.classList.add("swapping");
        else if (comparing.includes(index)) bar.classList.add("comparing");

        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const n = array.length;

    for(let i = 0; i < n; i++){
        for(let j = 0; j < n - i - 1; j++){
            renderArray([j, j+1]);
            await sleep(delay);

            if(array[j] > array[j+1]){
                renderArray([], [j, j+1]);
                [array[j], array[j+1]] = [array[j+1], array[j]];
                await sleep(delay);
            }
        }
    }
    renderArray([], [], [...Array(n).keys()]);
}

document.getElementById("startBtn").onclick = async () => {
    if (isSorting) return;

    isSorting = true;
    const algo = document.getElementById("algorithmSelect").value;

    if (algo === "bubble") await bubbleSort();

    isSorting = false;
};

document.getElementById("resetBtn").onclick = () => {
    array = [...originalArray];
    renderArray();
};

document.getElementById("randomBtn").onclick = generateArray;

document.getElementById("speedSlider").oninput = (e) => {
    delay = e.target.value;
};

generateArray();
