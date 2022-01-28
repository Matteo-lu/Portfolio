#!/usr/bin/node
const FormComp = Vue.component('form-comp', {
    template: `
    <div class="wrapper" v-if="userInformation">
        <div class="wrap">
            <div class="sidebar">
                <div class="top-side">
                    <h3>{{ userInformation.first_name }}'s Profile</h3>
                    <button @click="logOut">Logout</button>
                </div>

                <!-- list -->
                <div class="list">
                    <ul>
                        <li>
                            <a v-bind:class="{ active: showComp.introComp }" id="top" href="#" @click="showIntro">
                                <span class="icon"><i class="fas fa-user"></i></span>
                                <span class="item">Introduction</span>
                            </a>
                        </li>
                        <li>
                            <a v-bind:class="{ active: showComp.eduComp }" href="#" @click="showEdu">
                                <span class="icon"><i class="fas fa-book"></i></span>
                                <span class="item">Education</span>
                            </a>
                        </li>
                        <li>
                            <a v-bind:class="{ active: showComp.expeComp }" href="#" @click="showExp">
                                <span class="icon"><i class="fas fa-briefcase"></i></span>
                                <span class="item">Experience</span>
                            </a>
                        </li>
                        <li>
                            <a v-bind:class="{ active: showComp.skillComp }" href="#" @click="showSkill">
                                <span class="icon"><i class="fas fa-user-cog"></i></span>
                                <span class="item">Skills</span>
                            </a>
                        </li>
                        <li>
                            <a v-bind:class="{ active: showComp.proComp }" href="#" @click="showPro">
                                <span class="icon"><i class="fas fa-project-diagram"></i></span>
                                <span class="item">Project</span>
                            </a>
                        </li>
                    </ul>
                    <button @click="toPortfolio" >Portfolio</button>
                </div>
            </div>
            <div class="content">
                <IntroductionComp
                v-show="showComp.introComp"
                />
                <EducationComp v-show="showComp.eduComp"/>
                <ExperienceComp v-show="showComp.expeComp"/>
                <SkillsComp v-show="showComp.skillComp"/>
                <ProjectsComp v-show="showComp.proComp"/>
            </div>
        </div>
    </div>
    `,
    data () {
        return {
            userInformation: null,
            showComp: {
                introComp: true,
                eduComp: false,
                expeComp: false,
                skillComp: false,
                proComp: false
            },
            userId: sessionStorage.getItem("userId")
        }
    },
    methods: {
        showIntro() {
            this.showComp.introComp = true;
            this.showComp.eduComp = false;
            this.showComp.expeComp = false;
            this.showComp.skillComp = false;
            this.showComp.proComp = false;
        },
        showEdu() {
            this.showComp.introComp = false;
            this.showComp.eduComp = true;
            this.showComp.expeComp = false;
            this.showComp.skillComp = false;
            this.showComp.proComp = false;
        },
        showExp() {
            this.showComp.introComp = false;
            this.showComp.eduComp = false;
            this.showComp.expeComp = true;
            this.showComp.skillComp = false;
            this.showComp.proComp = false;
        },
        showSkill() {
            this.showComp.introComp = false;
            this.showComp.eduComp = false;
            this.showComp.expeComp = false;
            this.showComp.skillComp = true;
            this.showComp.proComp = false;
        },
        showPro() {
            this.showComp.introComp = false;
            this.showComp.eduComp = false;
            this.showComp.expeComp = false;
            this.showComp.skillComp = false;
            this.showComp.proComp = true;
        },
        showNothing() {
            this.showComp.introComp = false;
            this.showComp.eduComp = false;
            this.showComp.expeComp = false;
            this.showComp.skillComp = false;
            this.showComp.proComp = false;
        },
        toPortfolio() {
            location.href = "http://127.0.0.1:5500/front/portfolio/index.html";
        },
        logOut () {
            sessionStorage.clear();
            location.href = "http://127.0.0.1:5500/front/signin/index.html";
        },
        getInfromation() {
            fetch(`${BASEURL}/user/` + this.userId)
            .then(response => response.json())
            .then(data => this.userInformation = data);
        },
    },
    mounted() {
        this.getInfromation();
    },
    components: {
        IntroductionComp,
        EducationComp,
        ExperienceComp,
        ProjectsComp,
        SkillsComp,
    }
})
