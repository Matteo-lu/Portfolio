let SkillsSubComp = {
    template: `
    <div class="course">
        <div class="course-preview">
            <h6>Skill</h6>
            <h2 v-text="skill"></h2>
            <a class="update">Update<i class="fas fa-chevron-right"></i></a>
        </div>
        <div class="course-info">
            <h6>Level</h6>
            <h2 v-text="skill_level"></h2>
            <a class="delete" @click="deleteItem(id)">x</a>
        </div>
    </div>
    `,
    data () {
        return {
            skill_level: null,
        }
    },
    props: [
        'id',
        'skill',
        'level',
    ],
    methods: {
        getLevel() {
            if (this.level == 1){
                this.skill_level = "No experience";
            }
            if (this.level == 2){
                this.skill_level = 'Novice';
            }
            if (this.level == 3){
                this.skill_level = 'Competent';
            }
            if (this.level == 4){
                this.skill_level = 'Expert';
            }
        },
        deleteItem (id) {
            fetch(`${BASEURL}/skills/` + id, {
            method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                this.$parent.getSkills();
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        }
    },
    mounted () {
        this.getLevel();
    }
}
