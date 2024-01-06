function randomColor(){
    let generate_color = Math.floor(Math.random()*16777215);
    // console.log(generate_color);
    let hex_color = "#"+generate_color;
    return hex_color
    
}
let x = document.getElementById("changescolor")
setInterval(() => {
    x.style.backgroundColor=`${randomColor()}`;
}, 1000);
document.getElementById("my_library").addEventListener("click", () => {
    let x = document.querySelector(".left");
    let y = document.querySelector(".right");

    if (y.style.display === "none") {
        y.style.display = "block";
        x.style.display = "none";
        
    } else {
        x.style.display = "block";
        y.style.display = "none";
        
    }
});
