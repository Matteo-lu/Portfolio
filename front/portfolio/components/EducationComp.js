let EducationComp = {
    template: `
    <section id="service" class="services-mf route" v-if="userEducation">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="title-box text-center">
                        <h3 class="title-a">
                        Education
                        </h3>
                        <p class="subtitle-a">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </p>
                        <div class="line-mf"></div>
                    </div>
                </div>
            </div>
            <div class="row" v-for="(education, index) in userEducation">
                <div class="col-md-4">
                    <div class="service-box">
                        <div class="service-ico">
                            <span class="ico-circle"><i class="ion-monitor"></i></span>
                        </div>
                        <div class="service-content">
                            <h2 class="s-title">{{ education.title }}</h2>
                            <b><p class="s-description text-center">{{ education.institute }}</p></b>
                            <i><p class="s-description text-center">
                                {{ education.education_year.toString().substring(0, 2) }}, {{ education.education_year.toString().substring(2, 6) }}
                            </p></i>
                            <p class="s-description text-center">
                                {{ education.education_description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `,
    created () {
        this.getEducation();
    },
    data () {
        return {
            userId: localStorage.getItem("userId"),
            userEducation: null,
        }
    },
    methods: {
        getEducation () {
            fetch(`${BASEURL}/education/` + this.userId)
            .then(response => response.json())
            .then(data => this.userEducation = data);
        },
    },
    mounted() {
    },
    components: {
    }
}
