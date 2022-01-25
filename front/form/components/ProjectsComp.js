let ProjectsComp = {
    template: `
        <div class="form-content">
            <form
            id="project-form"
            class="project-form"
            @submit="entryPoint">
                <div class="title">
                    <h2>Project</h2>
                </div>
                <div class="form-group">
                    <label>Project Name</label>
                    <input v-model="project.project_name" type="text" name="project-name" id="project-name" placeholder="Eg. Web application ..."/>
                </div>
                <div class="form-group">
                        <label>Demo video</label>
                        <input v-model="project.demo_link" type="demo" name="demo" placeholder="Link to demo video">
                    </div>
                <div class="form-group">
                    <label>Github link</label>
                    <input v-model="project.github_link" type="text" name="github-link" id="github-link" placeholder="Project Github link"/>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea v-model="project.description" rows="5" cols="132" name="textarea" id="project-description" placeholder="Project description"></textarea>
                </div>
                <div class="form-group">
                    <label>Technologies used</label>
                    <div class="one-line-group">
                        <input v-model="technologies" name="technologies" id="technologies" placeholder="Eg. C programming, node js..."/>
                        <button type="button" class="addTechnology" @click="addTechnology">+</button>
                    </div>
                    <p v-if="project.technology.length">
                        <ul class="technology">
                            <li v-for="(tech, index) in project.technology">{{ tech }}<span class="close" @click="deleteTechnology(index)">x</span></li>
                        </ul>
                    </p>
                    </div>
                <span class="tag label label-info">
                    <a><i class="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a> 
                </span>
                <div class="errors">
                    <p v-if="errors.length">
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </p>
                </div>
                <div class="form-group form-button">
                    <input type="submit" name="signup" id="project-id" class="form-submit" value="Save"/>
                </div>
            </form>
            <div class="courses-container">
                <ProjectSubComp v-for="(projectItem, key) in projectItems"
                :key=projectItem.id
                :id="projectItem.id"
                :name="projectItem.project_name"
                :image="projectItem.project_image"
                :video="projectItem.demo_link"
                :github="projectItem.github_link"
                :description="projectItem.description"
                :projectItems="projectItems"
                />
            </div>
        </div>
    `,
    data () {
        return {
            project: {
                userEmail: localStorage.getItem("userEmail"),
                project_name: null,
                demo_link: null,
                github_link: null,
                description: null,
                technology: [],
            },
            errors: [],
            projectItems: [],
            technologies: null,
        }
    },
    methods: {
        entryPoint(event) {
            this.errors = [];

            if (!this.project.project_name) {
                this.errors.push('The Project Name field is mandatory');
            }
            if (!this.project.description) {
                this.errors.push('The Description field is mandatory');
            }
            if (this.project.demo_link) {
                if (!this.isValidHttpUrl(this.project.demo_link)) {
                    this.errors.push('The URL Demo video must be a valid URL');
                }
            }
            if (this.project.github_link) {
                if (!this.isValidHttpUrl(this.project.github_link)) {
                    this.errors.push('The URL Project Image must be a valid URL');
                }
            }
            if (!this.errors.length) {
                this.convertTechnologies();
                this.createProject();
                this.project.technology = [];
            }
            event.preventDefault();
        },
        getProject() {
            fetch(`${BASEURL}/project`)
            .then(response => response.json())
            .then(data => this.projectItems = data);
        },
        createProject() {
            const URL = `${BASEURL}/project`
            fetch (URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.project)
            })
            .then(response => response.json())
            .then(data => {
                this.getProject();
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        },
        isValidHttpUrl(string){
            let url;
            try {
                url = new URL(string);
            } catch (_) {
                return false;  
            }
            return true;
        },
        addTechnology () {
            if (this.technologies) {
                if (this.technologies.length > 15) {
                    this.errors.push('You must use less than 15 characters');
                }
                else {
                    this.project.technology.push(this.technologies)
                    this.technologies = null;
                    this.checkSize();
                }
            }
        },
        checkSize() {
            if (this.project.technology.length > 5) {
                this.project.technology.pop();
                this.errors.push('Only the 5 most relevant technologies');
            }
        },
        deleteTechnology (index) {
            this.project.technology.splice(index, 1)
        },
        convertTechnologies () {
            if (this.project.technology.length) {
                let techString = '';
                let i = 0;
                for (let element of this.project.technology) {
                    i += 1;
                    if (i < this.project.technology.length) {
                        techString = techString + element + ', ';
                    }
                    else {
                        techString = techString + element
                    }
                }
                this.project.technology = techString;
            }
        },
        updateElement() {

        }
    },
    mounted() {
        this.getProject();
    },
    components: {
        ProjectSubComp,
    }
}

// <form
//             v-for="(element, key, index) in projectItems"
//             id="project-form"
//             class="project-form">
//                 <div class="form-group">
//                     <a class="closeModal" href="#">X</a>
//                 </div>
//                 <div class="form-group">
//                     <label>Project Name</label>
//                     <input :value="projectElemnt.project_name" type="text" name="project-name" id="project-name" placeholder="Eg. Web application ..."/>
//                 </div>
//                 <div class="form-group">
//                         <label>Demo video</label>
//                         <input v-model="projectElemnt.demo_link" value="projectElemnt.demo_link" type="demo" name="demo" placeholder="Link to demo video">
//                     </div>
//                 <div class="form-group">
//                     <label>Github link</label>
//                     <input v-model="projectElemnt.github_link" value="projectElemnt.github_link" type="text" name="github-link" id="github-link" placeholder="Project Github link"/>
//                 </div>
//                 <div class="form-group">
//                     <label>Description</label>
//                     <textarea v-model="projectElemnt.description" value="projectElemnt.description" rows="5" cols="132" name="textarea" id="project-description" placeholder="Project description"></textarea>
//                 </div>
//                 <div class="form-group">
//                     <label>Technologies used</label>
//                     <div class="one-line-group">
//                         <input name="technologies" id="technologies" placeholder="Eg. C programming, node js..."/>
//                         <button type="button" class="addTechnology">+</button>
//                     </div>
//                 </div>
//                 <div class="form-group form-button">
//                     <input type="submit" name="signup" id="project-id" class="form-submit" value="Save"/>
//                 </div>
//             </form>