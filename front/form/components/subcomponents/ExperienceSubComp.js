let ExperienceSubComp = {
    template: `
    <div class="course">
        <div class="course-preview">
            <h6>Role</h6>
            <h2>{{ role | titleSize }}</h2>
            <a class="update">Update<i class="fas fa-chevron-right"></i></a>
        </div>
        <div class="course-info">
            <h6>Company</h6>
            <a class="delete" @click="deleteItem">x</a>
            <h2>{{ company | titleSize }}</h2>
            <p>From {{ startDate }} to {{ finishDate }}</p>
            <p>{{ description | descriptionSize }}</p>
        </div>
    </div>
    `,
    data () {
        return {
        }
    },
    methods: {
        deleteItem () {
            fetch(`${BASEURL}/experience/` + this.id, {
            method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                this.$parent.getExperience();
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        }
    },
    props: [
        'id',
        'company',
        'startDate',
        'finishDate',
        'role',
        'description'
    ],
    filters: {
        descriptionSize (value) {
            if (value.length >= 20) {
                return value.substring(0, 90) + '...';
            }
            return value
        },
        titleSize (value) {
            if (value.length >= 20) {
                return value.substring(0, 20) + '...';
            }
            return value
        }
    }
}
