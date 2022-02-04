let EducationComp = {
    template: `
    <div class="form-content">
        <form
        name="education-form"
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
            <label>Start date</label>
            <div class="one-line-group">
                <div class="form-group">
                    <select style="color:gray" id="startMonth" name="month" v-model="startMonth">
                        <option :value="null" disabled selected hidden>Month</option>
                        <option v-for="(item, key, index) in monthOptions">{{ item }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <select style="color:gray" id="startYear" name="year" v-model="startYear">
                        <option :value="null" disabled selected hidden>Year</option>
                        <option v-for="(item, key, index) in yearOptions">{{ item }}</option>
                    </select>
                </div>
            </div>
            <label>Finish date</label>
            <div class="one-line-group">
                <div class="form-group">
                    <select style="color:gray" id="endMonth" name="month" v-model="finishMonth">
                        <option :value="null" disabled selected hidden>Month</option>
                        <option v-for="(item, key, index) in monthOptions">{{ item }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <select style="color:gray" id="endYear" name="year" v-model="finishYear">
                        <option :value="null" disabled selected hidden>Year</option>
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
            <div class="isa_error" v-if="errors.length">
                <div v-for="error in errors">
                    <i class="fa fa-times-circle"></i>
                    {{ error }}
                </div>
            </div>
            <div class="form-group form-button">
                <input type="submit" name="add" id="education-id" class="form-submit" value="Save"/>
            </div>

        </form>
        <hr>
        <div class="courses-container">
            <EducationSubComp v-for="(educationItem, key) in educationItems"
            :key=educationItem.id
            :id="educationItem.id"
            :title="educationItem.title"
            :startDate="educationItem.start_date"
            :finishDate="educationItem.finish_date"
            :months = "monthOptions"
            :institute="educationItem.institute"
            :description="educationItem.education_description"
            />
        </div>
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
                userEmail: sessionStorage.getItem("userEmail"),
                title: null,
                start_date: null,
                finish_date: null,
                institute: null,
                education_description: null
            },
            startYear: null,
            startMonth: null,
            finishYear: null,
            finishMonth: null,
            educationItems: [],
            userId: sessionStorage.getItem("userId"),
            errors: [],
        }
    },
    methods: {
        entryPoint: function (event) {
            this.errors = [];
            if (!this.education.title) {
                this.errors.push('You must specify the title');
            }
            if (!this.education.institute) {
                this.errors.push('You must specify the Institute');
            }
            if (this.startYear && !this.startMonth) {
                this.errors.push('You must specify the month');
            }
            if (!this.startYear && this.startMonth) {
                this.errors.push('You must specify the year');
            }
            if (this.finishYear && !this.finishMonth) {
                this.errors.push('You must specify the month');
            }
            if (!this.finishYear && this.finishMonth) {
                this.errors.push('You must specify the year');
            }
            if (!this.errors.length) { 
                this.getDate();
                this.createEducation();
                this.clearForm();
            }
            event.preventDefault();
        },
        getDate () {
            if (this.startMonth && this.startYear) {
                this.education.start_date = this.startMonth + ' ' + this.startYear;
            }
            if (this.finishMonth && this.finishYear) {
                this.education.finish_date = this.finishMonth + ' ' + this.finishYear;
            }
        },
        getEducation() {
            fetch(`${BASEURL}/user/education/` + this.userId,)
            .then(response => response.json())
            .then(data => this.educationItems = data);
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
        clearForm() {
            this.education.title = null;
            this.education.institute = null;
            this.education.education_description = null;
            this.education.start_date = null,
            this.education.finish_date = null,
            this.startYear = null;
            this.startMonth = null;
            this.finishYear = null;
            this.finishMonth = null;
        }
    },
    mounted() {
        this.getEducation();
    },
    components: {
        EducationSubComp,
    }
}
