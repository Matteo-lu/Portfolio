let AboutComp = {
    template: `
        <section id="about" class="about-mf sect-pt4 route" v-if="userInformation">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="box-shadow-full">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-sm-6 col-md-7">
                                            <div class="about-info">
                                            <p><span class="title-s">Name: </span> <span>{{ userInformation.full_name }}</span></p>
                                            <p><span class="title-s">Profile: </span> <span>{{ userInformation.title }}</span></p>
                                            <p><span class="title-s">Email: </span> <span>{{ userInformation.email }}</span></p>
                                            <p><span class="title-s">Phone: </span> <span>{{ userInformation.phone }}</span></p>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="skill-mf" v-for="(skill, index) in skillsInformation">

                                            <span>{{ skill.skill_name }}</span> <span class="pull-right">{{ skill.skill_level*25 }}%</span>
                                            <div class="progress">
                                                <div class="progress-bar" role="progressbar" :style="{ width: skill.skill_level*25 + '%' }" aria-valuenow="20" aria-valuemin="0"
                                                aria-valuemax="100"></div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="about-me pt-4 pt-md-0">
                                            <div class="title-box-2">
                                            <h5 class="title-left">
                                            About me
                                            </h5>
                                        </div>
                                        <p class="lead">
                                            {{ userInformation.about }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    created () {
        this.getIntroducton();
        this.getSkills();
    },
    data () {
        return {
            userId: sessionStorage.getItem("userId"),
            userInformation: null,
            skillsInformation: null
        }
    },
    methods: {
        getIntroducton () {
            fetch(`${BASEURL}/user/information/` + this.userId)
            .then(response => response.json())
            .then(data => this.userInformation = data);
        },
        getSkills () {
            fetch(`${BASEURL}/user/skills/` + this.userId)
            .then(response => response.json())
            .then(data => this.skillsInformation = data);
        }
    },
    mounted() {
    },
    beforeMount(){
    },
    components: {
    }
}
