function randomColor() {
    let generate_color = Math.floor(Math.random() * 16777215);
    // console.log(generate_color);
    let hex_color = "#" + generate_color;
    return hex_color

}

function changeColor() {
    let x = document.getElementById("changescolor")
    setInterval(() => {
        x.style.backgroundColor = `${randomColor()}`;
    }, 1000);
}
changeColor()


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



