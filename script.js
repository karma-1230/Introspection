const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const iconClose = document.querySelector('.icon-close');
const loginbtn = document.querySelector('.navigation .btnlogin');
const labLink = document.querySelector('.lab-link');
const theoryLink = document.querySelector('.theory-link');
const dLink = document.querySelector('.dlab-link');
const dnoLink = document.querySelector('.dlabno-link');
const calculate = document.querySelector('.btn');


loginbtn.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
})

iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
})

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
})

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
})

labLink.addEventListener('click', ()=>{
    wrapper.classList.add('active-1');
})

theoryLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active-1');
})

dLink.addEventListener('click', ()=>{
    wrapper.classList.add('active-2');
})

dnoLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active-2');
})


document.addEventListener('DOMContentLoaded', () => {
    const calculateForms = document.querySelectorAll('.form-box form');

    // Loop through all forms and add event listeners
    calculateForms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            console.log("Form submitted");

            const formData = new FormData(form);
            console.log("Form Data:", Object.fromEntries(formData.entries()));
            let gpa;
            switch (form.name) {
                case 'regularGPAForm':
                    gpa = calculateGPA(formData);
                    break;
                case 'labGPAForm':
                    gpa = calculateLabGPAFromForm(formData);
                    break;
                case 'desiredGPAForm':
                    gpa = calculateDesiredGPAFromForm(formData);
                    break;
                case 'desiredLGPAForm':
                    gpa = calculateDesiredLGPAFromForm(formData);
                    break;
                default:
                    console.error('Unknown form name:', form.name);
            }

            if (gpa !== undefined) {
                console.log("Calculated GPA:", gpa);
                localStorage.setItem('gpa', gpa);
                window.location.href = '/templates/result.html';
                
            }
        });
    });
});

function calculateGPA(formData) {
    const assignment = parseFloat(formData.get('assignment')) || 0;
    const quiz = parseFloat(formData.get('quiz')) || 0;
    const mids = parseFloat(formData.get('mids')) || 0;
    const finals = parseFloat(formData.get('finals')) || 0;

    let totalMarks = assignment + quiz + mids + finals;
    return calculate_GPA(totalMarks).toFixed(2);
}

function calculateLabGPAFromForm(formData) {
    const assignment = parseFloat(formData.get('assignment')) ;
    const quiz = parseFloat(formData.get('quiz')) ;
    const mids = parseFloat(formData.get('mids')) ;
    const finals = parseFloat(formData.get('finals')) ;
    const labAssg = parseFloat(formData.get('lab-assg')) ;
    const labMid = parseFloat(formData.get('lab-mid')) 
    const labFinal = parseFloat(formData.get('lab-final'));

    let totalMarks = assignment + quiz + mids + finals;
    let labmarks = labAssg + labMid + labFinal;
    let totalLabs = ((75 * totalMarks) / 100) + ((25 * labmarks) / 100);
    console.log("total marks:",totalLabs);
    return calculate_GPA(totalLabs).toFixed(2);
}

function calculateDesiredGPAFromForm(formData) {
    const assignment = parseFloat(formData.get('assignment')) || 0;
    const quiz = parseFloat(formData.get('quiz')) || 0;
    const mids = parseFloat(formData.get('mids')) || 0;
    const desiredGpa = parseFloat(formData.get('desired_gpa')) || 0;

    let totalMarks = assignment + quiz + mids;
    return calculateDesiredGPA(totalMarks, desiredGpa).toFixed(2);
}

function calculateDesiredLGPAFromForm(formData) {
    const assignment = parseFloat(formData.get('assignment')) || 0;
    const quiz = parseFloat(formData.get('quiz')) || 0;
    const mids = parseFloat(formData.get('mids')) || 0;
    const labAssg = parseFloat(formData.get('lab-assg')) || 0;
    const labMid = parseFloat(formData.get('lab-mid')) || 0;
    const labFinal = parseFloat(formData.get('lab-final')) || 0;
    const desiredGpa = parseFloat(formData.get('desired_gpa')) || 0;

    let totalMarks = assignment + quiz + mids;
    let labmarks = labAssg + labMid + labFinal;

    return calculateDesiredLabGPA(totalMarks,labmarks,desiredGpa).toFixed(2);
}

