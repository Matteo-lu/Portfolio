let EducationComp = {
    template: `
    <div class="form-content">
        <form
        id="education-form"
        class="education-form"
        @submit="entryPoint">
            <div class="title">
                <h2>Education</h2>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input v-model="education.title" type="text" name="title" id="title" placeholder="Title Achieved"/>
            </div>
            <div class="one-line-group">
                <div class="form-group">
                    <label>Month</label>
                    <select id="month" name="month" v-model="month">
                        <option value="" selected disabled hidden>Choose here</option>
                        <option v-for="(item, key, index) in monthOptions">{{ item }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Year</label>
                    <select id="year" name="year" v-model="year">
                        <option value="" selected disabled hidden>Choose here</option>
                        <option v-for="(item, key, index) in yearOptions">{{ item }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Institute</label>
                <input v-model="education.institute" type="text" name="institute" id="institute" placeholder="Eg. Holberton School"/>
            </div>
            <div class="form-group">
                <label>Description</label>
                    <textarea v-model="education.education_description" name="textarea"rows="5" cols="132" maxlength="500" placeholder="Briefly write about this learning experience"></textarea>
            </div>
            <div class="form-group form-button">
                <input type="submit" name="add" id="education-id" class="form-submit" value="Add"/>
            </div>

        </form>
    </div>
    `,
    data () {
        return {

            monthOptions: {'01': 'January', '02': 'Febrary', '03': 'March',
            '04': 'April', '05': 'May', '06': 'June', '07': 'July',
            '08': 'August', '09': 'September', '10': 'October',
            '11': 'November', '12': 'Dicember'},

            yearOptions: ['2000','2001', '2002', '2003', '2004',
            '2005', '2006', '2007', '2008', '2009',
            '2010', '2011', '2012', '2013', '2014',
            '2015', '2016', '2017', '2018', '2019',
            '2020', '2021', '2022', '2023', '2024'],

            education: {
                userEmail: localStorage.getItem("userEmail"),
                title: null,
                education_year: null,
                institute: null,
                education_description: null
            },
            year: null,
            month: null
        }
    },
    methods: {
        entryPoint: function (event) {
            this.getDate();
            this.createEducation();
            event.preventDefault();
        },
        getDate () {
            if(this.year && this.month) {
                let monthKey = Object.keys(this.monthOptions)
                .find(key => this.monthOptions[key] == this.month);

                let stringYear = monthKey + this.year
                this.education.education_year = parseInt(stringYear)
            }
            if(this.year && !this.month) {
                this.education.education_year = parseInt(this.year)
            }
        },
        getEducation() {
            fetch(`${BASEURL}/education`)
            .then(response => response.json())
            .then(data => console.log(data));
        },
        createEducation() {
            const URL = `${BASEURL}/education`
            fetch (URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.education)
            })
            .then(response => {
                if (response.ok) {
                    console.log(response)
                    this.getEducation();
                }
                else {
                    console.error(response.error)
                }
            })
        },
    },
    mounted() {
        this.getEducation();
    }
}
