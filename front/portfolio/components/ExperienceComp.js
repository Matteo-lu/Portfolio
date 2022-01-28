let ExperienceComp = {
    template: `
    <section id="experience" class="services-mf route">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="title-box text-center">
                        <h3 class="title-a">
                        Eperience
                        </h3>
                        <p class="subtitle-a">
                            My work experience
                        </p>
                        <div class="line-mf"></div>
                    </div>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-3 justify-content-center">
                <div v-for="(experience, index) in userExperience">
                    <div class="col mb-4" style="height:90%; overflow-wrap:break-word; word-wrap:break-word;">
                        <div class="service-box">
                            <div class="service-ico">
                                <span class="ico-circle"><i class="fas fa-briefcase"></i></span>
                            </div>
                            <div class="service-content">
                                <h2 class="s-title">{{ experience.role }}</h2>
                                <p class="s-description text-center">{{ experience.company }}</p>
                                <p class="s-description text-center" v-if="experience.experience_year">
                                    {{ experience.experience_year }} years of experience
                                </p>
                                <p class="s-description text-center">
                                    {{ experience.experience_description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `,
    created () {
        this.getExperience();
    },
    data () {
        return {
            userId: sessionStorage.getItem("userId"),
            userExperience: null
        }
    },
    methods: {
        getExperience () {
            fetch(`${BASEURL}/experience/` + this.userId)
            .then(response => response.json())
            .then(data => this.userExperience = data);
        },
    },
    mounted() {
    },
    components: {
    }
}
