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
                        <input v-model="skills.skill" type="text" name="skill" id="skill" placeholder="Skill name"/>
                    </div>
                    <div class="form-group">
                        <label>Level</label>
                        <select id="level" name="level" v-model="skills.level">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="No experience">No experience, but interested</option>
                            <option value="Novice">Novice</option>
                            <option value="Competent">Competent</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                </div>
                <div class="form-group form-button">
                    <input type="submit" name="signup" id="skills-id" class="form-submit" value="Save"/>
                </div>
            </form>
        </div>
    </div>
    `,
    data () {
        return {
            skills: {
                userEmail: localStorage.getItem("userEmail"),
                skill: null,
                level: null
            }
        }
    },
    methods: {
        entryPoint (event) {
            this.createSkills();
            event.preventDefault();
        },
        getSkills() {
            fetch(`${BASEURL}/skills`)
            .then(response => response.json())
            .then(data => console.log(data));
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
    },
    mounted() {
        this.getSkills();
    }
}
