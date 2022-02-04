let ExperienceComp = {
    template: `
        <div class="form-content">
            <form
            id="experience-form"
            class="experience-form"
            @submit="entryPoint">
                <div class="title">
                    <h2>Experience</h2>
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input v-model="experience.company" type="text" name="company" id="company" placeholder="Company name"/>
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input v-model="experience.role" type="text" name="role" id="role" placeholder="Eg. Junio Sorftware Developer"/>
                </div>
                <label>Start date</label>
                <div class="one-line-group">
                    <div class="form-group">
                        <select style="color:gray" id="experienceStartMonth" name="month" v-model="finishMonth">
                            <option :value="null" disabled selected hidden>Month</option>
                            <option v-for="(item, key, index) in monthOptions">{{ item }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select style="color:gray" id="experienceStartYear" name="year" v-model="finishYear">
                            <option :value="null" disabled selected hidden>Year</option>
                            <option v-for="(item, key, index) in yearOptions">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <label>Finish date</label>
                <div class="one-line-group">
                    <div class="form-group">
                        <select style="color:gray" id="experienceEndMonth" name="month" v-model="finishMonth">
                            <option :value="null" disabled selected hidden>Month</option>
                            <option v-for="(item, key, index) in monthOptions">{{ item }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select style="color:gray" id="experienceEndYear" name="year" v-model="finishYear">
                            <option :value="null" disabled selected hidden>Year</option>
                            <option v-for="(item, key, index) in yearOptions">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                        <textarea v-model="experience.experience_description" name="textarea"rows="5" cols="132" maxlength="500" placeholder="Description of the activities performed"></textarea>
                </div>
                <div class="isa_error" v-if="errors.length">
                    <div v-for="error in errors">
                        <i class="fa fa-times-circle"></i>
                        {{ error }}
                    </div>
                </div>
                <div class="form-group form-button">
                    <input type="submit" name="signup" id="introduction-id" class="form-submit" value="Save"/>
                </div>
            </form>
            <hr>
            <div class="courses-container">
                <ExperienceSubComp v-for="(experienceItem, key) in experienceItems"
                    :key=experienceItem.id
                    :id="experienceItem.id"
                    :company="experienceItem.company"
                    :startDate="experienceItem.start_date"
                    :finishDate="experienceItem.finish_date"
                    :role="experienceItem.role"
                    :description="experienceItem.experience_description"
                    />
            </div>
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

            experience: {
                userEmail: sessionStorage.getItem("userEmail"),
                company: null,
                role: null,
                start_date: null,
                finish_date: null,
                experience_description: null,
            },
            experienceItems: [],
            userId: sessionStorage.getItem("userId"),
            errors: [],
            startYear: null,
            startMonth: null,
            finishYear: null,
            finishMonth: null,
        }
    },
    methods: {
        entryPoint(event) {
            this.errors = [];
            if (!this.experience.company) {
                this.errors.push('You must specify the company name');
            }
            if (!this.experience.role) {
                this.errors.push('You must specify the role');
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
                this.createExperience();
                this.clearForm();
            }
            event.preventDefault();
        },
        getDate () {
            if (this.startMonth && this.startYear) {
                this.experience.start_date = this.startMonth + ' ' + this.startYear;
                console.log(this.sta)
            }
            if (this.finishMonth && this.finishYear) {
                this.experience.finish_date = this.finishMonth + ' ' + this.finishYear;
            }
        },
        getExperience() {
            fetch(`${BASEURL}/user/experience/` + this.userId)
            .then(response => response.json())
            .then(data => this.experienceItems = data);
        },
        createExperience() {
            const URL = `${BASEURL}/experience`
            fetch (URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.experience)
            })
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    this.getExperience();
                }
                else {
                    console.error(response.error)
                }
            })
        },
        clearForm() {
            this.experience.company = null;
            this.experience.role = null;
            this.experience.education_year = null;
            this.experience.experience_description = null;
            this.experience.start_date = null,
            this.experience.finish_date = null,
            this.startYear = null;
            this.startMonth = null;
            this.finishYear = null;
            this.finishMonth = null;
            
        }
    },
    mounted() {
        this.getExperience();
    },
    components: {
        ExperienceSubComp,
    }
}
