const mongoose=require("mongoose");
/**
 * @description Schema definition for the Interview Report model.
 * This model captures structured feedback from an interview process,
 * including candidate self-description, performance scores, and improvement plans.
 *
 * @resume (String): Candidate’s resume text or summary.
 * @selfDescription (String): Candidate’s own description of their background, skills, and aspirations.
 *
 * @overallScore (Number): A score out of 10 reflecting the candidate’s overall suitability
 *                         for the role based on interview performance.
 *
 * @technicalQuestions (Array of Objects):
 * [{
 *   question: String,        // The technical question asked
 *   intention: String,       // Purpose or competency being assessed
 *   answer: String           // Candidate’s response
 * }]
 *
 * @behavioralQuestions (Array of Objects):
 * [{
 *   question: String,        // The behavioral question asked
 *   intention: String,       // Purpose or competency being assessed
 *   answer: String           // Candidate’s response
 * }]
 *
 * @skillGaps (Array of Objects):
 * [{
 *   skill: String,           // Skill area where the candidate is lacking
 *   severity: {              // Severity of the gap
 *     type: String,
 *     enum: ['High', 'Medium', 'Low']
 *   },
 *   importance: String       // Importance of the skill (High, Medium, Low)
 * }]
 *
 * @preparationPlan (Array of Objects):
 * [{
 *   day: Number,             // Day number in the preparation timeline
 *   focusArea: String,       // Area of improvement for that day
 *   tasks: [String]          // Specific tasks or exercises
 * }]
 */

const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
});

const behavioralQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Behavioral question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
});

const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["High","Medium","Low"],
        required:[true,"Severity is required"]
    },
    importance:{
        type:String,
        enum:["High","Medium","Low"],
        required:[true,"Importance is required"]
    }
},{
    _id:false
});

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"],
        min:1
    },
    focusArea:{
        type:String,
        required:[true,"Focus area is required"]
    },
    tasks:{
        type:[String],
        required:[true,"Tasks are required"],
        default:[]
    }
},{
    _id:false
});

const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String,
        required:[true,"Resume is required"]
    },
    selfDescription:{
        type:String,
        required:[true,"Self description is required"]
    },
    overallScore:{
        type:Number,
        required:[true,"Overall score is required"],
        min:0,
        max:10
    },
    technicalQuestions:{
        type:[technicalQuestionSchema],
        default:[]
    },
    behavioralQuestions:{
        type:[behavioralQuestionSchema],
        default:[]
    },
    skillGaps:{
        type:[skillGapSchema],
        default:[]
    },
    preparationPlan:{
        type:[preparationPlanSchema],
        default:[]
    }
},{
    timestamps:true
});

const InterviewReport=mongoose.model("InterviewReport",interviewReportSchema);

module.exports=InterviewReport;