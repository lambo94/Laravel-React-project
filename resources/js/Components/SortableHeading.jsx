import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";
import {router} from "@inertiajs/react";

export default function SortableHeading({name, queryParams, columnText = null, page = ''}) {
    const sortChanged = (name, queryParams, page) => {
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

        router.get(route(page, queryParams));
    }

    const tableHeaderClasses = "px-3 py-3 flex items-center justify-between gap-1 cursor-pointer";

    const activeSortAsc = (name, queryParams) => (queryParams.sort_field === name && queryParams.sort_direction === 'asc')
        ? "text-white"
        : "";

    const activeSortDesc = (name, queryParams) => (queryParams.sort_field === name && queryParams.sort_direction === 'desc')
        ? "text-white"
        : "";

    return (
        <th onClick={e => sortChanged(name, queryParams, page)}>
            <div className={tableHeaderClasses}>
                {columnText ?? name}
                <div>
                    <ChevronUpIcon className={"w-4 " + activeSortAsc(name, queryParams)}/>
                    <ChevronDownIcon className={"w-4 -mt-2 " + activeSortDesc(name, queryParams)}/>
                </div>
            </div>
        </th>
    )
}
