<template>
    <div class="Pokemons">
        <div class="Header">
            <h1 class="Header-title">Pokedex</h1>

            <el-button type="primary" :icon="filtersOpen ? 'close' : 'menu'" class="Hamby" @click="filtersOpen = !filtersOpen"></el-button>

            <div class="Filter" :class="filtersOpen ? 'is-active' : ''">
                <el-form :inline="true">
                    <el-form-item>
                        <el-input placeholder="Filter by name" v-model="search" @change="filter()"></el-input>
                    </el-form-item>
                    <el-form-item label="Show per page">
                        <el-select v-model.number="limit" placeholder="Show per page" @change="paginate(true)" number>
                            <el-option label="36" value="36"></el-option>
                            <el-option label="60" value="60"></el-option>
                            <el-option label="120" value="120"></el-option>
                            <el-option label="240" value="240"></el-option>
                            <el-option label="all" value="9999999"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox @change="showOnlyFavorites" v-model="onlyFavorites" v-show="favoritePokemons.length > 0">My favorites only</el-checkbox>
                    </el-form-item>
                    <el-button type="primary" @click="filtersOpen = false" class="Filter-submit">Filter</el-button>
                </el-form>
            </div>
        </div>

        <el-row :gutter="10" class="List">
            <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="(pokemon, index) in filter(pokemons)" :key="index" class="Pokemon-item">
                <el-card :body-style="{ padding: '10px' }">
                    <div class="Pokemon-inner" @click="view(pokemon.url.split('/pokemon/')[1].replace('/',''))" v-loading="loadingOne === pokemon.url">
                        <img class="Pokemon-image" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.url.split('/pokemon/')[1].replace('/','') + '.png'" />
                        <div class="Pokemon-info">
                            <h2 class="Pokemon-name">{{ pokemon.name }}</h2>
                        </div>
                    </div>
                    <Favorite :id="pokemon.url.split('/pokemon/')[1].replace('/','')"/>
                </el-card>
            </el-col>
        </el-row>

        <div class="Pagination">
            <el-pagination
                v-show="limit != 9999999"
                layout="prev, pager, next"
                @current-change="paginate();"
                :current-page.sync="currentPage"
                :total="total"
                :page-size="limit">
            </el-pagination>
        </div>
    </div>
</template>

<script>

import {API} from '@/pokeapi';
import { Loading } from 'element-ui';
import Favorite from '@/components/Favorite';

export default {
    data () {
        return {
            pokemons: [],
            loadingOne: false,
            loadingList: false,
            favoritePokemons: localStorage.getItem('favoritePokemons') ? localStorage.getItem('favoritePokemons').split(',') : '',
            search: '',
            limit: 36,
            offset: 0,
            total: 0,
            currentPage: 1,
            onlyFavorites: false,
            filtersOpen: false
        }
    },

    created() {
        this.getList();
    },

    methods: {
        async getList () {
            try {
                this.loadingList = Loading.service({
                    text: 'Looking for pokemons ...'
                });

                const response = await API.get(`pokemon/?limit=${this.limit}&offset=${this.offset}`);
                this.total = response.data.count;
                this.pokemons = response.data.results;
                this.loadingList.close();
                this.filtersOpen = false;

            } catch (e) {
                console.error(e);
            }
        },
        async view (url) {
            this.$router.push('/pokemon/' + url + '/');
        },
        paginate (resetOffset) {
            const multiplier = this.currentPage > 1 ? this.currentPage : 0;
            if (resetOffset){
                this.offset = 0;
                this.currentPage = 1;
            } else {
                this.offset = this.limit * multiplier;
                this.getList();
            }
        },
        filter () {
            return this.pokemons.filter(pokemon => {
                if (this.onlyFavorites){
                    return this.favoritePokemons.includes(pokemon.url.split('/pokemon/')[1].replace('/',''));
                } else {
                    return pokemon.name.indexOf(this.search.toLowerCase()) > -1
                }
            });
        },
        async showOnlyFavorites () {
            if (this.onlyFavorites){
                this.limit = 999999;
                this.filter()
            } else {
                this.limit = 36;
            }
        }
    },

    components: {
        Favorite
    }
}
</script>
