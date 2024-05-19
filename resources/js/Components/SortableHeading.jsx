import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";
import {router} from "@inertiajs/react";

export default function SortableHeading({name, queryParams, column_text = null}) {
    return (
        <th onClick={e => sortChanged(name, queryParams)}>
            <div className={tableHeaderClasses}>
                {column_text ?? name}
                <div>
                    <ChevronUpIcon className={"w-4 " + activeSortAsc(name, queryParams)}/>
                    <ChevronDownIcon className={"w-4 -mt-2 " + activeSortDesc(name, queryParams)}/>
                </div>
            </div>
        </th>
    )
}

const sortChanged = (name, queryParams) => {
    if (name === queryParams.sort_field) {
        if (queryParams.sort_direction === 'asc') {
            queryParams.sort_direction = 'desc';
        } else {
            queryParams.sort_direction = 'asc';
        }
    } else {
        queryParams.sort_field = name;
        queryParams.sort_direction = 'asc';
    }

    router.get(route('project.index', queryParams));
}

const tableHeaderClasses = "px-3 py-3 flex items-center justify-between gap-1 cursor-pointer";

const activeSortAsc = (name, queryParams) => (queryParams.sort_field === name && queryParams.sort_direction === 'asc')
    ? "text-white"
    : "";

const activeSortDesc = (name, queryParams) => (queryParams.sort_field === name && queryParams.sort_direction === 'desc')
    ? "text-white"
    : "";
