    import TimeSheetAccordion from "./TimeSheetAccordion";

    const ProjectTimesheets = () => {
        return ( <>
        <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center text-white w-full h-10 bg-primary rounded-lg">
            <div className="flex justify-center w-full">
                <p>No</p>
            </div>
            <div className="flex justify-center w-full">
                <p>Task Name</p>
            </div>
            <div className="flex justify-center w-full">
                <p>employee Name</p>
            </div>
            <div className="flex justify-center w-full">
                <p>Time Task</p>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <TimeSheetAccordion projectName="Project Name" projectTime="Total project time:" time="11 hours and 40 minutes" id={1} taskName="Task Name" name="Alireza" idProject={1} timeProject="2 hours and 5 minutes"/>
            </div>
        </div>
        </> );
    }
    
    export default ProjectTimesheets;