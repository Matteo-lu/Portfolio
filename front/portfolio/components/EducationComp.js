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
                            The studies I have completed
                        </p>
                        <div class="line-mf"></div>
                    </div>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-3 justify-content-center">
                <div v-for="(education, index) in userEducation">
                    <div class="col mb-4" style="height:90%; overflow-wrap:break-word; word-wrap:break-word;">
                        <div class="service-box">
                            <div class="service-ico">
                                <span class="ico-circle"><i class="fas fa-user-graduate"></i></span>
                            </div>
                            <div class="service-content">
                                <h2 class="s-title">{{ education.title }}</h2>
                                <p class="s-description text-center">{{ education.institute }}</p>
                                <p class="s-description text-center" v-if="education.start_date && education.finish_date">
                                    From {{ education.start_date }} to {{ education.finish_date }}
                                </p>
                                <p class="s-description text-center" v-if="education.start_date && !education.finish_date">
                                    Start date: {{ education.start_date }}
                                </p>
                                <p class="s-description text-center" v-if="!education.start_date && education.finish_date">
                                    Finish date: {{ education.finish_date }}
                                </p>
                                <div class="description">
                                    <p class="s-description text-center">
                                        {{ education.education_description }}
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
        this.getEducation();
    },
    data () {
        return {
            userId: sessionStorage.getItem("userId"),
            userEducation: null,
        }
    },
    methods: {
        getEducation () {
            fetch(`${BASEURL}/user/education/` + this.userId)
            .then(response => response.json())
            .then(data => this.userEducation = data);
        },
    },
    mounted() {
    },
    components: {
    }
}
