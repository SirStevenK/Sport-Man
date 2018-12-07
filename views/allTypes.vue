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
            <h2>Tous les types de sports</h2>
            <div id="type-pop">
                <a :href='"/all-sports?id=" + type.id' class="sport-card" v-for="type in types" v-bind:key="type.id" >
                    <img alt="" :src='type.relationships.images.data'>
                    <h3>{{type.attributes.name}}</h3>
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