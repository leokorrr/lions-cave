<template>
    <div class="projects">
        <div class="header-underlined header-underlined--page-title">
            <h2 class="header header-underlined__text header-underlined__text--page-title">My projects</h2>
            <div class="header-underlined__underline header-underlined__underline--page-title"></div>
        </div>
        <div class="project-cards-box">
            <div class="project-cards" v-if="projects && projects.length">
                <div class="project-card" v-for="(project, index) of projects" v-bind:key="index">
                    <a :href="project.project_link" class="link">
                        <div class="project-card__cover">
                            <span v-bind:style={color:project.project_color}>{{project.project_title.charAt(0)}}</span>
                        </div>
                        <hr class="project-card__wrapper">
                        <div class="project-card__info">
                            <div class="header project-card__header">{{project.project_title}}</div>
                            <p class="text project-card__description">{{project.project_description}}</p>
                            <div class="project-card__action">
                                <span class="red">See it live!</span>
                                <span class="project-card__github-logo">
                                    <a :href="project.project_github_link" class="link">
                                        <img src="../img/github-logo.svg" alt="github-logo">
                                    </a>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="header-underlined header-underlined--page-title">
            <h2 class="header header-underlined__text header-underlined__text--subheader">Also worked in:</h2>
            <div class="header-underlined__underline header-underlined__underline--subheader"></div>
        </div>
        <div class="other-projects-box">
            <div class="other-projects" v-if="projects && projects.length">
                    <p class="text other-project" v-for="(firm, index) of firms" v-bind:key="index"><span class="bold other-project__title">{{firm.firm_title}}</span> projects</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Projects',
    data() {
        return {
            projects: [],
            firms: [],
            apiLink: process.env.VUE_APP_BACKEND_URL
        }
    },
    created() {
        axios.get(`${this.apiLink}/api/projects`)
            .then(res => {
                this.projects = res.data
            })
            .catch(err => {
                console.log(err)
            })
        
        axios.get(`${this.apiLink}/api/firms`)
            .then(res => {
                this.firms = res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>
