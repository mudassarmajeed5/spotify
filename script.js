async function main() {

    async function getmusic() {
        let music = await fetch('https://mudassarmajeed5.github.io/spotify/Songs')
        let response = await music.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = document.getElementsByTagName("a");
        let songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index]
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href)
            }
        }
        return songs;
    }

    currentIndex = 0
    let audio = new Audio();
    
    async function togglebutton() {
        let music_list = await getmusic();
        var currentTrack = music_list[0];
        
        audio.src = currentTrack;
        audio.addEventListener('loadedmetadata', function() {
            let slider = document.getElementById("seekbar");
            slider.max = audio.duration
            slider.min = 0;
        });
        audio.addEventListener("timeupdate",()=>{
            let slider = document.getElementById("seekbar")
            slider.value = audio.currentTime;
        })
        


        // Seekbar Default track;
        let new_list_fixing = currentTrack.split("/");
        let adding_value = new_list_fixing[4].replace(/%20/g, " ");
        let remove_mp3 = adding_value.slice(0, -4)
        document.getElementById("current_song").innerHTML = remove_mp3;



        // Adding functionality of muting and unmuting songs
        let mute = document.getElementById("change_mute_unmute");
        console.log(mute);
        mute.addEventListener("click", () => {
            audio.muted ? audio.muted = false : audio.muted = true;
            audio.muted ? mute.src = "Images/mute.svg" : mute.src = "Images/high_vol.svg"

        })


        // Decorating song names here before adding them to the your library list.
        // we are also styling and are creating cards for each song.

        let UL_list = document.getElementById("librarysongs");
        for (let song = 0; song < music_list.length; song++) {
            let new_list = music_list[song].split("/");
            let song_list = new_list[4].replace(/%20/g, " ");
            let liElement = document.createElement("li");
            liElement.textContent = song_list;
            UL_list.appendChild(liElement);
        }


        console.log(music_list);
        let icon = document.getElementById("play-pause");
        icon.addEventListener("click", () => {

            if (icon.getAttribute('src').includes('play')) {
                icon.setAttribute('src', `Images/pause.svg`)
                console.log('Play');
                audio.play();
            }
            else {
                icon.setAttribute('src', `Images/play.svg`)
                console.log('Pause');
                audio.pause();
            }
        })
        let forwards = document.getElementById("forwards").addEventListener("click", () => {
            if (currentIndex < music_list.length - 1) {
                currentIndex = currentIndex + 1;
                console.log(music_list[currentIndex]);
                icon.setAttribute('src', `Images/pause.svg`)
                audio.src = music_list[currentIndex]
                let song_name_value = audio.src;
                let new_list_fixing = song_name_value.split("/");
                let adding_value = new_list_fixing[4].replace(/%20/g, " ");
                let remove_mp3 = adding_value.slice(0, -4)
                document.getElementById("current_song").innerHTML = remove_mp3;
                audio.play();
                // Background to current song in the list when playing.
                document.getElementById("librarysongs").children[currentIndex].style.backgroundColor = "rgba(255,255,255,0.1)";
                //This will remove the boder from the previous child;
                let previousChild = document.getElementById("librarysongs").children[currentIndex - 1];
                if (previousChild) {
                    previousChild.style.backgroundColor = "transparent";
                }
                audio.addEventListener('loadedmetadata', function() {
                    let slider = document.getElementById("seekbar");
                    slider.max = audio.duration
                    slider.min = 0;
                });
                audio.addEventListener("timeupdate",()=>{
                    let slider = document.getElementById("seekbar")
                    slider.value = audio.currentTime;
                })
                
                

            }
            else {
                alert('No more forward tracks');
            }
        })
        let backwards = document.getElementById("backwards").addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex = currentIndex - 1;
                icon.setAttribute('src', `Images/pause.svg`)
                console.log(music_list[currentIndex]);
                audio.src = music_list[currentIndex];
                let song_name_value = audio.src;
                let new_list_fixing = song_name_value.split("/");
                let adding_value = new_list_fixing[4].replace(/%20/g, " ");
                let remove_mp3 = adding_value.slice(0, -4)
                document.getElementById("current_song").innerHTML = remove_mp3;
                audio.play();

                document.getElementById("librarysongs").children[currentIndex + 1].style.backgroundColor="transparent";
                let currentIndexes = document.getElementById("librarysongs").children[currentIndex];

                if (currentIndexes) {
                    currentIndexes.style.backgroundColor = "rgba(255,255,255,0.1)";

                }


            }
            else {
                alert('No more previous tracks');

            }
        })
    }
    togglebutton();

}
main()



