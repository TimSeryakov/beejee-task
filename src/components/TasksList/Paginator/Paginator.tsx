import React from 'react'
export const Paginator = () => {
    return (
        <div className="container mt-10">
            <nav className="mx-auto h-20 bg-gb-dark-medium rounded-2xl flex items-center px-3">
                <ul className="text-gb-text flex items-center justify-center text-xl w-full">

                    <li className="px-5"><button className="px-3 py-1 border-2 rounded-md border-gb-text hover:text-gb-text hover:border-gb-light hover:text-gb-light">
                        1
                    </button>
                    </li>
                    <li className="px-5"><button className="px-3 py-1 border-2 rounded-md border-gb-text hover:text-gb-text hover:border-gb-light hover:text-gb-light">
                        2
                    </button>
                    </li>
                    <li className="px-5"><button className="px-3 py-1 border-2 rounded-md border-gb-text hover:text-gb-text hover:border-gb-light hover:text-gb-light">
                        3
                    </button>
                    </li>
                    <li className="px-5"><button className="px-3 py-1 border-2 rounded-md border-gb-text hover:text-gb-text hover:border-gb-light hover:text-gb-light">
                        4
                    </button>
                    </li>


                </ul>
            </nav>
        </div>
    )
}