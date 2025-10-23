new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "တက်နေပြီဆိုလက်ညှိုးထောင်",
          artist: "လွမ်းပိုင်",
          cover: "./img/1.jpg",
          source: "./mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=y7B9lcQzJCI",
          favorited: false
        },
        {
          name: "မမ",
          artist: "လွမ်းပိုင်",
          cover: "./img/2.jpg",
          source: "./mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=neimnvITIyQ",
          favorited: true
        },
        {
          name: "တစ်ရွာသားအချစ်",
          artist: "လွမ်းပိုင်",
          cover: "./img/3.jpg",
          source: "./mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=Y3cREAWtyVM",
          favorited: false
        },
        {
          name: "ခိုးပြေးမယ်",
          artist: "လွမ်းပိုင်",
          cover: "./img/4.jpg",
          source: "./mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=PP8iPSplNOY",
          favorited: false
        },
        {
          name: "လက်ကျန်သံယောဇဥ်",
          artist: "လွမ်းပိုင်",
          cover: "./img/5.jpg",
          source: "./mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=TVIjd7XOsCg",
          favorited: true
        },
        {
          name: "အားကြီးချစ်တယ်",
          artist: "လွမ်းပိုင်",
          cover: "./img/6.jpg",
          source: "./mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=mKXZfSmrdYw",
          favorited: false
        },
        {
          name: "မင်းကြောင့်",
          artist: "လွမ်းပိုင်",
          cover: "./img/7.jpg",
          source: "./mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=dcsrhoBP2Hk",
          favorited: true
        },
        {
          name: "Apple",
          artist: "လွမ်းပိုင်",
          cover: "./img/8.jpg",
          source: "./mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=EzVsLP6ypxE",
          favorited: false
        },
        {
          name: "ညည်းပဲချစ်တယ်",
          artist: "လွမ်းပိုင်",
          cover: "./img/9.jpg",
          source: "./mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=Z5FRwz5VBF0",
          favorited: false
        },
        {
          name: "A CHIT YAY SO",
          artist: "လွမ်းပိုင်",
          cover: "./img/10.jpg",
          source: "./mp3/10.mp3",
          url: "https://www.youtube.com/watch?v=Azqq8aM-YGQ",
          favorited: false
        },
        {
          name: "REVISION (ROCK STAR)",
          artist: "လွမ်းပိုင်",
          cover: "./img/11.jpg",
          source: "./mp3/11.mp3",
          url: "https://www.youtube.com/watch?v=4z_WfZTSULk",
          favorited: false
        },
        {
          name: "DISS TRACK",
          artist: "လွမ်းပိုင်",
          cover: "./img/12.jpg",
          source: "./mp3/12.mp3",
          url: "https://www.youtube.com/watch?v=FP0XE5Ao2u0",
          favorited: false
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
