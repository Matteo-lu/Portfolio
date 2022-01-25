#!/usr/bin/node
const PortfolioComp = Vue.component('portfolio-comp', {
    template: `
        <div>
            <NavBarComp/>
            <IntroComp/>
            <AboutComp/>
            <EducationComp/>
            <ExperienceComp/>
            <ProjectsComp/>
            <ContactComp/>
        </div>
    `,
    data () {
        return {
        }
    },
    methods: {
    },
    mounted() {
    },
    components: {
        NavBarComp,
        IntroComp,
        AboutComp,
        EducationComp,
        ExperienceComp,
        ProjectsComp,
        ContactComp
    }
})
