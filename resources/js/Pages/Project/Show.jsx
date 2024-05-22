import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constrants.jsx";
import TasksTable from "@/Components/TasksTable.jsx";
import {AxiosHeaders} from "axios";

export default function Show ({auth, project, tasks, queryParams = null}) {
    queryParams = queryParams || {};

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {`Project "${project.data.name}"`}
            </h2>}
        >
            <Head title={`Project "${project.data.name}"`}/>
            <div className="py-12"> {/* Project details section */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <img
                                    src={project.data.image_path}
                                    alt=""
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                            <div className="grid gap-1 grid-cols-2 mt-2"> {/* 2 column grid */}
                                <div> {/* left column starts here */}
                                    <div>
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className="mt-1">{project.data.id}</p>
                                    </div>
                                    <div>
                                        <label className="font-bold text-lg">Project Name</label>
                                        <p className="mt-1">{project.data.name}</p>
                                    </div>
                                    <div>
                                        <label className="font-bold text-lg">Project Status</label>
                                        <p className="mt-1">
                                                <span
                                                    className={
                                                        "px-2 py-1 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[project.data.status]
                                                    }
                                                >
                                                {PROJECT_STATUS_TEXT_MAP[project.data.status]}
                                                </span>
                                        </p>
                                    </div>
                                </div>
                                <div> {/* right column starts here */}
                                    <div>
                                        <label className="font-bold text-lg">Created by</label>
                                        <p className="mt-1">{project.data.created_by.name}</p>
                                    </div>
                                    <div>
                                        <label className="font-bold text-lg">Created at</label>
                                        <p className="mt-1">{project.data.created_at}</p>
                                    </div>
                                    <div>
                                        <label className="font-bold text-lg">Due date</label>
                                        <p className="mt-1">{project.data.due_date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <label className="font-bold text-lg">Project Description</label>
                                <p className="mt-1">{project.data.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {tasks.data.length > 0 &&
                                <TasksTable
                                    tasks={tasks}
                                    page={"project.show"}
                                    queryParams={queryParams}
                                    project={project}
                                />
                            }
                            {tasks.data.length < 1 && <p>No Tasks to display</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
