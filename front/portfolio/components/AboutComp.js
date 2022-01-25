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
                                        <div class="col-sm-6 col-md-5">
                                            <div class="about-img">
                                            <img src="img/testimonial-2.jpg" class="img-fluid rounded b-shadow-a" alt="">
                                            </div>
                                        </div>
                                        <div class="col-sm-6 col-md-7">
                                            <div class="about-info">
                                            <p><span class="title-s">Name: </span> <span>{{ userInformation.full_name }}</span></p>
                                            <p><span class="title-s">Profile: </span> <span>{{ userInformation.title }}</span></p>
                                            <p><span class="title-s">Email: </span> <span>{{ userInformation.email }}</span></p>
                                            <p><span class="title-s">Phone: </span> <span>{{ userInformation.phone }}</span></p>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="skill-mf" v-if="skillsInformation">
                                        <p class="title-s">Skills</p>
                                        <span>{{ skillsInformation[0].skill_name }}</span> <span class="pull-right">{{ skillsInformation[0].skill_level*25 }}%</span>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" :style="{ width: skillsInformation[0].skill_level*25 + '%' }" aria-valuenow="20" aria-valuemin="0"
                                            aria-valuemax="100"></div>
                                        </div>
                                        <span>{{ skillsInformation[1].skill_name }}</span> <span class="pull-right">{{ skillsInformation[1].skill_level*25 }}%</span>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" :style="{ width: skillsInformation[1].skill_level*25 + '%' }" aria-valuenow="75" aria-valuemin="0"
                                            aria-valuemax="100"></div>
                                        </div>
                                        <span>{{ skillsInformation[2].skill_name }}</span> <span class="pull-right">{{ skillsInformation[2].skill_level*25 }}%</span>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" :style="{ width: skillsInformation[2].skill_level*25 + '%' }" aria-valuemin="0"
                                            aria-valuemax="100"></div>
                                        </div>
                                        <span>{{ skillsInformation[3].skill_name }}</span> <span class="pull-right">{{ skillsInformation[3].skill_level*25 }}%</span>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" :style="{ width: skillsInformation[3].skill_level*25 + '%' }" aria-valuenow="90" aria-valuemin="0"
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
            userId: localStorage.getItem("userId"),
            userInformation: null,
            skillsInformation: null
        }
    },
    methods: {
        getIntroducton () {
            fetch(`${BASEURL}/information/` + this.userId)
            .then(response => response.json())
            .then(data => this.userInformation = data);
        },
        getSkills () {
            fetch(`${BASEURL}/skills/` + this.userId)
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
