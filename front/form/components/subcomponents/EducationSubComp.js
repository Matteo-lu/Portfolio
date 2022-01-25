let EducationSubComp = {
    template: `
    <div class="course">
        <div class="course-preview">
            <h6>Title</h6>
            <h2>{{ title | titleSize }}</h2>
            <a class="update">Update<i class="fas fa-chevron-right"></i></a>
        </div>
        <div class="course-info">
            <a class="delete" @click="deleteItem(id)">x</a>
            <h6>School</h6>
            <h2>{{ institute | titleSize }}</h2>
            <p v-text="date"></p>
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
        'year',
        'institute',
        'description',
        'months'
    ],
    methods: {
        getDate () {
            if (this.year) {
                this.date = this.year.toString();
                if (this.date.length == 5) {
                    this.date = '0' + this.date;
                }
                console.log(this.date)
                let monthNumber = this.date.substring(0,2);
                this.monthString = this.months[monthNumber];
                this.yearString = this.date.substring(2);
                this.date = this.monthString + ' ' + this.yearString
            }
        },
        deleteItem (id) {
            fetch(`${BASEURL}/education/` + id, {
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
        this.getDate();
    },
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
