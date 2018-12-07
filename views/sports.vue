<template>
    <div id="app">
        <div id="top">
            <ul>
                <li><a class="top-button" href="/all-types">Tous les Types</a></li>
                <li><a class="top-button" href="/all-sports">Tous les Sports</a></li>
            </ul>
            <h1><a href="/">SPORT'MAN</a></h1>
            <div></div>
        </div>
        <div class="content">
            <div id="video">
                <iframe id="yt-frame" width="560" height="315" :src='"https://www.youtube.com/embed/"+ mainVideo' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div>
                    <img :alt='video.id.videoId' :src='"https://i.ytimg.com/vi/" + video.id.videoId + "/default.jpg"' v-for="video in videos" onclick="switchVid(this)" v-bind:key="video.id.videoId" >
                </div>
            </div>
            <div id="recomm">
                <a :href='"/sports/" + sport.id' class="sport-card" v-for="sport in sports" v-bind:key="sport.id" >
                    <img :src='sport.relationships.images.data'>
                    <h3>{{sport.attributes.name}}</h3>
                </a>
            </div>
        </div>
        <div id="bot">
            <p>Réalisé pour la Nuit de l'info</p>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            videos: [],
            sports: []
        }
    }
}
</script>