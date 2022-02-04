let ProjectSubComp = {
    template: `
    <div class="course">
        <div name="image" class="course-preview">
            <h6>Project name</h6>
            <h2>{{ name | titleSize }}</h2>
            <a class="update">Update<i class="fas fa-chevron-right"></i></a>
        </div>
        <div class="course-info">
            <h6>Project Info</h6>
            <a class="delete" @click="deleteItem">x</a>
            <a v-if="videoExist" class="githubLink" :href="github">Github link</a>
            <a v-if="githubExist" class="demoVideo" :href="video">Demo video</a>
            <p>{{ description | descriptionSize }}</p>
        </div>
    </div>
    `,
    data () {
        return {
            videoExist: false,
            githubExist: false,
            projectElemnt: [],
        }
    },
    props: [
        'id',
        'name',
        'video',
        'github',
        'description',
        'projectItems'
    ],
    filters: {
        descriptionSize (value) {
            if (value) {
                if (value.length >= 20) {
                    return value.substring(0, 90) + '...';
                }
            }
            return value
        },
        titleSize (value) {
            if (value) {
                if (value.length >= 20) {
                    return value.substring(0, 20) + '...';
                }
                return value
            }
        }
    },
    methods: {
        checkLinks () {
            if (this.video) {
                this.videoExist = true;
            }
            if (this.github) {
                this.githubExist = true;
            }
        },
        deleteItem () {
            fetch(`${BASEURL}/project/` + this.id, {
            method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                this.$parent.getProject();
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        }
    },
    mounted () {
        this.checkLinks();
    }
}
