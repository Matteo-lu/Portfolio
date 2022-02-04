let ProjectsComp = {
    template: `
    <section id="work" class="portfolio-mf sect-pt4 route" v-if="userProject">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="title-box text-center">
                        <h3 class="title-a">
                        Portfolio
                        </h3>
                        <p class="subtitle-a">
                            Projects I have developed
                        </p>
                        <div class="line-mf"></div>
                    </div>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-3 justify-content-center">
                <div v-for="(project, index) in userProject">
                    <div class="col mb-4">
                        <div class="work-box" style="height:90%; overflow-wrap:break-word; word-wrap:break-word;">
                            <div class="work-img">
                                <img src="images/projectImage.jpg" alt="" class="img-fluid">
                            </div>
                            <div class="work-content">
                                    <div class="service-content">
                                        <h2 class="s-title">{{ project.project_name }}</h2>
                                        <p class="s-description text-center">{{ project.technology }}</p>
                                        <p class="s-description text-center"><a class="githubLink" v-bind:href="project.github_link" v-if="project.github_link">Github</a><a class="demoVideo" v-bind:href="project.demo_link" v-if="project.demo_link">Demo</a></p>
                                        <p class="s-description text-center">
                                            {{ project.description }}
                                        </p>
                                    </div>
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
        this.getProject();
    },
    data () {
        return {
            userId: sessionStorage.getItem("userId"),
            userProject: null
        }
    },
    methods: {
        getProject () {
            fetch(`${BASEURL}/user/project/` + this.userId)
            .then(response => response.json())
            .then(data => this.userProject = data);
        },
    },
    mounted() {
    },
    components: {
    }
}
