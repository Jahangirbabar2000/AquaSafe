import React, { useState } from "react";
import Papa from "papaparse";

function CsvTokenizer() {
    const [jsonData, setJsonData] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                const rows = results.data;
                const headers = results.meta.fields;
                const json = rows.slice(0, -1).map((row, index) =>
                    headers.reduce(
                        (acc, header) => {
                            acc[header] = row[header];
                            return acc;
                        },
                        { id: index } // Add a unique id property to each row
                    )
                );
                setJsonData(json);
            },
        });
    };

    const tokenizeCsv = () => {
        console.log(jsonData);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={tokenizeCsv}>Tokenize</button>
        </div>
    );
}

export default CsvTokenizer;
