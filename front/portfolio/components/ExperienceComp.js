let ExperienceComp = {
    template: `
    <section id="service" class="services-mf route">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="title-box text-center">
                        <h3 class="title-a">
                        Eperience
                        </h3>
                        <p class="subtitle-a">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </p>
                        <div class="line-mf"></div>
                    </div>
                </div>
            </div>
            <div class="row" v-for="(experience, index) in userExperience">
                <div class="col-md-4">
                    <div class="service-box">
                        <div class="service-ico">
                            <span class="ico-circle"><i class="ion-monitor"></i></span>
                            </div>
                            <div class="service-content">
                            <h2 class="s-title">{{ experience.role }}</h2>
                            <b><p class="s-description text-center">{{ experience.company }}</p></b>
                            <i><p class="s-description text-center">
                                {{ experience.experience_year }}
                            </p></i>
                            <p class="s-description text-center">
                                {{ experience.experience_description }}
                            </p>
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
            userId: localStorage.getItem("userId"),
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
