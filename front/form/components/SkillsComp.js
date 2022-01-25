let SkillsComp = {
    template: `
        <div class="form-content">
            <form
            id="skills-form"
            class="skills-form"
            @submit="entryPoint">
                <div class="title">
                    <h2>Skills</h2>
                </div>
                <div class="one-line-group">
                    <div class="form-group">
                        <label>Skill</label>
                        <input v-model="skills.skill_name" type="text" name="skill" id="skill" placeholder="Skill name"/>
                    </div>
                    <div class="form-group">
                        <label>Level</label>
                        <select style="color:gray" id="level" name="level" v-model="level">
                            <option :value="null" selected disabled>Choose here</option>
                            <option value="No experice">No experience, but interested</option>
                            <option value="Novice">Novice</option>
                            <option value="Competent">Competent</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                </div>
                <div class="errors">
                    <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </p>
                </div>
                <div class="form-group form-button">
                    <input type="submit" name="signup" id="skills-id" class="form-submit" value="Save"/>
                </div>
            </form>
            <div class="courses-container">
                <SkillsSubComp v-for="(skillItem, key) in skillItems"
                :key=skillItem.id
                :id="skillItem.id"
                :skill="skillItem.skill_name"
                :level="skillItem.skill_level"
                />
            </div>
        </div>
    </div>
    `,
    data () {
        return {
            skills: {
                userEmail: localStorage.getItem("userEmail"),
                skill_name: null,
                skill_level: null
            },
            level: null,
            skillItems: [],
            errors: []
        }
    },
    methods: {
        entryPoint (event) {
            this.errors = [];

            if (!this.skills.skill_name){
                this.errors.push('The Skill field is mandatory')
            }
            if (!this.level){
                this.errors.push('The Level field is mandatory')
            }
            if (!this.errors.length){
                this.getLevel();
                this.createSkills();
            }
            event.preventDefault();
        },
        getSkills() {
            fetch(`${BASEURL}/skills`)
            .then(response => response.json())
            .then(data => this.skillItems = data);
        },
        createSkills() {
            const URL = `${BASEURL}/skills`
            fetch (URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.skills)
            })
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    this.getSkills();
                }
                else {
                    console.error(response.error)
                }
            })
        },
        getLevel (){
            if (this.level == 'No experice'){
                this.skills.skill_level = 1;
            }
            if (this.level == 'Novice'){
                this.skills.skill_level = 2;
            }
            if (this.level == 'Competent'){
                this.skills.skill_level = 3;
            }
            if (this.level == 'Expert'){
                this.skills.skill_level = 4;
            }
        }
    },
    mounted() {
        this.getSkills();
    },
    components: {
        SkillsSubComp,
    }
}
