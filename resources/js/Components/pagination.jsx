import {Link} from "@inertiajs/react";

export default function Pagination({ links, queryParams }) {
    console.log(queryParams);
    return (
        <nav className="text-centre mt-4">
            {links.map(link => (
                <Link
                    className={
                        "inline-block py-2 px-3 rounded-lg text-xs " +
                        (link.active ? "bg-gray-950 " : " ") +
                        (!link.url ? "text-gray-500 cursor-not-allowed" : "text-gray-200 hover:bg-gray-950")
                    }
                    key={link.label}
                    href={link.url || ""}
                    query={queryParams}
                    dangerouslySetInnerHTML={{__html: link.label}}
                ></Link>
            ))}
        </nav>
    );
}
