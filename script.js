const arr = [
    "https://firebasestorage.googleapis.com/v0/b/video-streamer-c3037.appspot.com/o/yakkasakka.mp3?alt=media&token=780dd0b6-6c5b-42ca-b4fe-b38dbfbfb56b",
    "https://firebasestorage.googleapis.com/v0/b/video-streamer-c3037.appspot.com/o/pushpa.mp3?alt=media&token=55338297-25d0-424a-ba2f-8667e9fb7050",
    "https://firebasestorage.googleapis.com/v0/b/video-streamer-c3037.appspot.com/o/trademark.mp3?alt=media&token=a094e8b0-83d3-42f1-b53a-560cb5311e1a",
    "https://firebasestorage.googleapis.com/v0/b/video-streamer-c3037.appspot.com/o/neenade.mp3?alt=media&token=2c1487ad-1126-487b-af06-f061f6a9919f"
]
class Node {
    constructor(data) {
        this.next = null;
        this.previous = null;
        this.data = data;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    enqueue(data) {
        const node = new Node(data)
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.previous=this.tail;
            this.tail = node;
        }
        this.tail.next = this.head;
        this.head.previous = this.tail;
    }
    getHeadAndTail() {
        console.log(this.head.data + " " + this.tail.data)
    }
    display() {
        let temp = this.head;
        while (temp != this.tail) {
            console.log(temp.previous?.data+" "+temp.data+" "+temp.next?.data)
            temp = temp.next;
        }
        console.log(temp.previous?.data+" "+temp.data+" "+temp.next?.data)
    }
}
class Musicplayer extends LinkedList {
    constructor() {
        super()
        this.currentMusic = null;
        this.audio=new Audio()
        this.isAudioPaused=true;
    }
    init(arr) {
        for (let data of arr) {
            this.enqueue(data);
        }
        this.currentMusic=this.head;
        this.setAudioSource()
    }
    getCurrentMusic() {
        console.log(this.currentMusic.data)
    }
    nextMusic() {
        this.currentMusic = this.currentMusic.next;
        this.setAudioSource()
        this.isAudioPaused || this.playMusic()
    }
    previousMusic(){
        if (this.currentMusic) {
            this.currentMusic = this.currentMusic.previous;
        }else{
            this.currentMusic=this.head;
        }
        this.setAudioSource()
        this.isAudioPaused || this.playMusic()
    }
    playMusic(){
        this.audio.play()
        this.isAudioPaused=false;
    }
    pauseMusic(){
        this.audio.pause();
        this.isAudioPaused=true;
    }
    setAudioSource(){
        document.getElementById("name").innerText=this.currentMusic.data.slice(this.currentMusic.data.indexOf('/o/')+3,this.currentMusic.data.indexOf('/o/')+15)
        this.audio.src=this.currentMusic.data;
        this.audio.load(); 
        console.log(this.audio)
    }
}
const mp = new Musicplayer()
mp.init(arr)
mp.display()