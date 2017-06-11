<template>
    <div class="Pokemon">
        <div class="View">
            <div class="Header">
                <router-link to="/"><el-button type="primary" icon="arrow-left" class="Back"></el-button></router-link>
                <h1 class="Header-title">{{ pokemon.name }} &nbsp; <Favorite :id="$route.params.id"/></h1>
            </div>

            <el-row :gutter="10" class="List">
                <el-col class="Pokemon-view">

                    <div class="Pokemon-shortStats">
                        <el-tag>ID: {{ pokemon.id }}</el-tag>
                        <el-tag>Weight: {{ pokemon.weight }}</el-tag>
                        <el-tag>Height: {{ pokemon.height }}</el-tag>
                        <el-tag type="gray">Order: {{ pokemon.order }}</el-tag>
                        <el-tag type="primary">Base experience: {{ pokemon.base_experience }}</el-tag>
                        <el-tag type="gray">Abilities:
                            <span v-for="(ability, index) in pokemon.abilities" v-show="!ability.is_hidden" :key="index">
                                {{ ability.ability.name }}
                            </span>
                        </el-tag>
                    </div>

                    <div class="Pokemon-image">
                        <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ $route.params.id + '.png'" />
                        <div class="Pokemon-shortStats">
                            <el-tag v-for="(type,index) in pokemon.types" :key="index">{{ type.type.name }}</el-tag>
                        </div>
                    </div>

                    <el-row :gutter="20" class="Main">
                        <el-col :xs="24" :sm="8" :md="8" :lg="8">

                            <ul class="Pokemon-stats">
                                <li v-for="stat in pokemon.stats">
                                    <p>{{ stat.stat.name.replace('-', ' ') }}: {{ stat.base_stat }}</p>
                                    <el-progress :show-text="false" :stroke-width="18" :percentage="stat.base_stat > 100 ? 100 : stat.base_stat"></el-progress>
                                </li>
                            </ul>

                        </el-col>

                        <el-col :xs="12" :sm="8" :md="8" :lg="8">

                            <el-card class="Moves" :body-style="{padding: '10px 0'}">
                                <div slot="header">
                                    <h2 class="Moves-title">Moves list</h2>
                                </div>
                                <ul>
                                    <li v-for="(move, index) in pokemon.moves" :key="index" @click="getMoveInfo(move.move.name)" class="Moves-item" :class="singleMove.name == move.move.name ? 'is-active' : ''">
                                        {{ move.move.name.replace('-', ' ') }}
                                    </li>
                                </ul>
                            </el-card>

                        </el-col>

                        <el-col :xs="12" :sm="8" :md="8" :lg="8" v-if="singleMove">

                            <el-card class="Move" :body-style="{padding: '10px 0'}">
                                <div slot="header">
                                    <h2 class="Moves-title">{{ singleMove.name }}</h2>
                                </div>
                                <ul>
                                    <li class="Move-item">
                                        Type: {{ singleMove.type.name }}
                                    </li>
                                    <li class="Move-item">
                                        Accuracy: {{ singleMove.accuracy }}
                                    </li>
                                    <li class="Move-item">
                                        Power: {{ singleMove.power }}
                                    </li>
                                    <li class="Move-item">
                                        PP: {{ singleMove.pp }}
                                    </li>
                                    <li class="Move-item">
                                        Priority: {{ singleMove.priority }}
                                    </li>
                                    <li class="Move-item">
                                        Damage class: {{ singleMove.damage_class.name }}
                                    </li>
                                </ul>
                            </el-card>

                        </el-col>

                    </el-row>

                </el-col>
            </el-row>
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
            pokemon: [],
            favoritePokemons: localStorage.getItem('favoritePokemons') ? localStorage.getItem('favoritePokemons').split(',') : '',
            singleMove: false,
            loadingList: false
        }
    },

    mounted() {
        this.getOne();
    },

    methods: {
        async getOne () {
            try {
                this.loadingList = Loading.service({
                    text: 'Looking for pokemons ...'
                });
                const response = await API.get(`pokemon/${this.$route.params.id}/`);
                this.pokemon = response.data;

                this.getMoveInfo(this.pokemon.moves[0].move.name);

                this.loadingList.close();
            } catch (e) {
                console.error(e);
            }
        },
        async getMoveInfo (moveName) {
            try {
                this.loadingList = Loading.service({
                    text: 'Looking for pokemon move ...'
                });
                const response = await API.get(`move/${moveName}/`);
                this.singleMove = response.data;

                this.loadingList.close();
            } catch (e) {
                console.error(e);
            }
        }
    },

    components: {
        Favorite
    }
}
</script>
