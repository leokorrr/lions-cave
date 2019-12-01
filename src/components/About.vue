<template>
    <div class="about">
        <div class="header-underlined header-underlined--page-title">
            <h2 class="header header-underlined__text header-underlined__text--page-title">About</h2>
            <div class="header-underlined__underline header-underlined__underline--page-title"></div>
        </div>
        <div class="posts-box">
            <div class="posts">
                <div class="post">
                    <p class="text text--big text--description">
                        "Web developer. <span class="red">Designer</span>. Belarus origin. 
                        <span class="red">Living in Poland</span>. Melomaniac. <span class="red">Citizen of the world</span>"</p>
                </div>
            </div>
        </div>
        <div class="info-cards-box">
            <div class="info-cards">
                <div class="info-card">
                    <div class="info-card__red-line-box">
                        <div class="info-card__red-line"></div>
                    </div>
                    <div class="info-card__inner">
                        <p class="text bold info-card__main"><span>{{timeYear}}Y</span> <span v-if="timeMonth !== 0">{{timeMonth}}M</span></p>
                        <p class="text info-card__secondary">in the field</p>
                    </div>
                </div>
                <div class="info-card">
                    <div class="info-card__red-line-box info-card__red-line-box--non-horizontal">
                        <div class="info-card__red-line"></div>
                    </div>
                    <div class="info-card__inner">
                        <p class="text bold info-card__main">ME?N</p>
                        <p class="text info-card__secondary">stack</p>
                    </div>
                </div>
                <div class="info-card">
                    <div class="info-card__inner">
                        <a href="https://github.com/leokorrr" class="link">
                            <img src="../img/github-logo.svg" alt="github-logo">
                        </a>
                    </div>
                </div>
                <div class="info-card">
                    <div class="info-card__inner">
                        <a href="https://www.linkedin.com/in/leon-kochetcov-491b81144/" class="link">
                            <img src="../img/linkedin.svg" alt="github-logo">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'posts',
    data() {
        return {
            time: null,
            timeYear: null,
            timeMonth: null
        }
    },
    methods: {
        timeCounter(dateStarted) {
            dateStarted = new Date(dateStarted);
            let today = new Date()

            let time = Math.ceil((Math.abs(today.getTime() - dateStarted.getTime()))/(1000*3600*24*30));
            this.timeYear = Math.floor(time/12)
            this.timeMonth = time - this.timeYear*12;
            console.log(time)
        }
    },
    beforeMount() {
        this.timeCounter('07/01/2018')
    }

}
</script>
