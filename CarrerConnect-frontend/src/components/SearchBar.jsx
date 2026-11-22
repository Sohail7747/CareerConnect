import {Search, MapPin} from "lucide-react";
import {useState} from "react";

export default function SearchBar({onSearch, initialQuery = ""}) {
    const [q, setQ] = useState(initialQuery);
    const [location, setLocation] = useState("");
    return <div className="search-box">
        <div className="search-field"><Search size={18}/><input value={q} onChange={e => setQ(e.target.value)}
                                                                placeholder="Job title, skill or keyword"/></div>
        <div className="search-field"><MapPin size={18}/><input value={location}
                                                                onChange={e => setLocation(e.target.value)}
                                                                placeholder="Location"/></div>
        <button className="btn btn-primary" onClick={() => onSearch({q, location})}>Search Jobs</button>
    </div>
}