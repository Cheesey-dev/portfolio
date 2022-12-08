const lanyard = new WebSocket("wss://api.lanyard.rest/socket");


var statusIcon = document.getElementById("statusIcon");
var statusContent = document.getElementById("statusContent");
var statusImage = document.getElementById("statusImage2")
var durum = document.getElementById("spotifyBox");
var aktivite = document.getElementById("activityBox")


var api = {};
var received = false;

lanyard.onopen = function() {
    lanyard.send(
        JSON.stringify({
            op: 2,
            d: {
                subscribe_to_id: "389071682649849868",
            },
        })
    );
};

setInterval(() => {
    if (received) {
        lanyard.send(
            JSON.stringify({
                op: 3,
            })
        );
    }
}, 30000);

lanyard.onmessage = function(event) {
    received = true;
    api = JSON.parse(event.data);

    if (api.t === "INIT_STATE" || api.t === "PRESENCE_UPDATE") {
        update_presence();
    }
};

const avatar = "https://images-ext-2.discordapp.net/external/ZwPnK3Ojrc8GmoZ8pRiqo-E29pHgTwY8GzsCRCP8DvA/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/676442309927370752/a_0409bc630ce75cdd1c75b870cd5d549a.gif"


function update_presence() {
    if (statusIcon != null) {
        update_status(api.d.discord_status);
    }

    if (api.d.discord_status === "dnd") {
        statusContent.innerHTML = `<span class="w-3 h-3 bg-red-500 rounded-full inline-flex ml-1 mr-2"></span>Do not Disturb `;
        statusImage.innerHTML = `<img src="${avatar}" style="color: white; border: 5px solid red;" class="animate-img">`

    } else if (api.d.discord_status === "idle") {
        statusContent.innerHTML = `<span class="w-3 h-3 bg-red-500 rounded-full inline-flex ml-1 mr-2"></span>Idle `
        statusImage.innerHTML = `<img src="${avatar}" style="color: white; border: 5px solid orange;" class="animate-img">`

    } else if (api.d.discord_status === "online") {
        statusContent.innerHTML = `<span class="w-3 h-3 bg-green-500 rounded-full inline-flex ml-1 mr-2"></span>Online `;
        statusImage.innerHTML = `<img src="${avatar}" style="color: white; border: 5px solid green;" class="animate-img">`

    } else if (api.d.discord_status === "offline") {
        statusContent.innerHTML = `<span class="w-3 h-3 bg-gray-500 rounded-full inline-flex ml-1 mr-2"></span>Offline `;
        statusImage.innerHTML = `<img src="${avatar}" style="color: white; border: 5px solid gray;" class="animate-img">`

    } else {
        statusContent.innerHTML = `<div class="animate-pulse"><i class="fas fa-spinner-third"></i> Loading</div>`;

    }

    if (api.d.listening_to_spotify === true) {

        durum.innerHTML = `<span> 
        <img src="${api.d.spotify.album_art_url}" style="border-radius: 35%; float: right;">
        <p> Listening to Spotify </p> 
        <p> ${api.d.spotify.song} </p> 
        <p style="font-size: 20px;"> ${api.d.spotify.artist} </p> 
        </span>`;

    } else {
        durum.innerHTML = `<span>
         <p style="margin: 4% auto">I don't listen to Spotify.</p> 
        </span> `;

    }

    let a = api.d.activities[0]
    let mew;

    if(a) {
        if(a.name === "Spotify") {
            aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1044678135607722055/boring.gif"> <p>Nothing is playing</p> </span>`
        } else {

            if(a.name === "Visual Studio Code") {
                aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1047525638581530645/2422-visual-studio-code.png"> <p>Playing ${a.name}</p> </span>`
            } else if(a.name === "VALORANT") {
                aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1047525962268545095/valorant-logo-FAB2CA0E55-seeklogo.com.png"> <p>Playing ${a.name}</p> </span>`
            } else if(a.name === "Minecraft") {
                aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1047528204073701426/8772-minecraft-world-cube.png"> <p>Playing ${a.name}</p> </span>`
            } else if(a.name === "Amoung Us") {
                aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1047528204413435984/images.png"> <p>Playing ${a.name}</p> </span>`
            } else if(a.name === "osu!") {
                aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1047528307027083374/Osulogo.png"> <p>Playing ${a.name}</p> </span>`
            } else if(a.name === "Super Animal Royale") {
                aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1047528449339826306/lauZLdS0_400x400.jpg"> <p>Playing ${a.name}</p> </span>`
            } else {
                aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1047528660464308284/6313-question-icon.png"> <p>Playing ${a.name}</p> </span>`
            }

        }
    } else {
        aktivite.innerHTML =`<span> <img src="https://cdn.discordapp.com/attachments/1037014428383707266/1044678135607722055/boring.gif"> <p>Nothing is playing</p> </span>`
    }


   /* if(b) {
        if(b.name == "Spotify") {
            if(a.name == "Spotify") {
                document.getElementById('activityBox').style.display = 'none'
            } else {
                aktivite.innerHTML =`<span> <p>Playing ${a.name}</p> </span>`
            }
        } else {
        aktivite.innerHTML =`<span> <p>Playing ${b.name}</p> </span>`
        }
    } else if(a) {
        if(a.name == "Spotify") {
            if(a.name == "Spotify") {
                document.getElementById('activityBox').style.display = 'none'
            } else {
                aktivite.innerHTML =`<span> <p>Playing ${a.name}</p> </span>`
            }
        } else {
        aktivite.innerHTML =`<span> <p>Playing ${a.name}</p> </span>`
        }
        } else {
            document.getElementById('aktivite').style.display = 'none'
        }*/

}
