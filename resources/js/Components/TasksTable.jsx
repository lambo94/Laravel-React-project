import SortableHeading from "@/Components/SortableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constrants.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({tasks, page= '', queryParams = null, hideProjectColumn = false, object}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name]
        }

        router.get(route(page, queryParams));
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value)
    }

    return (
        <>
            <div className='overflow-auto'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-t border-b border-gray-400">
                    <tr className="text-nowrap">
                        <SortableHeading name='id' queryParams={queryParams} page={page}/>
                        <th className="px-3 py-3">Image</th>
                        {hideProjectColumn && <th className="px-3 py-3">Project Name</th>}
                            <SortableHeading name='name' queryParams={queryParams} page={page}/>
                        <SortableHeading name='status' queryParams={queryParams} page={page}/>
                        <SortableHeading
                            name='created_at'
                            queryParams={queryParams}
                            columnText='Created Date'
                            page={page}
                        />
                        <SortableHeading
                            name='due_date'
                            queryParams={queryParams}
                            columnText='Due Date'
                            page={page}
                        />
                        <th className="px-3 py-3">Created by</th>
                        <th className="px-3 py-3">Actions</th>
                    </tr>
                    </thead>
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-400">
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        {hideProjectColumn && <th className="px-3 py-3"></th>}
                        <th className="px-3 py-3">
                            <TextInput
                                className="w-full"
                                defaultValue={queryParams.name}
                                placeholder="Task Name"
                                onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                onKeyPress={(e) => onKeyPress('name', e)}
                            />
                        </th>
                        <th className="px-3 py-3">
                            <SelectInput
                                className="w-full"
                                defaultValue={queryParams.status}
                                onChange={(e) => searchFieldChanged('status', e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Complete</option>
                            </SelectInput>
                        </th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                            <button
                                onClick={e => {
                                    router.get(route(page));
                                }}
                                className="text-red-500 text-base"
                            >
                                Clear Filters
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.data.map((task) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={task.id}
                        >
                            <td className="px-3 py-3">{task.id}</td>
                            <td className="px-3 py-3">
                                <img src={task.image_path} style={{width: 80}} alt=""/>
                            </td>
                            {hideProjectColumn && <td className="px-3 py-3">{task.project.name}</td>}
                            <td className="px-3 py-3">{task.name}</td>
                            <td className="px-3 py-3">
                                        <span
                                            className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}
                                        >
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                            </td>
                            <td className="px-3 py-3">{task.created_at}</td>
                            <td className="px-3 py-3">{task.due_date}</td>
                            <td className="px-3 py-3">{task.created_by.name}</td>
                            <td className="px-3 py-3">
                                <Link
                                    href={route('task.edit', task.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route('task.destroy', task.id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                <Pagination links={tasks.meta.links} queryParams={queryParams}/>
            </div>
        </>
    )
}
