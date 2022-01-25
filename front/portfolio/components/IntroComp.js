let IntroComp = {
    template: `
    <div v-if="userInformation">
        <div id="home" class="intro route bg-image" style="background-image: url(images/LandBack.png)">
            <div class="overlay-itro"></div>
                <div class="intro-content display-table">
                    <div class="table-cell">
                        <div class="container">
                            <h1 class="intro-title mb-4">I am {{ userInformation.full_name }}</h1>
                            <p class="intro-subtitle">{{ userInformation.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    created () {
        this.getIntroducton();
    },
    data () {
        return {
            userId: localStorage.getItem("userId"),
            userInformation: null
        }
    },
    methods: {
        getIntroducton () {
            fetch(`${BASEURL}/information/` + this.userId)
            .then(response => response.json())
            .then(data => this.userInformation = data);
        }
    },
    mounted() {
    },
    beforeMount(){
    },
    components: {
    }
}
