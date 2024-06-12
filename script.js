
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
    function control_seekbar_value() {
        let control_seekbar = document.getElementById("seekbar");
        control_seekbar.addEventListener("input", () => {
            audio.currentTime = control_seekbar.value;
        })
    }
    function control_volume() {
        let volume = document.getElementById("volume_controller")
        volume.addEventListener('input', () => {
            audio.volume = volume.value / 100;
        })
    }
    let currentIndex = 0;
    let audio = new Audio();

    async function togglebutton() {

        let music_list = await getmusic();
        var currentTrack = music_list[0];

        audio.src = currentTrack;
        audio.addEventListener('loadedmetadata', function () {
            let slider = document.getElementById("seekbar");
            slider.max = audio.duration
            slider.min = 0;
        });
        audio.addEventListener("timeupdate", () => {
            let slider = document.getElementById("seekbar")
            slider.value = audio.currentTime;
        })
        control_seekbar_value()
        control_volume()

        // Changes

        let new_list_fixing = currentTrack.split("/");


        //      For github
        let adding_value = new_list_fixing[5].replace(/%20/g, " ");


        // For local host
        // let adding_value = new_list_fixing[4].replace(/%20/g, " ")


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

            // Changees for github
            let songList = new_list[5].replace(/%20/g, " ");

            let song_list = songList.slice(0,-4);


            // For local host
            // let song_list = new_list[4].replace(/%20/g, " ")


            let liElement = document.createElement("li");
            liElement.textContent = song_list;
            UL_list.appendChild(liElement);

            liElement.addEventListener("click",()=>{
                let remove_mp3 = liElement.textContent;
                mp3remove = remove_mp3.slice(0,-4);
                document.getElementById("current_song").innerHTML = mp3remove;
                

                let lis = document.getElementsByTagName("li");
                Array.from(lis).forEach(li => {
                    li.style.backgroundColor = "transparent";
                });
                document.getElementById("librarysongs").children[song].style.backgroundColor = "rgba(255,255,255,0.1)";
                let ico = document.getElementById("play-pause");
                ico.getAttribute('src')
                ico.setAttribute('src','Images/pause.svg')
                audio.src = music_list[song];
                audio.play()
            })
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

        // Adding functionality of looping through songs.
        let isLoop = true;

        let loopi = document.getElementById("loopi");
        loopi.addEventListener("click", () => {
            if (loopi.getAttribute('src').includes('no')) {
                loopi.setAttribute('src', 'right-images/loop.svg')
                console.log('Loop on');
                isLoop = true;
        
                if (isLoop) {
                    currentIndex = 0;
                    audio.src = music_list[currentIndex];
                    audio.addEventListener("ended", () => {
                        if (isLoop) {
                            currentIndex = (currentIndex + 1) % music_list.length; // Improved logic for looping
                            audio.src = music_list[currentIndex];
                            let new_name = audio.src;
                            let loop_name = new_name.split('/');
        
                            // for github changes
                            let new_loop_name = loop_name[5].replace(/%20/g, " ");
        
                            // for local host
                            // let new_loop_name = loop_name[4].replace(/%20/g, " ")
        
                            let remove_mp3 = new_loop_name.slice(0, -4);
                            document.getElementById("current_song").innerHTML = remove_mp3;
        
                            // Just some extra code to also change the border colors while looping through the list.
                            document.getElementById("librarysongs").children[currentIndex].style.backgroundColor = "rgba(255,255,255,0.1)";
        
                            // This will remove the border from the previous child;
                            let previousChild = document.getElementById("librarysongs").children[(currentIndex - 1 + music_list.length) % music_list.length];
                            if (previousChild) {
                                previousChild.style.backgroundColor = "transparent";
                            }
                            // End of some extra code to also change the border colors while looping through the list.
        
                            audio.play();
                        }
                    })
                }
        
            } else {
                loopi.setAttribute('src', 'right-images/noloop.svg')
                console.log('Loop off');
                isLoop = false;
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


                // Changes for github
                let adding_value = new_list_fixing[5].replace(/%20/g, " ");

                // For local host
                // let adding_value = new_list_fixing[4].replace(/%20/g, " ")



                let remove_mp3 = adding_value.slice(0, -4)
                document.getElementById("current_song").innerHTML = remove_mp3;
                audio.play();

                // VOlume + seekbar controls
                control_seekbar_value()
                control_volume()
                // Done

                // Background to current song in the list when playing.
                document.getElementById("librarysongs").children[currentIndex].style.backgroundColor = "rgba(255,255,255,0.1)";
                //This will remove the boder from the previous child;
                let previousChild = document.getElementById("librarysongs").children[currentIndex - 1];
                if (previousChild) {
                    previousChild.style.backgroundColor = "transparent";
                }
                audio.addEventListener('loadedmetadata', function () {
                    let slider = document.getElementById("seekbar");
                    slider.max = audio.duration
                    slider.min = 0;
                });
                audio.addEventListener("timeupdate", () => {
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

                // for hosting online
                let adding_value = new_list_fixing[5].replace(/%20/g, " ");


                // // For local host
                // let adding_value = new_list_fixing[4].replace(/%20/g, " ")



                let remove_mp3 = adding_value.slice(0, -4)
                document.getElementById("current_song").innerHTML = remove_mp3;
                audio.play();

                // VOlume + seekbar controls
                control_seekbar_value()
                control_volume()
                // Done

                document.getElementById("librarysongs").children[currentIndex + 1].style.backgroundColor = "transparent";
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
