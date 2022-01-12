let SkillsComp = {
    template: `
        <div class="form-content">
            <form
            id="skills-form"
            class="skills-form">
                <div class="title">
                    <h2>Skills</h2>
                </div>
                <div class="one-line-group">
                    <div class="form-group">
                        <label>Skill</label>
                        <input type="text" name="skill" id="skill" placeholder="Skill name"/>
                    </div>
                    <div class="form-group">
                        <label>Level</label>
                        <select id="level" name="level">
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
            title: 'Hola desde data de form'
        }
    },
    methods: {
    },
    mounted() {
    }
}
