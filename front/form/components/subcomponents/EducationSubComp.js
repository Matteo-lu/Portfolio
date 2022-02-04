let EducationSubComp = {
    template: `
    <div class="course">
        <div class="course-preview">
            <h6>Title</h6>
            <h2>{{ title | titleSize }}</h2>
            <a class="update">Update<i class="fas fa-chevron-right"></i></a>
        </div>
        <div class="course-info">
            <a class="delete" @click="deleteItem">x</a>
            <h6>School</h6>
            <h2>{{ institute | titleSize }}</h2>
            <p>From {{ startDate }} to {{ finishDate }}</p>
            <p class="cardDescription">{{ description | descriptionSize }}</p>
        </div>
    </div>
    `,
    data () {
        return {
            monthString: null,
            yearString: null,
            date: null
        }
    },
    props: [
        'id',
        'title',
        'startDate',
        'finishDate',
        'institute',
        'description',
        'months'
    ],
    methods: {
        deleteItem () {
            fetch(`${BASEURL}/education/` + this.id, {
            method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                this.$parent.getEducation();
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        }
    },
    mounted () {
    },
    filters: {
        descriptionSize (value) {
            if (value) {
                if (value.length >= 20) {
                    return value.substring(0, 90) + '...';
                }
                return value
            }
        },
        titleSize (value) {
            if (value) {
                if (value.length >= 20) {
                    return value.substring(0, 20) + '...';
                }
                return value
            }
        }
    }
}
