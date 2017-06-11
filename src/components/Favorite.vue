<template>
    <el-tooltip effect="dark" :content="isInFavorites(id) ? 'Remove from favorites' : 'Add to favorites'" placement="top">
        <el-button
            :icon="isInFavorites(id) ? 'star-on' : 'star-off'"
            type="text"
            class="Pokemon-favorite"
            @click="favorite(id)">
        </el-button>
    </el-tooltip>
</template>

<script>

export default {
    data () {
        return {
            favoritePokemons: localStorage.getItem('favoritePokemons') ? localStorage.getItem('favoritePokemons').split(',') : '',
        }
    },

    props: {
        id: {
            type: String,
            required: true
        }
    },

    methods: {
        favorite (id) {
            if (window.localStorage){
                const currentFavorites = localStorage.getItem('favoritePokemons') || '';

                if (!this.isInFavorites(id)){
                    const newFavorites = currentFavorites ? currentFavorites + ',' + id : '' + id;
                    localStorage.setItem('favoritePokemons', newFavorites);
                } else {
                    let currentFavoritesArray = currentFavorites.split(',');
                    const index = currentFavoritesArray.indexOf(id);
                    if (index != -1) {
                        currentFavoritesArray.splice(index, 1);
                        localStorage.setItem('favoritePokemons', currentFavoritesArray.join(','));
                    }
                }

                this.favoritePokemons = localStorage.getItem('favoritePokemons') ? localStorage.getItem('favoritePokemons').split(',') : '';
            }
        },
        isInFavorites (id) {
            if (this.favoritePokemons.includes(id)){
                return true;
            }
            return false;
        }
    }

}

</script>
