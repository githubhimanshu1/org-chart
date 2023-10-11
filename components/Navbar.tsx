import Link from "next/link";

export default function Navbar(){
    return (
        <div className="w-full h-10 bg-gray-800 px-2 py-2 flex align-middle">
            <div className="h-16 m-auto w-[1440px] text-white px-2 font-bold flex">
                <div className="w-1/2"><Link href="/">Garage</Link> </div>
                <div className="w-1/2 text-right px-4">
                <ul className="inline-flex text-white">
                    <li><Link href="/about/first-post">About</Link></li>
                </ul>
                </div>
            </div>
        
        </div>
    )
}