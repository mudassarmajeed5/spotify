function randomColor() {
    // Function to generate a random hexadecimal digit
    function getRandomHexDigit() {
        const hexDigits = '0123456789ABCDEF';
        return hexDigits[Math.floor(Math.random() * 16)];
    }

    // Generate a random hex color
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        hexColor += getRandomHexDigit();
    }

    return hexColor;
}

function changeColor() {
    let x = document.getElementById("changescolor");
    setInterval(() => {
        x.style.backgroundColor = randomColor(); // Use randomColor() directly
    }, 1000);
}

// Call changeColor() to start changing the background color
changeColor();



function open_close() {
    let changeClick = document.getElementById("my_library");
    changeClick.addEventListener("click", () => {
        let x = document.querySelector(".left");
        let y = document.querySelector(".right");

        if (y.style.display === "none") {
            y.style.display = "block";
            x.style.display = "none";
            if (changeClick.getAttribute('src').includes('close')) {
                changeClick.setAttribute('src', 'right-images/bell.svg')
            }
        } else {
            x.style.display = "block";
            y.style.display = "none";
            if (changeClick.getAttribute('src').includes('bell')) {
                changeClick.setAttribute('src', 'right-images/close.svg')
            }
        }
    });
}
open_close()



