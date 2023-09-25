import React from "react"
const parseString = require('xml2js').parseString;
require('@gouch/to-title-case')

export default async function getXml() {
    const items = [] 
    
    function parseXml(xml) {
        return new Promise((resolve, reject) => {
            parseString(xml,{explicitArray : false}, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
      }

    /////////////////////////////////  
      
    async function getData(isbn) {
        const openLibMetadata = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&format=json'
        console.log(openLibMetadata)
        const resp = await fetch(openLibMetadata)
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        
        if (!resp.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }
        return resp.json()
    }
    
    /////////////////////////
    
    async function xmlParse(xml) {
    const result = await parseXml(xml);
    console.log(result.report.QueryResult.ResultXml.rowset)
    const results = result.report.QueryResult.ResultXml.rowset.Row
    for (const r of results) {
        const item = {}
        //console.log(r.Column2)
        const title = r.Column7
        const cleanTitle = title.replace(/\/$|\.$/, "");
        const lowerCase = cleanTitle.toLowerCase()
        const titleCase = lowerCase.toTitleCase()

        const author = r.Column1
        const aLowerCase = author.toLowerCase()
        const authorCase = aLowerCase.toTitleCase()

        const callno = r.Column10
        const callnoStatus = callno.replace(/Unknown/g, "In Processing");
        
        const isbns = r.Column2
        const isbn = isbns.replace(/;.*/, "");

        const data = await getData(isbn)
        const key = Object.keys(data)[0]
        console.log(key)
        try {
            if (data[key].hasOwnProperty('thumbnail_url')) {
                console.log("YES")
                console.log(data[key].thumbnail_url)
                const openLibrary = 'https://covers.openlibrary.org/b/isbn/' + isbn + '-L.jpg'
                item.title = titleCase
                item.author = authorCase
                item.callno = callnoStatus
                item.olCoverURL = openLibrary
            
                items.push(item)
            }
        } catch(e) {
            e; // => ReferenceError
            console.log('no OpenLibrary JSON');
        }
    }
    //console.log(items)
    return items;
    }

    // GETTING ANALYTICS REPORT
    // <sawx:expr xsi:type="sawx:comparison" op="greater">
    // <sawx:expr xsi:type="sawx:sqlExpression">"Physical Item Details"."Receiving   Date"</sawx:expr>
    // <sawx:expr xsi:type="xsd:date">2022-09-01</sawx:expr></sawx:expr>

    // path = "%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooks"

    // https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooks&limit=25&col_names=true&apikey=l8xx5852c9867ab64264901d17af13574837

    const xmlres = await fetch(
    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooks&limit=25&col_names=true&apikey=l8xx5852c9867ab64264901d17af13574837',
        {
        method: 'GET',
        headers: {
            'accept': 'application/xml',
        },
        }
    
    )
      
    const xml = await xmlres.text()
    const parsedResults = xmlParse(xml);
    //console.log(await parsedResults)
    return await parsedResults

}