function calculate_GPA(totalLabs) {
    if (totalLabs >= 84.5) return 4;
    else if (totalLabs >= 79.5 && totalLabs <84.5) return 3.7;
    else if (totalLabs >= 74.5 && totalLabs <79.5) return 3.3;
    else if (totalLabs >= 69.5 && totalLabs <74.5) return 3.0;
    else if (totalLabs >= 64.5 && totalLabs <69.5) return 2.7;
    else if (totalLabs >= 59.5 && totalLabs <64.5) return 2.3;
    else if (totalLabs >= 54.5 && totalLabs <59.5) return 2.0;
    else if (totalLabs >= 49.5 && totalLabs <54.5) return 1.7;
    else if (totalLabs >= 44.5 && totalLabs <49.5) return 1.3;
    else if (totalLabs >= 39.5 && totalLabs <44.5) return 1.0;
    else return 0;
}


function calculateDesiredGPA(totalMarks, desiredGpa) {
    let requiredMarks;
    if (desiredGpa >= 4) {
        requiredMarks = 84.5;
    } else if (desiredGpa<4 &&desiredGpa >= 3.7) {
        requiredMarks = 79.5;
    } else if (desiredGpa >= 3.3 &&desiredGpa<3.7) {
        requiredMarks = 74.5;
    } else if (desiredGpa >= 3.0 && desiredGpa<3.3) {
        requiredMarks = 69.5;
    } else if (desiredGpa >= 2.7&& desiredGpa<3.0) {
        requiredMarks = 64.5;
    } else if (desiredGpa >= 2.3 && desiredGpa<2.7) {
        requiredMarks = 59.5;
    } else if (desiredGpa >= 2.0 &&desiredGpa<2.3) {
        requiredMarks = 54.5;
    } else if (desiredGpa >= 1.7 &&desiredGpa<2.0) {
        requiredMarks = 49.5;
    } else if (desiredGpa >= 1.3 && desiredGpa<1.7) {
        requiredMarks = 44.5;
    } else if (desiredGpa >= 1.0 && desiredGpa<1.3) {
        requiredMarks = 39.5;
    } else {
        requiredMarks = 0;
    }

    const final = requiredMarks - totalMarks;
    console.log("Total Marks:", totalMarks); // Added for debugging
    console.log("Required Marks:", requiredMarks); // Added for debugging
    console.log("Final Marks Needed:", final); // Added for debugging
    return final;
}

function calculateDesiredLabGPA(totalMarks,labmarks,desiredGpa) {
    let Gpa
    if (desiredGpa >= 4) {
        Gpa = 84.5;
    } else if (desiredGpa<4 &&desiredGpa >= 3.7) {
        Gpa = 79.5;
    } else if (desiredGpa >= 3.3 &&desiredGpa<3.7) {
        Gpa = 74.5;
    } else if (desiredGpa >= 3.0 && desiredGpa<3.3) {
        Gpa = 69.5;
    } else if (desiredGpa >= 2.7&& desiredGpa<3.0) {
       Gpa = 64.5;
    } else if (desiredGpa >= 2.3 && desiredGpa<2.7) {
        Gpa = 59.5;
    } else if (desiredGpa >= 2.0 &&desiredGpa<2.3) {
        Gpa = 54.5;
    } else if (desiredGpa >= 1.7 &&desiredGpa<2.0) {
        Gpa = 49.5;
    } else if (desiredGpa >= 1.3 && desiredGpa<1.7) {
        Gpa = 44.5;
    } else if (desiredGpa >= 1.0 && desiredGpa<1.3) {
        Gpa = 39.5;
    } else {
        return 0;
    }
    let required;
    required = ((4*(Gpa - (0.25*labmarks)))/3) - totalMarks;
   return required;
}
