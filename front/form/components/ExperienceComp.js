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
                <div class="one-line-group">
                    <div class="form-group">
                        <label>Role</label>
                        <input v-model="experience.role" type="text" name="role" id="role" placeholder="Eg. Junio Sorftware Developer"/>
                    </div>
                    <div class="form-group">
                        <label>Years of experience</label>
                        <select id="experience" name="experience" v-model="years">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option v-for="(item, index) in options">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                        <textarea v-model="experience.experience_description" name="textarea"rows="5" cols="132" maxlength="500" placeholder="Description of the activities performed"></textarea>
                </div>
                <div class="form-group form-button">
                    <input type="submit" name="signup" id="introduction-id" class="form-submit" value="Save"/>
                </div>
            </form>
        </div>
    </div>
    `,
    data () {
        return {
            options: [0,0.5,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
                16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
            experience: {
                userEmail: localStorage.getItem("userEmail"),
                company: null,
                role: null,
                education_year: null,
                experience_description: null,
            },
            years: null,
        }
    },
    methods: {
        entryPoint(event) {
            if (this.years) {
                this.intConverter();
            }
            this.createExperience();
            event.preventDefault();
        },
        intConverter() {
            this.experience.education_year = parseInt(this.years)
        },
        getExperience() {
            fetch(`${BASEURL}/experience`)
            .then(response => response.json())
            .then(data => console.log(data));
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
    },
    mounted() {
        this.getExperience();
    }
}
