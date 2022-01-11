class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.currentKick = "/Beats/kick-classic.wav";
        this.currentSnare = "/Beats/snare-acoustic01.wav";
        this.currentHihat = "/Beats/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.playBtn = document.querySelector('.play');
        this.index=0;
        this.bpm=210;
        this.isplaying=null;
        this.selects =document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    // will make the color of pads more vibrant(with adding 'active' class) after selecting(by click event listener)
    activePad(){
        this.classList.toggle("active");
    }
    // function to loop over the pads
    repeat(){
        let step = this.index % 8;
        // console.log(step);
        const activeBars = document.querySelectorAll(`.b${step}`);
        // console.log(activeBars);
        
        // loop over the selected or active pads which we will get from the activebars
        activeBars.forEach(bar =>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            // check if pads are active
            if (bar.classList.contains("active")){
                // check for each sound
                if (bar.classList.contains("kick-pad")) {
                    // current time property of audio tag property will set the current playback position of the track
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
                
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime=0;
                    this.snareAudio.play();
                }
                
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }

    // will invoke the repeat method
    start(){
        // the this inside the set interval method will point towards the outer this as arrow function does not have this binding

        // the formula saved in interval variable is to make the milliseconds in setinterval method not fixed
        const interval = (60/this.bpm)*1000; 
        // check if is.playing is null
        if (this.isplaying) {
            clearInterval(this.isplaying);
            // console.log(this.isplaying);
            this.isplaying=null;
        }else{
            this.isplaying = setInterval(()=>{
                this.repeat();
            },interval);
        }       
    }
    updateBtn(){
        // to check if the beats are playing
        if (this.isplaying) {
            this.playBtn.innerText="Stop";
            this.playBtn.classList.add('active');            
        }else{
            this.playBtn.innerText="Play";
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
        // console.log(e);
        // to grab the name from all the select tags
        const selectionName = e.target.name; 
        // console.log(selectionName);
        
        // to get the value from the option from all the select tags
        const selectionValue = e.target.value; 
        // console.log(selectionValue);
 
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        // console.log(muteIndex);
        if(e.target.classList.contains("active")){
            switch(muteIndex){
            case "0":
                this.kickAudio.volume=0;
                break;
            case "1":
                this.snareAudio.volume=0;
                break;
            case "2":
                this.hihatAudio.volume=0;
                break;    
            }
        
        }else{
            switch(muteIndex){
            case "0":
                this.kickAudio.volume=1;
                break;
            case "1":
                this.snareAudio.volume=1;
                break;
            case "2":
                this.hihatAudio.volume=1;
                break;    
            }
        }
    }
    changeTempo(e){
        // console.log(e);
        const tempoText = document.querySelector(".tempo-num");
        
        // updating the bpm
        this.bpm = e.target.value;
        
        // displaying the value of tempo
        tempoText.innerText=e.target.value;
        // console.log(this.bpm); 
    }
    updateTempo(){
        clearInterval(this.isplaying);
        this.isplaying=null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        }
    }
}

const drumKit = new DrumKit();

// Event Listeners

// at pads
drumKit.pads.forEach(pad =>{
    pad.addEventListener("click",drumKit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation="";
    });
});

// at play button
drumKit.playBtn.addEventListener('click',function(){
    drumKit.start();
    drumKit.updateBtn();
});

// at selects tag
drumKit.selects.forEach(select =>{
    select.addEventListener("change", function(e){
        drumKit.changeSound(e);
    });
});

// at mute button
drumKit.muteBtns.forEach(btn =>{
    btn.addEventListener("click", function(e){
        drumKit.mute(e);
    });
});

// at tempo slider
drumKit.tempoSlider.addEventListener("input", function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function(){
    drumKit.updateTempo();
});