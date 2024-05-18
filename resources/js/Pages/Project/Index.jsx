import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import Pagination from "@/Components/pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constrants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Index({auth, projects, queryParams = null}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index', queryParams));
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3">ID</th>
                                    <th className="px-3 py-3">Image</th>
                                    <th className="px-3 py-3">Name</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">Created Date</th>
                                    <th className="px-3 py-3">Due date</th>
                                    <th className="px-3 py-3">Created By</th>
                                    <th className="px-3 py-3">Actions</th>
                                </tr>
                                </thead>
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3">
                                        <TextInput
                                            className="w-full"
                                            defaultValue={queryParams.name}
                                            placeholder="Project Name"
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
                                        <Link
                                            href={route('project.index', [])}
                                            className="text-red-500"
                                        >
                                            Clear Filters
                                        </Link>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {projects.data.map((project) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        key={project.id}>
                                        <td className="px-3 py-3">{project.id}</td>
                                        <td className="px-3 py-3">
                                            <img src={project.image_path} style={{width: 80}} alt=""/>
                                        </td>
                                        <td className="px-3 py-3">{project.name}</td>
                                        <td className="px-3 py-3">
                                        <span
                                            className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                                        </span>
                                        </td>
                                        <td className="px-3 py-3">{project.created_at}</td>
                                        <td className="px-3 py-3">{project.due_date}</td>
                                        <td className="px-3 py-3">{project.created_by.name}</td>
                                        <td className="px-3 py-3">
                                            <Link
                                                href={route('project.edit', project.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('project.destroy', project.id)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                                <Pagination links={projects.meta.links}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
