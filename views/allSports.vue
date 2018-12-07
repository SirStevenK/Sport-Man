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
            <h2>Tous les sports</h2>
            <div id="sport-pop">
                <a :href='"/sports/" + sport.id' class="sport-card" v-for="sport in sports" v-bind:key="sport.id" >
                    <img alt="" :src='sport.relationships.images.data'>
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
            title: '',
            sports: [],
            types: []
        }
    }
}
</script>